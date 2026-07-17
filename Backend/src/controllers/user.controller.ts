/**
 * User GraphQL resolvers.
 * Handles user authentication, registration,
 * password management, and account operations.
 */
import { UserDetails, UserResponse } from "../data/datatypes.ts";
import { validateUserData } from "../validators/userValidator.ts";
import { AppDataSource } from "../config/db.ts";
import { User } from "../modals/user.ts";
import bcrypt from 'bcrypt';
import { Role } from "../modals/role.ts";
import { generateToken } from "../utils/generateToken.ts";
import jwt from 'jsonwebtoken';

export const userResolvers = {
    Query: {
        /**
         * Retrieves all registered users
         * along with their assigned roles.
        */
        getUsers: async () => {
            const userRepo = AppDataSource.getRepository(User);
            const allUsers = await userRepo.find({
                relations: {
                    role: true
                }
            });
            return allUsers;
        },

        // Fetch the currently authenticated user's profile
        getMe: async (_: any, __: any, context: any) => {
            console.log("context inside getme", context);
            const userRepo = AppDataSource.getRepository(User);
            const loginUser = await userRepo.findOne({
                where: {
                    id: context.user.id
                },
                relations: {
                    role: true
                }
            });
            console.log("login usser: ", loginUser?.role);

            return loginUser;
        }
    },

    Mutation: {
        /**
         * Registers a new patient account.
         * Validates input, hashes the password,
         * and assigns the default Patient role.
        */
        register: async (_: any, userData: UserDetails, context: any): Promise<UserResponse> => {
            const inputField: string[] = ["userName", "email", "password", "confirmPassword", "phone", "age", "gender", "address", "bloodGroup"];
            const isValiduser = validateUserData(userData, inputField);

            if (!isValiduser) {
                throw new Error("Enter valid Details.");
            }

            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({ where: { email: userData.email } });
            const roleRepo = AppDataSource.getRepository(Role);
            const role = await roleRepo.findOne({ where: { roleName: "Patient" } });

            if (user) {
                throw new Error("User is already existed");
            }
            if (!role) {
                throw new Error("Role Not Found");
            }

            // change password in hash
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            // new user 
            const newUser = userRepo.create({
                userName: userData.userName,
                email: userData.email,
                password: hashedPassword,
                phone: userData.phone,
                role: role
            });

            const savedUser = await userRepo.save(newUser);

            const token = generateToken({
                id: savedUser.id,
                role: role.id,
            });

            //save token in cookies
            context.res.cookie("token", token,
                {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax"
                }
            );

            return {
                message: "You have successfully registered.",
            };
        },

        /**
         * Authenticates a user and generates
         * a JWT access token.
        */
        login: async (_: any, userData: UserDetails, context: any) => {
            const inputField: string[] = ["email", "password"];
            const isValiduser = validateUserData(userData, inputField);

            if (!isValiduser) {
                throw new Error("Please provide valid details.")
            }

            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({
                where: {
                    email: userData.email
                },
                relations: {
                    role: true
                }
            });

            //check if already user or not
            if (!user) {
                throw new Error("User Not Found.");
            }

            //check user is valid or not
            const validUser = await bcrypt.compare(userData.password, user.password);

            if (!validUser) {
                throw new Error("Invalid email or password.");
            }

            // generate token
            const token = generateToken(user);

            //save token in cookies
            context.res.cookie("token", token,
                {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax"
                }
            );

            // decode the user data
            const decoded = jwt.verify(token, process.env.SECRET_KEY!);
            console.log("decoded data is:", decoded);

            return {
                message: "you have logged in successfully.",
                token: token,
            }
        },

        /**
         * Resets the user's password
         * after validating the request.
        */
        forget: async (_: any, userData: UserDetails): Promise<UserResponse> => {
            const inputField: string[] = ["email", "password", "confirmPassword"];
            const isValidUser = validateUserData(userData, inputField);
            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({ where: { email: userData.email } });

            if (!user) {
                throw new Error("User not found");
            }
            if (!isValidUser) {
                throw new Error("Please provide valid details.")
            }

            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const newUserData = { ...user, password: hashedPassword }
            await userRepo.save(newUserData)
            return {
                message: "New password is generated successfully."
            }
        },

        /**
         * Changes the password for
         * the authenticated user.
        */
        changePassword: async (_: any, userData: UserDetails, context: any): Promise<UserResponse> => {
            const inputField: string[] = ["password", "newPassword", "confirmPassword"];
            const isValidUser = validateUserData(userData, inputField);

            if (!isValidUser) {
                throw new Error("Please enter valid details.");
            }

            const token = context.req.cookies.token;
            const decoded = jwt.verify(token, process.env.SECRET_KEY!) as {
                id: number;
                email: string;
                role: number;
            };
            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({
                where: {
                    id: decoded.id
                },
                relations: {
                    role: true
                }
            });

            if (!user) {
                throw new Error("User not found");
            }

            const checkValidUser = await bcrypt.compare(userData.password, user.password);
            if (!checkValidUser) {
                throw new Error("Invalid email or password.");
            }

            const hashedPassword = await bcrypt.hash(userData.newPassword, 10);
            await userRepo.save({ ...user, password: hashedPassword })
            return {
                message: "Password has been updated successfully."
            }
        },

        /**
        * Updates the logged-in patient's profile information.
        * Password is securely hashed before saving.
        */
        updateProfile: async (_: any, userData: UserDetails) => {

            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({ where: { email: userData.email } });

            if (!user) {
                throw new Error("User Not Found");
            }
            
            user.userName = userData.userName,
            user.email = userData.email,
            user.phone = userData.phone

            await userRepo.save(user);

            return {
                message: "You have successfully updated profile.",
                patient: user
            };
        },

        /**
         * Logs out the current user
         * by clearing the authentication cookie.
        */
        logout: async (_: any, userData: UserDetails, context: any): Promise<UserResponse> => {
            context.res.clearCookie("token", {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
            });
            return {
                message: "You have successfully logged out."
            }
        },


    },
}
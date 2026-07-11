import { AppDataSource } from "../config/db.ts";
import { UserDetails } from "../data/datatypes.ts";
import { Role } from "../modals/role.ts";
import { User } from "../modals/user.ts";
import bcrypt from 'bcrypt';

export const patientResolvers = {
    Query: {

    },

    Mutation: {
        updateProfile: async (_:any, userData:UserDetails, context:any) => {
            
            const userRepo = AppDataSource.getRepository(User);
            const user = await userRepo.findOne({ where: { id:  userData.id} });

            const roleRepo = AppDataSource.getRepository(Role);
            const role = await roleRepo.findOne({ where: { id: context.user.role } });

            if (!user) {
                throw new Error("User Not Found");
            }
            if (!role) {
                throw new Error("Role Not Found");
            }
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            console.log("inside update profile", role?.roleName);

            if(role?.roleName==="Patient"){
                user.userName=userData.userName,
                user.email=userData.email,
                user.password=hashedPassword,
                user.phone=userData.phone
            }
            await userRepo.save(user);
            return {
                message: "You have successfully updated profile.",
                patient:user
            };
        }
    }
}
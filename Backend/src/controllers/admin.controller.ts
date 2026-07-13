/**
 * Admin GraphQL resolvers.
 * Handles doctor management operations such as
 * retrieving, creating, updating, deleting,
 * and changing doctor status.
 */
import { ILike } from "typeorm";
import { AppDataSource } from "../config/db.ts";
import { DoctorDetails } from "../data/datatypes.ts";
import { Doctor } from "../modals/doctor.ts";
import { Role } from "../modals/role.ts";
import { User } from "../modals/user.ts";
import { validateDoctor } from "../validators/doctorValidator.ts";

export const adminResolvers = {
    Query: {

        // Fetch all registered doctors.
        getDoctors: async (_:any, doctorData:DoctorDetails) => {
            const doctorRepo = AppDataSource.getRepository(Doctor);
            const where: any = {};
            if (doctorData.department) {
                where.categoryName = ILike(`%${doctorData.department}%`);
            }
            if (doctorData.userName) {
                where.slug = ILike(`%${doctorData.userName}%`);
            }
            if (doctorData.specialization) {
                where.description = ILike(`%${doctorData.specialization}%`);
            }
            return await doctorRepo.find({ where, relations:{user:true}});
        }
    },

    Mutation: {

        /**
         * Adds a new doctor.
         * Accessible only to users with the Admin role.
         * Creates both User and Doctor records.
        */
        addDoctor: async (_: any, doctorData: DoctorDetails, context: any) => {
            const roleRepo = AppDataSource.getRepository(Role);
            const userRepo = AppDataSource.getRepository(User);

            // Validate doctor input fields
            const inputField=["department", "specialization", "experience", "consultationFee"]
            const valid=validateDoctor(doctorData, inputField);

            if(!valid){
                throw new Error("Enter valid details.")
            }
            const adminRole = await roleRepo.findOne({
                where: {
                    id: context.user.role
                }
            });

             // Verify admin authorization
            if (adminRole?.roleName === "Admin") {
                const doctorRole = await roleRepo.findOne({
                    where: {
                        roleName: "Doctor"
                    }
                });
                if (!doctorRole) {
                    throw new Error("Doctor role not found");
                }

                // Prevent duplicate doctor registration
                const doctorRepo = AppDataSource.getRepository(Doctor);
                const user = await userRepo.findOne({
                    where: {
                        email: doctorData?.email
                    }
                });
                if (user) {
                    throw new Error("Doctor is already existed.");
                }

                // Create user account for doctor
                const newUser = userRepo.create({
                    userName: doctorData.userName,
                    email: doctorData.email,
                    password: doctorData.password,
                    phone: doctorData.phone,
                    role: doctorRole
                });

                const savedUser = await userRepo.save(newUser);

                // Create doctor profile linked to the user
                const newDoctor = doctorRepo.create({
                    department: doctorData.department,
                    specialization: doctorData.specialization,
                    experience: doctorData.experience,
                    availableDays: doctorData.availableDays,
                    consultationFee: doctorData.consultationFee,
                    status: doctorData.status,
                    user: savedUser
                });
                await doctorRepo.save(newDoctor);
                return {
                    message: "Doctor has been added successfully.",
                    doctor: newDoctor
                }
            }
            else {
                throw new Error("Unauthorized Access!");
            }
        },

        /**
         * Updates an existing doctor's information.
         * Accessible only to Admin users.
        */
        editDoctor: async (_: any, doctorData: DoctorDetails, context: any) => {
            const roleRepo = AppDataSource.getRepository(Role);
            const userRepo = AppDataSource.getRepository(User);
            
            const inputField=["department", "specialization", "experience", "consultationFee"]
            const valid=validateDoctor(doctorData, inputField);
            
            if(!valid){
                throw new Error("Enter valid details.")
            }
            const role = await roleRepo.findOne({
                where: {
                    id: context.user.role
                }
            });
            
            if (role?.roleName === "Admin") {
                const doctorRepo = AppDataSource.getRepository(Doctor);

                // Retrieve doctor with associated user details
                const doctor = await doctorRepo.findOne({
                    where: {
                        id: doctorData.id
                    },
                    relations:{
                        user:true
                    }
                });
            
                if (!doctor) {
                    throw new Error("Doctor does not exist.");
                }

                // Update user and doctor information
                doctor.user.userName=doctorData.userName;
                doctor.user.email=doctorData.email;
                doctor.user.password=doctorData.password;
                doctor.user.phone=doctorData.phone;
                doctor.department = doctorData.department;
                doctor.specialization = doctorData.specialization;
                doctor.experience = doctorData.experience;
                doctor.availableDays = doctorData.availableDays;
                doctor.consultationFee = doctorData.consultationFee;

                await doctorRepo.save(doctor);
                await userRepo.save(doctor.user);

                return {
                    message: "Doctor has been updated successfully.",
                    doctor: doctor
                }
            }
            else {
                throw new Error("Unauthorized Access!");
            }
        },

        /**
         * Deletes a doctor and the associated user account.
         * Accessible only to Admin users.
        */
        deleteDoctor: async (_: any, doctorData: DoctorDetails, context: any) => {
            const roleRepo = AppDataSource.getRepository(Role);
            const role = await roleRepo.findOne({
                where: {
                    id: context.user.role
                }
            });
            
            if (role?.roleName === "Admin") {
                const doctorRepo = AppDataSource.getRepository(Doctor);
                const userRepo = AppDataSource.getRepository(User);
                const doctor = await doctorRepo.findOne({
                    where: {
                        id: doctorData.id
                    },
                    relations:{
                        user:true
                    }
                });
                console.log("user id in doctor table: ", doctor?.user.id);
                if (!doctor) {
                    throw new Error("Doctor does not exist.")
                }
                const userId= doctor.user.id;
                
                // Delete associated user record
                await doctorRepo.remove(doctor);
                await userRepo.delete(userId);
                return {
                    message: "Doctor has been deleted successfully.",
                    doctor: doctor
                }
            }
            else {
                throw new Error("Unauthorized Access!");
            }
        },

        /**
         * Marks a doctor as inactive.
         * Accessible only to Admin users.
         */
        changeDoctorStatus: async (_: any, doctorData: DoctorDetails, context: any) => {
            const roleRepo = AppDataSource.getRepository(Role);
            const role = await roleRepo.findOne({
                where: {
                    id: context.user.role
                }
            });
            if (role?.roleName === "Admin") {
                const doctorRepo = AppDataSource.getRepository(Doctor);
                const doctor = await doctorRepo.findOne({
                    where: {
                        id: doctorData.id
                    }
                });
                if (!doctor) {
                    throw new Error("Doctor does not exist.")
                }

                // update doctor status
                doctor.status = false;
                await doctorRepo.save(doctor);
                return {
                    message: "Doctor's status has been changed successfully.",
                    doctor: doctor
                }
            }
            else {
                throw new Error("Unauthorized Access!");
            }
        },
    }
}
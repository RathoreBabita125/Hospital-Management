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
import bcrypt from 'bcrypt';
import { Appointment } from "../modals/appointment.ts";
import { doctorInputFields, inputField } from "../constants/const.ts";

export const adminResolvers = {
    Query: {

        // Fetch all registered doctors.
        getDoctors: async (_: any, doctorData: DoctorDetails) => {
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
            return await doctorRepo.find({ where, relations: { user: true } });
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
            const valid = validateDoctor(doctorData, doctorInputFields);

            if (!valid) {
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

                // hashed password
                const hashedPassword = await bcrypt.hash(doctorData.password, 10);

                // Create user account for doctor
                const newUser = userRepo.create({
                    userName: doctorData.userName,
                    email: doctorData.email,
                    password: hashedPassword,
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
        updateDoctor: async (_: any, doctorData: DoctorDetails, context: any) => {
            console.log("updated doctor: ",doctorData);
            const roleRepo = AppDataSource.getRepository(Role);
            const userRepo = AppDataSource.getRepository(User);

            //validate doctor input fields
            const valid = validateDoctor(doctorData, doctorInputFields);

            if (!valid) {
                throw new Error("Enter valid details.");
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
                    relations: {
                        user: true
                    }
                });

                if (!doctor) {
                    throw new Error("Doctor does not exist.");
                }

                // hashed password
                const hashedPassword=await bcrypt.hash(doctorData.password, 10);

                // Update user and doctor information
                doctor.user.userName = doctorData.userName;
                doctor.user.email = doctorData.email;
                doctor.user.password = hashedPassword;
                doctor.user.phone = doctorData.phone;
                doctor.department = doctorData.department;
                doctor.specialization = doctorData.specialization;
                doctor.experience = doctorData.experience;
                doctor.availableDays = doctorData.availableDays;
                doctor.consultationFee = doctorData.consultationFee;

                await userRepo.save(doctor.user);
                await doctorRepo.save(doctor);
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
                const appointmentRepo = AppDataSource.getRepository(Appointment);
                const doctor = await doctorRepo.findOne({
                    where: {
                        id: doctorData.id
                    },
                    relations: {
                        user: true
                    }
                });

                if (!doctor) {
                    throw new Error("Doctor does not exist.")
                }

                const appointment = await appointmentRepo.findOne({
                    where: {
                        doctor: {
                            id: doctor.id
                        }
                    }
                });

                if (appointment) {
                    throw new Error(
                        "Doctor cannot be deleted because appointments already exist."
                    );
                }

                const userId = doctor.user.id;

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
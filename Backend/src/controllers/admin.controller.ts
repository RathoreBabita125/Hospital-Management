/**
 * @module Admin/Resolver
 * Handles doctor management operations such as
 * fetching, creating, updating, deleting,
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
import { doctorInputFields } from "../constants/const.ts";
import { DoctorAvailability } from "../modals/doctorAvailability.ts";

export const adminResolvers = {
    Query: {

        // Fetches all registered doctors.
        getDoctors: async (_: any, doctorData: DoctorDetails) => {
            const doctorRepo = AppDataSource.getRepository(Doctor);
            const where: any = {
                user: {},
            };

            if (doctorData.userName) {
                where.user.userName = ILike(`%${doctorData.userName}%`);
            }
            if (doctorData.department) {
                where.department = ILike(`%${doctorData.department}%`);
            }
            if (doctorData.specialization) {
                where.specialization = ILike(`%${doctorData.specialization}%`);
            }

            return await doctorRepo.find({
                where,
                relations: {
                    user: true,
                    availability:true
                },
            });
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
            const availabilityRepo = AppDataSource.getRepository(DoctorAvailability);

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

                // converts password into hashed password
                const hashedPassword = await bcrypt.hash(doctorData.password, 10);

                // Creates user account for doctor
                const newUser = userRepo.create({
                    userName: doctorData.userName,
                    email: doctorData.email,
                    password: hashedPassword,
                    phone: doctorData.phone,
                    role: doctorRole
                });

                const savedUser = await userRepo.save(newUser);

                //creates doctor information
                const newDoctor = doctorRepo.create({
                    department: doctorData.department,
                    specialization: doctorData.specialization,
                    experience: doctorData.experience,
                    consultationFee: doctorData.consultationFee,
                    status: doctorData.status,
                    user: savedUser,
                });

                // saves doctor information
                const savedDoctor = await doctorRepo.save(newDoctor);

                //creates doctor's availability 
                const availability = availabilityRepo.create({
                    availableDate: new Date(doctorData.availableDate),
                    fromTime: doctorData.fromTime,
                    toTime: doctorData.toTime,
                    doctor: savedDoctor
                });

                //saves doctor's availability 
                await availabilityRepo.save(availability);

                // returns response 
                return {
                    message: "Doctor has been added successfully.",
                    doctor: newDoctor
                }
            }
            // throws error if unauthorize person try to add doctor.
            else {
                throw new Error("Unauthorized Access!");
            }
        },

        /**
         * Updates an existing doctor's information.
        */
        updateDoctor: async (_: any, doctorData: DoctorDetails, context: any) => {
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
                        user: true,
                        availability:true
                    }
                });

                //checks if doctor exists or not
                if (!doctor) {
                    throw new Error("Doctor does not exist.");
                }

                // converts password into hashed password
                const hashedPassword = await bcrypt.hash(doctorData.password, 10);

                // Update user and doctor information
                doctor.user.userName = doctorData.userName;
                doctor.user.email = doctorData.email;
                doctor.user.password = hashedPassword;
                doctor.user.phone = doctorData.phone;
                doctor.department = doctorData.department;
                doctor.specialization = doctorData.specialization;
                doctor.experience = doctorData.experience;
                doctor.availableDate = doctorData.availableDate;
                doctor.consultationFee = doctorData.consultationFee;

                //saves doctor information
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

        // Deletes a doctor and the associated user account.
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

                // check doctor exists or not
                if (!doctor) {
                    throw new Error("Doctor does not exist.")
                }

                //finds doctor's user id
                const userId = doctor.user.id;

                // Delete associated user record
                await doctorRepo.remove(doctor);
                await userRepo.delete(userId);

                // return action response
                return {
                    message: "Doctor has been deleted successfully.",
                }
            }
            else {
                throw new Error("Unauthorized Access!");
            }
        },

        //  change doctor status whether he is active or inactive
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
                        id: doctorData.id,
                    }
                });
                if (!doctor) {
                    throw new Error("Doctor does not exist.")
                }

                // update doctor status
                doctor.status = doctorData.status;
                
                await doctorRepo.save(doctor);
                return {
                    message: "Doctor's status has been changed successfully.",
                }
            }
            else {
                throw new Error("Unauthorized Access!");
            }
        },
    }
}
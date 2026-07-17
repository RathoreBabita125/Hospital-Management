/**
 * Patient GraphQL resolvers.
 * Handles patient profile management and
 * appointment-related operations.
 */
import { MoreThan } from "typeorm";
import { AppDataSource } from "../config/db.ts";
import { AppointmentStatus, UserDetails } from "../data/datatypes.ts";
import { Appointment } from "../modals/appointment.ts";
import { Doctor } from "../modals/doctor.ts";
import { Role } from "../modals/role.ts";
import { User } from "../modals/user.ts";
import bcrypt from 'bcrypt';
import { Patient } from "../modals/patient.ts";

export const patientResolvers = {
    Query: {
        getAppointments: async (_: any, __: any, context: any) => {
            const appointmentRepo = AppDataSource.getRepository(Appointment);
            const allAppointments = await appointmentRepo.find({
                relations: {
                    doctor: {
                        user: true
                    },
                    user: {
                        patient: true
                    }
                }
            });
            return allAppointments;
        }
    },

    Mutation: {
       
        completePatientProfile: async (_: any, patientData: any, context: any) => {
            const patientRepo = AppDataSource.getRepository(Patient);
            const userRepo = AppDataSource.getRepository(User);
            
            if (!context.user) {
                throw new Error("First register to complete profile.");
            }

            const user = await userRepo.findOne({
                where: {
                    id: context.user.id
                }
            });

            if (!user) {
                throw new Error("User not found");
            }

            const existingPatient = await patientRepo.findOne({
                where: {
                    user: {
                        id: user.id
                    }
                },
                relations: {
                    user: true
                }
            });

            if (existingPatient) {
                throw new Error("Profile already completed.");
            }

            const patient = patientRepo.create({
                age: patientData.age,
                gender: patientData.gender,
                bloodGroup: patientData.bloodGroup,
                address: patientData.address,
                dateOfBirth: patientData.dateOfBirth,
                emergencyNumber: patientData.emergencyNumber,
                user
            });

            await patientRepo.save(patient);

            return {
                message: "Profile completed successfully.",
                patient
            };
        },



        /**
         * Books a new appointment with a doctor.
         * Validates doctor availability and prevents
         * duplicate time-slot bookings.
         */
        bookAppointment: async (_: any, appointmentData: any, context: any) => {
            const appointmentRepo = AppDataSource.getRepository(Appointment);
            const userRepo = AppDataSource.getRepository(User);

            // Retrieve patient and doctor records
            // const user = await userRepo.findOne({ where: { id: context.user.id } });
            const user = await userRepo.findOne({ where: { id: appointmentData.user } });
            const doctorRepo = AppDataSource.getRepository(Doctor);
            const doctor = await doctorRepo.findOne({ where: { id: appointmentData.doctor } });
            
            //validation
            const { availableDate, timeSlot, department } = appointmentData;
            if (!availableDate || !timeSlot || !department) {
                throw new Error("This field is required.")
            }
            if (!user) {
                throw ("Patient does not exist.");
            }
            if (!doctor) {
                throw ("Doctor does not exist.");
            }
            if (new Date(appointmentData.availableDate) < new Date()) {
                throw new Error("Appointment date cannot be in the past.");
            }

            // Check whether the selected time slot is already booked
            const existingAppointment = await appointmentRepo.findOne({
                where: {
                    doctor: { id: doctor.id },
                    availableDate: appointmentData.availableDate,
                    timeSlot: appointmentData.timeSlot
                }
            });
            if (existingAppointment) {
                throw new Error("This slot is already booked.");
            }

            const newAppointment = appointmentRepo.create({
                department: appointmentData.department,
                availableDate: appointmentData.availableDate,
                timeSlot: appointmentData.timeSlot,
                doctor: doctor,
                user: user
            } as any);

            await appointmentRepo.save(newAppointment);
            return {
                message: "Appointment is successfully booked.",
                appointment: newAppointment
            }
        },

        /**
        * Reschedules an existing appointment.
        * Only future appointments can be rescheduled.
        */
        rescheduleAppointment: async (_: any, appointmentData: any, context: any) => {
            const appointmentRepo = AppDataSource.getRepository(Appointment);
            const appointment = await appointmentRepo.findOne({
                where: {
                    id: appointmentData.id,
                    user: {
                        id: context.user.id
                    }
                }
            });

            if (!appointment) {
                throw new Error("Appointment not found.");
            }

            const newDate = new Date(appointmentData.availableDate);
            if (newDate < new Date()) {
                throw new Error("Rescheduled appointment date cannot be in the past.");
            }

            // Update appointment schedule
            appointment.availableDate = appointmentData.availableDate;
            appointment.timeSlot = appointmentData.timeSlot;

            await appointmentRepo.save(appointment);

            return {
                message: "Appointment rescheduled successfully.",
                appointment: appointment
            };
        },

        /**
         * Cancels an upcoming appointment.
         * Prevents cancellation of already cancelled
         * or past appointments.
        */
        cancelAppointment: async (_: any, appointmentData: any, context: any) => {
            const appointmentRepo = AppDataSource.getRepository(Appointment);
            const appointment = await appointmentRepo.findOne({
                where: {
                    id: appointmentData.id,
                    user: {
                        id: context.user.id
                    }
                }
            });

            if (!appointment) {
                throw new Error("Appointment not found.");
            }

            if (appointment.status === AppointmentStatus.CANCELLED) {
                throw new Error("Appointment is already cancelled.");
            }

            if (appointment.availableDate < new Date()) {
                throw new Error("Past appointment cannot be cancelled");
            }

            // Update appointment status to CANCELLED
            appointment.status = AppointmentStatus.CANCELLED;

            await appointmentRepo.save(appointment);

            return {
                message: "Appointment cancelled successfully.",
                appointment
            };
        },

        addPatient: async (_: any, patientData: any, context: any) => {
            const patientRepo = AppDataSource.getRepository(Patient);
            const userRepo = AppDataSource.getRepository(User);

            const user = await userRepo.findOne({
                where: {
                    id: patientData.user
                }
            })
            const existingPatient = await patientRepo.findOne({
                where: {
                    id: patientData.user
                }
            });

            if (!user) {
                throw new Error("Patient not found.")
            }

            if (existingPatient) {
                throw new Error("Patient is already existed.");
            }

            const patient = patientRepo.create({
                age: patientData.age,
                gender: patientData.gender,
                bloodGroup: patientData.bloodGroup,
                address: patientData.address,
                dateOfBirth: patientData.dateOfBirth,
                emergencyNumber: patientData.emergencyNumber,
                user: user
            });

            await patientRepo.save(patient);

            return {
                message: "Patient details has been added successfully.",
                patient
            };
        }
    }
}
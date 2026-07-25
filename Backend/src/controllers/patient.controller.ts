/**
 * @module Patient/Resolver
 * Patient GraphQL resolvers.
 * Handles patient profile management and
 * appointment-related operations.
 */
import { ILike, Like, MoreThan } from "typeorm";
import { AppDataSource } from "../config/db.ts";
import { AppointmentStatus } from "../data/datatypes.ts";
import { Appointment } from "../modals/appointment.ts";
import { Doctor } from "../modals/doctor.ts";
import { User } from "../modals/user.ts";
import { Patient } from "../modals/patient.ts";

export const patientResolvers = {

    Query: {
        /**
         * fetches all the appointment details.
         * performs filteration using some property like
         * patient, doctor, email, bloodgroup, gender, departemnt, status 
         */
        getAppointments: async (_: any, appointmentData: any, context: any) => {
            const appointmentRepo = AppDataSource.getRepository(Appointment);
            const where: any = {
                user: {
                    patient: {},
                },
                doctor: {},
            };
            if (appointmentData.userName) {
                where.user.userName = ILike(`%${appointmentData.userName}%`);
            }
            if (appointmentData.doctorName) {
                where.doctor.user = {
                    userName: ILike(`%${appointmentData.doctorName}%`),
                };
            }
            if (appointmentData.email) {
                where.user.email = ILike(`%${appointmentData.email}%`);
            }
            if (appointmentData.bloodGroup) {
                where.user.patient.bloodGroup = ILike(`%${appointmentData.bloodGroup}%`);
            }
            if (appointmentData.gender) {
                where.user.patient.gender = Like(`%${appointmentData.gender}%`);
            }
            if (appointmentData.department) {
                where.doctor.department = ILike(`%${appointmentData.department}%`);
            }
            if (appointmentData.status) {
                where.status = appointmentData.status;
            }

            const appointments = await appointmentRepo.find({
                where,
                relations: {
                    doctor: {
                        user: true,
                    },
                    user: {
                        patient: true,
                    },
                },
                order: {
                    createdAt: "ASC",
                },
            });
            return appointments;
        },

        // Retrieves profile of the currently logged-in patient.
        getPatientProfile: async (_: any, __: any, context: any) => {
            if (!context.user) {
                throw new Error("Not authenticated.");
            }

            const patientRepo = AppDataSource.getRepository(Patient);

            const patient = await patientRepo.findOne({
                where: {
                    user: {
                        id: context.user.id
                    }
                },
                relations: {
                    user: true
                }
            });
            return patient;
        },
    },

    Mutation: {
        /**
         * Books a new appointment with a doctor.
         * Validates doctor availability and prevents
         * duplicate time-slot bookings.
         */
        bookAppointment: async (_: any, appointmentData: any, context: any) => {
            const appointmentRepo = AppDataSource.getRepository(Appointment);
            const userRepo = AppDataSource.getRepository(User);

            // Retrieve patient and doctor records
            const user = await userRepo.findOne({ where: { id: context.user.id } });
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

            //checks if appointment exists or not.
            if (!appointment) {
                throw new Error("Appointment not found.");
            }

            const newDate = new Date(appointmentData.availableDate);

            //checks rescheduled date must of future, not past date
            if (newDate < new Date()) {
                throw new Error("Rescheduled appointment date cannot be in the past.");
            }

            // Updates appointment schedule
            appointment.availableDate = appointmentData.availableDate;
            appointment.timeSlot = appointmentData.timeSlot;

            await appointmentRepo.save(appointment);

            //returns response
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

            // Update appointment status to cancel
            appointment.status = AppointmentStatus.CANCELLED;

            await appointmentRepo.save(appointment);

            return {
                message: "Appointment cancelled successfully.",
                appointment
            };
        },

        //  Creates a patient profile linked to an existing user account.
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
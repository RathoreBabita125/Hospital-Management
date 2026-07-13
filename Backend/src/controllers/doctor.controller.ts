/**
 * Doctor GraphQL resolvers.
 * Provides doctor-specific operations for managing
 * appointments and patient prescriptions.
 */
import { Between, MoreThan } from "typeorm";
import { AppDataSource } from "../config/db.ts";
import { AppointmentStatus, PrescriptionDetails } from "../data/datatypes.ts";
import { Appointment } from "../modals/appointment.ts";
import { Prescription } from "../modals/prescription.ts";

export const doctorResolver = {
    Query: {
        /**
         * Retrieves all appointments scheduled for the current day.
        */
        todayAppointments: async (_: any, __: any, context: any) => {
            const appointmentRepo = AppDataSource.getRepository(Appointment);
            const today = new Date();
            const start = new Date(today.setHours(0, 0, 0, 0));
            const end = new Date(today.setHours(23, 59, 59, 999));

            return await appointmentRepo.find({
                where: {
                    doctor: {
                        id: context.user.id
                    },
                    availableDate: Between(start, end)
                },
                relations: {
                    user: true
                }
            });
        },

         /**
         * Retrieves all upcoming appointments
         * assigned to the logged-in doctor.
         */
        viewUpcomingAppointments: async (_: any, __: any, context: any) => {
            const appointmentRepo = AppDataSource.getRepository(Appointment);

            return await appointmentRepo.find({
                where: {
                    doctor: {
                        id: context.user.id
                    },
                    availableDate: MoreThan(new Date())
                },
                relations: {
                    user: true
                }
            });
        }
    },

    Mutation: {
        /**
         * Accepts a pending appointment.
         * Only appointments with PENDING status
         * can be confirmed.
         */
        acceptAppointment: async (_: any, appointmentData: any, context: any) => {
            try {
                const appointmentRepo = AppDataSource.getRepository(Appointment);
                const appointment = await appointmentRepo.findOne({
                    where: {
                        id: appointmentData.id,
                        doctor: {
                            id: context.user.id
                        }
                    }
                });
                if (!appointment) {
                    throw new Error("Appointment not found.");
                }
                if (appointment.status !== AppointmentStatus.PENDING) {
                    throw new Error("Only pending appointments can be accepted.");
                }
                appointment.status = AppointmentStatus.CONFIRMED;
                await appointmentRepo.save(appointment);
                return {
                    message: "Appointment accepted successfully.",
                    appointment
                };
            } catch (error: any) {
                throw new Error(error.message || "Failed to accept appointment.");
            }
        },

        /**
         * Marks a confirmed appointment as completed.
        */
        completeAppointment: async (_: any, appointmentData: any, context: any) => {
            try {
                const appointmentRepo = AppDataSource.getRepository(Appointment);
                const appointment = await appointmentRepo.findOne({
                    where: {
                        id: appointmentData.id,
                        doctor: {
                            id: context.user.id
                        }
                    }
                });

                if (!appointment) {
                    throw new Error("Appointment not found.");
                }
                if (appointment.status !== AppointmentStatus.CONFIRMED) {
                    throw new Error("Only confirmed appointments can be completed.");
                }

                appointment.status = AppointmentStatus.COMPLETED;

                await appointmentRepo.save(appointment);

                return {
                    message: "Appointment completed successfully.",
                    appointment
                };

            } catch (error: any) {
                throw new Error(error.message);
            }
        },

        /**
         * Creates a prescription for an appointment.
         * Prevents duplicate prescriptions for the
         * same appointment.
        */
        addPrescription: async (_: any, prescriptionData: PrescriptionDetails) => {
            console.log("prescription data inside", prescriptionData);

            const prescriptionRepo = AppDataSource.getRepository(Prescription);
            const appointmentRepo = AppDataSource.getRepository(Appointment);

            const appointment = await appointmentRepo.findOne({
                where: {
                    id: prescriptionData.appointment
                }
            });

            if (!appointment) {
                throw new Error("Appointment not found");
            }

             // Check if prescription already exists
            const existingPrescription = await prescriptionRepo.findOne({
                where: {
                    appointment: {
                        id: prescriptionData.appointment,
                    },
                },
            });

            if (existingPrescription) {
                throw new Error("Prescription is already given for this appointment.");
            }

             // Check if prescription already exists
            const newPrescription = prescriptionRepo.create(
                {
                    medicine: prescriptionData.medicine,
                    dosage: prescriptionData.dosage,
                    duration: prescriptionData.duration,
                    instructions: prescriptionData.instructions,
                    appointment
                }
            )

            await prescriptionRepo.save(newPrescription);
            return {
                message: "You have succesfully created prescription.",
                prescription: newPrescription
            }
        }
    }
}
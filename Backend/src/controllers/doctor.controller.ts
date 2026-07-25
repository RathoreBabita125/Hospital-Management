/**
 * @module Doctor/Resolver
 * Provides doctor's operations for managing
 * appointments and patient prescriptions.
 */
import { ArrayContains, Between, ILike, MoreThan } from "typeorm";
import { AppDataSource } from "../config/db.ts";
import { AppointmentStatus, PrescriptionDetails, TimeSlotStatus } from "../data/datatypes.ts";
import { Appointment } from "../modals/appointment.ts";
import { Prescription } from "../modals/prescription.ts";
import { Doctor } from "../modals/doctor.ts";
import { DoctorAvailability } from "../modals/doctorAvailability.ts";
import { validateAvailabilty } from "../validators/availabilityValidator.ts";
import { TimeSlot } from "../modals/timeSlot.ts";
import { toMinutes, toTimeString } from "../common/timechange.ts";

export const doctorResolver = {

    Query: {

        // fetches all appointments scheduled for today.
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

        // Retrieves all upcoming appointments.
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
        },

        /**
         * fetches all prescriptions data
         * Supports filtering by doctor name and department,
         */
        getAllPrescriptions: async (_: any, prescriptionData: any, context: any) => {
            const prescriptionRepo = AppDataSource.getRepository(Prescription);
            const where: any = {
                appointment: {},
            };
            if (prescriptionData.doctorName) {
                where.appointment.doctor = {
                    user: {
                        userName: ILike(`%${prescriptionData.doctorName}%`),
                    },
                };
            }
            if (prescriptionData.department) {
                where.appointment.department = ILike(`%${prescriptionData.department}%`);
            }
            const prescriptions = await prescriptionRepo.find({
                where,
                relations: {
                    appointment: {
                        user: true,
                        doctor: {
                            user: true,
                        },
                    },
                },
            });
            return prescriptions;
        },

        /**
         * Fetches prescriptions created by the logged-in doctor.
         * Supports filtering by patient name, department,
         * medicine, and appointment date.
         */
        getMyPrescriptions: async (_: any, prescriptionData: any, context: any) => {
            const doctorRepo = AppDataSource.getRepository(Doctor);
            const prescriptionRepo = AppDataSource.getRepository(Prescription);
            const doctor = await doctorRepo.findOne({
                where: {
                    user: {
                        id: context.user.id
                    }
                }
            });

            if (!doctor) {
                throw new Error("Doctor not found");
            }

            const where: any = {
                appointment: {
                    doctor: {
                        id: doctor.id
                    }
                }
            };
            if (prescriptionData.userName) {
                where.appointment.user = { userName: ILike(`%${prescriptionData.userName}%`) };
            }
            if (prescriptionData.department) {
                where.appointment.department = ILike(`%${prescriptionData.department}%`);
            }
            if (prescriptionData.medicine) {
                where.medicine = ArrayContains([prescriptionData.medicine]);
            }
            if (prescriptionData.appointmentDate) {
                const start = new Date(prescriptionData.appointmentDate);
                start.setHours(0, 0, 0, 0);
                const end = new Date(prescriptionData.appointmentDate);
                end.setHours(23, 59, 59, 999);
                where.appointment.availableDate = Between(start, end);
            }
            const prescriptions = await prescriptionRepo.find({
                where,
                relations: {
                    appointment: {
                        user: {
                            patient: true
                        },
                        doctor: {
                            user: true
                        }
                    }
                },
                order: {
                    appointment: {
                        availableDate: "ASC",
                    }
                },
            });
            return prescriptions;
        },

        /**
         *  Retrieves all availability slots created by the
         *  logged-in doctor, ordered by date.
         */
        getMyAvailability: async (_: any, __: any, context: any) => {
            console.log(" RESOLVER ENTERED");
            if (!context.user) {
                throw new Error("Not authenticated.");
            }

            const doctorRepo = AppDataSource.getRepository(Doctor);
            const doctor = await doctorRepo.findOne({
                where: { user: { id: context.user.id } },
            });

            if (!doctor) {
                throw new Error("Doctor profile not found.");
            }

            const availabilityRepo = AppDataSource.getRepository(DoctorAvailability);

            const availability = await availabilityRepo.find({
                where: {
                    doctor: {
                        id: doctor.id
                    }
                },
                relations: {
                    doctor: true
                },
                order: { availableDate: "ASC" },
            });

            return availability;
        },

        getTimeSlots:async()=>{
            const timeSlotRepo=AppDataSource.getRepository(TimeSlot);
            const timeSlots= await timeSlotRepo.find({
                relations:{
                    availability:true,
                    doctor:true
                }
            })
            return timeSlots;
        }
    },


    Mutation: {

        // Updates the status of an appointment.
        updateAppointmentStatus: async (_: any, appointmentData: any, context: any) => {
            console.log("appointment status: ", appointmentData);

            try {
                const appointmentRepo = AppDataSource.getRepository(Appointment);
                const appointment = await appointmentRepo.findOne({
                    where: {
                        id: appointmentData.id,
                        doctor: {
                            user: {
                                id: context.user.id,
                            },
                        },
                    },
                });

                if (!appointment) {
                    throw new Error("Appointment not found.");
                }

                // update appointment' status from Pending to Confirmed.
                if (appointmentData.status === AppointmentStatus.CONFIRMED) {
                    if (appointment.status !== AppointmentStatus.PENDING) {
                        throw new Error(
                            "Only pending appointments can be confirmed."
                        );
                    }
                    appointment.status = AppointmentStatus.CONFIRMED;
                }

                // update appointment' status from Confirmed to Completed.
                else if (appointmentData.status === AppointmentStatus.COMPLETED) {
                    if (appointment.status !== AppointmentStatus.CONFIRMED) {
                        throw new Error(
                            "Only confirmed appointments can be completed."
                        );
                    }
                    // const confirmAppointmentDate=new Date(appointmentData.)
                    // if()
                    appointment.status = AppointmentStatus.COMPLETED;
                }

                // converts Pending or Confirmed appointments into Cancelled.
                else if (appointmentData.status === AppointmentStatus.CANCELLED) {
                    if (appointment.status === AppointmentStatus.COMPLETED) {
                        throw new Error(
                            "Completed appointment cannot be cancelled."
                        );
                    }
                    appointment.status = AppointmentStatus.CANCELLED;
                }
                else {
                    throw new Error("Invalid appointment status.");
                }

                // saves the updated status in appointment table
                await appointmentRepo.save(appointment);

                return {
                    message: "Appointment's status has been updated successfully.",
                    appointment,
                };

            } catch (error: any) {
                throw new Error(
                    error.message || "Failed to update appointment status."
                );
            }
        },

        // Creates a prescription for an appointment.
        addPrescription: async (_: any, prescriptionData: PrescriptionDetails) => {

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

            // Check if a prescription already exists for this appointment
            const existingPrescription = await prescriptionRepo.findOne({
                where: {
                    appointment: {
                        id: prescriptionData.appointment,
                    },
                },
            });

            // Prevents duplicate prescriptions for the same appointment.
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

            // saves prescription details
            await prescriptionRepo.save(newPrescription);

            return {
                message: "You have succesfully created prescription.",
                prescription: newPrescription
            }
        },

        // Updates an existing prescription's details.
        updatePrescription: async (_: any, prescriptionData: any) => {
            const prescriptionRepo = AppDataSource.getRepository(Prescription);
            const prescription = await prescriptionRepo.findOne({
                where: {
                    id: prescriptionData.id,
                },
                relations: {
                    appointment: true,
                },
            });

            // checks prescription exists or not
            if (!prescription) {
                throw new Error("Prescription not found.");
            }

            if (prescriptionData.medicine !== undefined) {
                prescription.medicine = prescriptionData.medicine;
            }
            if (prescriptionData.dosage !== undefined) {
                prescription.dosage = prescriptionData.dosage;
            }
            if (prescriptionData.duration !== undefined) {
                prescription.duration = prescriptionData.duration;
            }
            if (prescriptionData.instructions !== undefined) {
                prescription.instructions = prescriptionData.instructions;
            }

            await prescriptionRepo.save(prescription);

            return {
                message: "You have successfully updated the prescription.",
                prescription,
            };
        },

        // Permanently deletes a prescription by ID.
        deletePrescription: async (_: any, prescriptionData: any) => {
            const prescriptionRepo = AppDataSource.getRepository(Prescription);
            const prescription = await prescriptionRepo.findOne({
                where: {
                    id: prescriptionData.id,
                },
            });

            // checks prescription exists or not
            if (!prescription) {
                throw new Error("Prescription not found.");
            }

            // delete the prescription from db
            await prescriptionRepo.remove(prescription);

            return {
                message: "You have successfully deleted the prescription.",
            };
        },

        /**
         * Adds a new availability slot for the logged-in doctor.
         * The slot cannot be set for a date in the past.
         */
        addAvailability: async (_: any, availabilityData: any, context: any) => {

            if (!context.user) {
                throw new Error("Not authenticated.");
            }

            const doctorRepo = AppDataSource.getRepository(Doctor);
            const doctor = await doctorRepo.findOne({
                where: { user: { id: context.user.id } },
            });

            if (!doctor) {
                throw new Error("Doctor profile not found.");
            }

            if (!availabilityData.slotDuration || availabilityData.slotDuration <= 0) {
                throw new Error("Slot duration must be a positive number of minutes.");
            }

            const inputFields = ["availableDate", "fromTime", "toTime", "slotDuration"];
            const valid = validateAvailabilty(inputFields, availabilityData);

            if (!valid) {
                throw new Error("Enter valid details");
            }

            if (new Date(availabilityData.availableDate) < new Date()) {
                throw new Error("Available date cannot be in the past.");
            }

            const availabilityRepo = AppDataSource.getRepository(DoctorAvailability);
            const existingAvailability = await availabilityRepo.findOne({
                where: {
                    doctor: { id: doctor.id },
                    availableDate: availabilityData.availableDate,
                },
            });

            if (existingAvailability) {
                throw new Error("You have already added availability for this date.");
            }

            const startMinutes = toMinutes(availabilityData.fromTime);
            const endMinutes = toMinutes(availabilityData.toTime);

            if (startMinutes >= endMinutes) {
                throw new Error("From Time must be earlier than To Time.");
            }

            if (endMinutes - startMinutes < availabilityData.slotDuration) {
                throw new Error("Time range is too short to fit even one slot of the selected duration.");
            }

            const newAvailability = availabilityRepo.create({
                availableDate: availabilityData.availableDate,
                fromTime: availabilityData.fromTime,
                toTime: availabilityData.toTime,
                slotDuration: availabilityData.slotDuration,
                isBooked: false,
                doctor,
            });

            await availabilityRepo.save(newAvailability);

            const timeSlotRepo = AppDataSource.getRepository(TimeSlot);

            const slotsToCreate = [];
            for (let start = startMinutes; start + availabilityData.slotDuration <= endMinutes; start += availabilityData.slotDuration) {
                slotsToCreate.push(
                    timeSlotRepo.create({
                        fromTime: toTimeString(start),
                        toTime: toTimeString(start + availabilityData.slotDuration),
                        isBooked: false,
                        availability: newAvailability,
                        doctor,
                    })
                );
            }

            await timeSlotRepo.save(slotsToCreate);

            return {
                message: "Availability added successfully.",
                availability: newAvailability,
            };
        },

        /**
         * Updates an existing availability slot belonging to
         * the logged-in doctor.
         */

        updateAvailability: async (_: any, availabilityData: any, context: any) => {

            if (!context.user) {
                throw new Error("Not authenticated.");
            }

            const availabilityRepo = AppDataSource.getRepository(DoctorAvailability);
            const availability = await availabilityRepo.findOne({
                where: {
                    id: availabilityData.id,
                    doctor: { user: { id: context.user.id } },
                },
            });

            if (!availability) {
                throw new Error("Availability not found.");
            }

            if (availability.isBooked) {
                throw new Error("Cannot update a slot that is already booked.");
            }

            if (availabilityData.availableDate) {
                availability.availableDate = availabilityData.availableDate;
            }
            if (availabilityData.fromTime) {
                availability.fromTime = availabilityData.fromTime;
            }
            if (availabilityData.toTime) {
                availability.toTime = availabilityData.toTime;
            }

            await availabilityRepo.save(availability);

            return {
                message: "Availability updated successfully.",
                availability,
            };
        },

        /**
        * Deletes an availability slot belonging to the
        * logged-in doctor.
        */
        deleteAvailability: async (_: any, availabilityData: any, context: any) => {
            if (!context.user) {
                throw new Error("Not authenticated.");
            }

            const availabilityRepo = AppDataSource.getRepository(DoctorAvailability);

            const availability = await availabilityRepo.findOne({
                where: {
                    id: availabilityData.id,
                    doctor: { user: { id: context.user.id } },
                },
            });

            //checks if availability exist or not
            if (!availability) {
                throw new Error("Availability not found.");
            }
            if (availability.isBooked) {
                throw new Error("Cannot delete a slot that is already booked.");
            }

            // delete the availability detail
            await availabilityRepo.delete(availability.id);

            return {
                message: "Availability deleted successfully.",
            };
        },
    }
}
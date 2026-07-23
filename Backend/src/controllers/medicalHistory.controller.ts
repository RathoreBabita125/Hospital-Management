/**
 * @module Medical/Resolver
 * Handles operations related to maintaining patient's medical records,
 * including adding diagnosis, symptoms, allergies, treatment details,
 * and follow-up information.
 */
import { AppDataSource } from "../config/db.ts";
import { MedicalHistoryDetails } from "../data/datatypes.ts";
import { Appointment } from "../modals/appointment.ts";
import { MedicalHistory } from "../modals/medicalHistory.ts";
import { validateMedicalHistory } from "../validators/medicalHistoryValidator.ts";

export const medicalResolver = {
    Query: {

        // fetches all medical history
        getMedicalHistory:async()=>{
            const medicalHistoryRepo = AppDataSource.getRepository(MedicalHistory);
            const allMedicalsHistory=medicalHistoryRepo.find();
            return allMedicalsHistory;
        }
    },

    Mutation: {

        // add medical details
        addMedicalHistory: async (_: any, medicalHistoryData: MedicalHistoryDetails) => {
            const medicalHistoryRepo = AppDataSource.getRepository(MedicalHistory);

            // Validate provided medical history details
            const inputField = ["diagnosis", "symptoms", "allergies", "treatmentNotes", "recommendedTests"];
            const isValid = validateMedicalHistory(medicalHistoryData, inputField);

            if (!isValid) {
                throw new Error("Please enter valid details");
            }

            const appointmentRepo = AppDataSource.getRepository(Appointment);

            const appointment = await appointmentRepo.findOne({
                where: {
                    id: medicalHistoryData.appointment
                }
            });

            if (!appointment) {
                throw new Error("Appointment not found.");
            }

            // Create a new medical history record
            const newMedicalHistory = medicalHistoryRepo.create({
                diagnosis: medicalHistoryData.diagnosis,
                symptoms: medicalHistoryData.symptoms,
                allergies: medicalHistoryData.allergies,
                treatmentNotes: medicalHistoryData.treatmentNotes,
                treatmentPlan: medicalHistoryData.treatmentPlan,
                recommendedTests: medicalHistoryData.recommendedTests,
                followUpDate: medicalHistoryData.followUpDate,
                appointment: appointment
            });

            // Save medical history details into database
            await medicalHistoryRepo.save(newMedicalHistory);

            return {
                message: "Medical history is created successfully.",
                medicalHistory: newMedicalHistory
            }
        },

        // updates existing medical details
        updateMedicalHistory: async (_: any, medicalHistoryData: MedicalHistoryDetails) => {
            const medicalHistoryRepo = AppDataSource.getRepository(MedicalHistory);
            const appointmentRepo = AppDataSource.getRepository(Appointment);

            const inputField = ["diagnosis", "symptoms","allergies","treatmentNotes","recommendedTests"];
            const isValid = validateMedicalHistory(medicalHistoryData, inputField);

            // checks validation
            if (!isValid) {
                throw new Error("Please enter valid details");
            }

            // Find existing medical history
            const medicalHistory = await medicalHistoryRepo.findOne({
                where: {
                    id: medicalHistoryData.id
                }
            });

            if (!medicalHistory) {
                throw new Error("Medical history not found.");
            }

            const appointment = await appointmentRepo.findOne({
                where: {
                    id: medicalHistoryData.appointment
                }
            });

            if (!appointment) {
                throw new Error("Appointment not found.");
            }

            // Update medical history fields
            medicalHistory.diagnosis = medicalHistoryData.diagnosis;
            medicalHistory.symptoms = medicalHistoryData.symptoms;
            medicalHistory.allergies = medicalHistoryData.allergies;
            medicalHistory.treatmentNotes = medicalHistoryData.treatmentNotes;
            medicalHistory.treatmentPlan = medicalHistoryData.treatmentPlan;
            medicalHistory.recommendedTests = medicalHistoryData.recommendedTests;
            medicalHistory.followUpDate = medicalHistoryData.followUpDate;
            medicalHistory.appointment=appointment;

            // saves medical details into database.
            await medicalHistoryRepo.save(medicalHistory);

            // returns response
            return {
                message: "Medical history updated successfully.",
                medicalHistory
            };
        }
    }
}
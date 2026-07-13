/**
 * Document GraphQL resolvers.
 * Handles document retrieval, upload,
 * and deletion for patient appointments.
 */
import { AppDataSource } from "../config/db.ts";
import { allowedFileTypes } from "../constants/const.ts";
import { DocumentDetails } from "../data/datatypes.ts";
import { Appointment } from "../modals/appointment.ts";
import { Document } from "../modals/document.ts";

export const documentResolvers = {

    Query: {

        /**
         * Retrieves all uploaded documents
         * along with their associated appointments.
        */
        getDocuments: async () => {
            const documentRepo = AppDataSource.getRepository(Document);
            const allDocuments = await documentRepo.find({
                relations: {
                    appointment: true
                }
            })
            return allDocuments;
        },
    },

    Mutation: {
        /**
         * Uploads a document for a specific appointment.
         * Validates file type and prevents duplicate uploads.
        */
        uploadDocument: async (_: any, documentData: DocumentDetails) => {
            const appointmentRepo = AppDataSource.getRepository(Appointment);
            const documentRepo = AppDataSource.getRepository(Document);

            if (!allowedFileTypes.includes(documentData.fileType)) {
                throw new Error("Only PDF, JPG and PNG files are allowed.");
            }

            const appointment = await appointmentRepo.findOne({
                where: {
                    id: documentData.appointment,
                },
            });

             // Check for duplicate document
            const existingDocument = await documentRepo.findOne({
                where: {
                    appointment: { id: documentData.appointment },
                    fileName: documentData.fileName,
                },
            });

            if (existingDocument) {
                throw new Error("This document is already existed")
            }
            if (!appointment) {
                throw new Error("Appointment not found.");
            }

            // Create and save document record
            const newDocument = documentRepo.create({
                fileName: documentData.fileName,
                fileType: documentData.fileType,
                fileUrl: documentData.fileUrl,
                documentType: documentData.documentType,
                appointment,
            });

            await documentRepo.save(newDocument);

            return {
                message: "Document uploaded successfully.",
                document: newDocument,
            };
        },

        /**
         * Deletes an uploaded document by its identifier.
        */
        deleteDocument: async (_: any, documentData: DocumentDetails) => {
            const documentRepo = AppDataSource.getRepository(Document);
            const document = await documentRepo.findOne({
                where: {
                    id: documentData.id
                },
            });

            if (!document) {
                throw new Error("Document not found.");
            }

            // Delete document record
            await documentRepo.remove(document);

            return {
                message: "Document deleted successfully.",
            };
        },
    },
}
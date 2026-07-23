import {gql} from 'graphql-tag';

/**
 * @module MedicalHistory/Schema
 * stores medical informations
 */

export const medicalHistorySchema=gql`

    type MedicalHistory{
        id: ID!
        diagnosis: String!
        symptoms: [String!]!
        allergies: [String]
        treatmentNotes: String!
        treatmentPlan: String
        recommendedTests: [String]
        followUpDate: Date
        appointment:Appointment
    }

    type MedicalHistoryResponse{
        message:String
        medicalHistory:MedicalHistory
    }

    type Query{
        getMedicalHistory:[MedicalHistory]
    }

    type Mutation{
        addMedicalHistory(
            diagnosis: String!
            symptoms: [String!]!
            allergies: [String]
            treatmentNotes: String!
            treatmentPlan: String
            recommendedTests: [String]
            followUpDate: Date
            appointment:ID
        ): MedicalHistoryResponse

        updateMedicalHistory(
            id: ID
            diagnosis: String
            symptoms: [String]
            allergies: [String]
            treatmentNotes: String
            treatmentPlan: String
            recommendedTests: [String]
            followUpDate: Date
            appointment:ID
        ): MedicalHistoryResponse
    }
`
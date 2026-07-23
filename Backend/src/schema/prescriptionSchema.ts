import {gql} from 'graphql-tag'

/**
 * @module Prescription/Schema
 * Prescription GraphQL schema.
 * Defines prescription-related types, queries,
 * and mutations for managing doctor prescriptions.
 */

export const prescriptionSchema=gql`
    type Prescription{
        id:ID!
        medicine:[String!]!
        dosage:String!
        duration:String!
        instructions:String!
        appointment:Appointment
    }

    type PrescriptionResponse{
        message:String
        prescription:Prescription
    }

    type Query{

        getAllPrescriptions(
            doctorName: String
            department: String
        ):[Prescription]

        getMyPrescriptions(
            userName: String
            department: String
            medicine: String
            appointmentDate: String
        ):[Prescription]
    }

    type Mutation{
        addPrescription(
            medicine:[String!]!
            dosage:String!
            duration:String!
            instructions:String!
            appointment:ID
        ):PrescriptionResponse

        updatePrescription(
            id: ID!
            medicine: [String!]
            dosage: String
            duration: String
            instructions: String
        ): PrescriptionResponse

        deletePrescription(
            id:ID
        ):PrescriptionResponse

    }
`
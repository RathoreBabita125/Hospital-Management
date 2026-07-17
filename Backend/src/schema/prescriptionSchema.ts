import {gql} from 'graphql-tag'

/**
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

    type Query{
        getAllPrescriptions:[Prescription]
        getPrescriptions:[Prescription]
    }

    type PrescriptionResponse{
        message:String
        prescription:Prescription
    }

    type Mutation{
        addPrescription(
            medicine:[String!]!
            dosage:String!
            duration:String!
            instructions:String!
            appointment:ID
        ):PrescriptionResponse
    }
`
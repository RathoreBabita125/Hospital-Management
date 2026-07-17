import { gql } from 'graphql-tag';

/**
 * Patient GraphQL schema.
 * Defines patient-related types and mutations
 * for managing patient profile information.
*/
export const patientSchema = gql`
    type Patient{
        id:ID
        age: Int!
        gender:String
        bloodGroup:String
        address:String
        role:ID
        dateOfBirth:Date
        emergencyNumber: String!
        user:User
    }

    type PatientResponse{
        message:String
        patient:Patient
    }

    type Mutation{

        completePatientProfile(
            age: Int!
            gender: String!
            bloodGroup: String!
            address: String!
            dateOfBirth: Date!
            emergencyNumber: String!
        ): PatientResponse

        addPatient(
            age: Int!
            gender: String!
            bloodGroup: String!
            address: String!
            dateOfBirth: Date!
            emergencyNumber: String!
            user:ID
        ): PatientResponse
    }
`;
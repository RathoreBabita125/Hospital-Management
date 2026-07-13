import { gql } from 'graphql-tag';

/**
 * Patient GraphQL schema.
 * Defines patient-related types and mutations
 * for managing patient profile information.
*/
export const patientSchema = gql`
    type Patient{
        id:ID
        gender:String
        bloodGroup:String
        address:String
        role:ID
        dateOfBirth:Date
        user:User
    }

    type PatientResponse{
        message:String
        patient:Patient
    }

    type Mutation{
        updateProfile(
            id:ID
            gender:String
            bloodGroup:String
            address:String
            role:ID
            dateOfBirth:Date
            user:ID
        ):PatientResponse
    }

`;
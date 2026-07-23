import { gql } from "@apollo/client";

export const GET_PATIENT_PROFILE = gql`
  query GetMyPatientProfile {
    getPatientProfile {
      id
      age
      gender
      bloodGroup
      dateOfBirth
      address
      emergencyNumber
    }
  }
`;

export const COMPLETEPROFILE = gql`
  mutation CompletePatientProfile(
    $age: Int!
    $gender: String!
    $bloodGroup: String!
    $address: String!
    $dateOfBirth: Date!
    $emergencyNumber: String!
  ) {
    completePatientProfile(
      age: $age
      gender: $gender
      bloodGroup: $bloodGroup
      address: $address
      dateOfBirth: $dateOfBirth
      emergencyNumber: $emergencyNumber
    ) {
      message
      patient {
        id
        age
        gender
        bloodGroup
        address
        dateOfBirth
        emergencyNumber
        user {
          id
          userName
          email
          phone
        }
      }
    }
  }
`;
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


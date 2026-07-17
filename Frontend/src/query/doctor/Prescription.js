import { gql } from "@apollo/client";

export const GETPRESCRIPTIONS = gql`
  query GetPrescriptions {
    getPrescriptions {
      id
      medicine
      dosage
      duration
      instructions
      appointment {
        id
        availableDate
        timeSlot
        department
        status
        user {
          id
          userName
          email
          phone
          patient {
            age
            gender
            bloodGroup
            address
          }
        }
        doctor {
          id
          specialization
          department
          user {
            id
            userName
          }
        }
      }
    }
  }
`;

export const GETALLPRESCRIPTIONS=gql`
  query GetAllPrescriptions{
    getAllPrescriptions{
      id
      medicine
      dosage
      duration
      instructions
    }
  }
`
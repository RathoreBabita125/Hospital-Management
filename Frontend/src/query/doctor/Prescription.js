import { gql } from "@apollo/client";

export const GETMYPRESCRIPTIONS = gql`
  query GetMyPrescriptions(
    $userName: String
    $department: String
    $medicine: String
    $appointmentDate: String
  ){
    getMyPrescriptions(
      userName: $userName
      department: $department
      medicine: $medicine
      appointmentDate: $appointmentDate
    ){
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
  query GetAllPrescriptions(
    $doctorName: String
    $department: String
  ){
    getAllPrescriptions(
      doctorName: $doctorName
      department: $department
    ){
      id
      medicine
      dosage
      duration
      instructions
      appointment{
        status
        doctor{
          id
          department
          user{
            userName
          }
        }
        user{
          id
          userName
        }
      }
    }
  }
`

export const ADDPRESCRIPTION = gql`
  mutation AddPrescription(
    $medicine: [String!]!
    $dosage: String!
    $duration: String!
    $instructions: String!
    $appointment: ID
  ) {
    addPrescription(
      medicine: $medicine
      dosage: $dosage
      duration: $duration
      instructions: $instructions
      appointment: $appointment
    ) {
      message
      prescription {
        id
        medicine
        dosage
        duration
        instructions
        appointment {
          id
          availableDate
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

export const UPDATEPRESCRIPTION = gql`
  mutation UpdatePrescription(
    $id: ID!
    $medicine: [String!]
    $dosage: String
    $duration: String
    $instructions: String
  ) {
    updatePrescription(
      id: $id
      medicine: $medicine
      dosage: $dosage
      duration: $duration
      instructions: $instructions
    ) {
      message
      prescription {
        id
        medicine
        dosage
        duration
        instructions
        appointment {
          id
          availableDate
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

export const DELETEPRESCRIPTION = gql`
  mutation DeletePrescription($id: ID!) {
    deletePrescription(id: $id) {
      message
    }
  }
`;

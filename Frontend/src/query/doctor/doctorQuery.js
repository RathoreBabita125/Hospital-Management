import { gql } from "@apollo/client";

export const GETDOCTORS = gql`
  query GetDoctor {
    getDoctors {
      id
      department
      specialization
      experience
      availableDays
      consultationFee
      status
      user {
        id
        userName
        email
        phone
      }
    }
  }
`;

export const ADDDOCTOR = gql`
  mutation AddDoctor(
    $userName: String!
    $email: String!
    $password: String!
    $phone: String!
    $department: String!
    $specialization: String!
    $experience: Int!
    $availableDays: Date!
    $consultationFee: Int!
    $status: Boolean!
  ) {
    addDoctor(
      userName: $userName
      email: $email
      password: $password
      phone: $phone
      department: $department
      specialization: $specialization
      experience: $experience
      availableDays: $availableDays
      consultationFee: $consultationFee
      status: $status
    ) {
      message
      doctor {
        id
        department
        specialization
        experience
        availableDays
        consultationFee
        status
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

export const UPDATEDOCTOR = gql`
  mutation UpdateDoctor(
    $id: ID!
    $userName: String!
    $email: String!
    $password: String!
    $phone: String!
    $department: String!
    $specialization: String!
    $experience: Int!
    $availableDays: Date!
    $consultationFee: Int!
    $status: Boolean!
    $user: ID
  ) {
    updateDoctor(
      id: $id
      userName: $userName
      email: $email
      password: $password
      phone: $phone
      department: $department
      specialization: $specialization
      experience: $experience
      availableDays: $availableDays
      consultationFee: $consultationFee
      status: $status
      user: $user
    ) {
      message
      doctor {
        id
        department
        specialization
        experience
        availableDays
        consultationFee
        status
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

export const DELETEDOCTOR = gql`
  mutation DeleteDoctor($id: ID!) {
    deleteDoctor(id: $id) {
      message
      doctor {
        id
      }
    }
  }
`;
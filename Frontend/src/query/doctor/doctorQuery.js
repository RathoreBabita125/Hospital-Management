import { gql } from "@apollo/client";

export const GETDOCTORS = gql`
  query GetDoctor(
    $userName:String
    $department:String
    $specialization:String
  ){
    getDoctors(
      userName:$userName
      department:$department
      specialization:$specialization
    ){
      id
      department
      specialization
      experience
      consultationFee
      status
      user {
        id
        userName
        email
        phone
      }
      availability{
        id
        availableDate
        fromTime
        toTime
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
    $availableDate: String!
    $consultationFee: Int!
    $fromTime: String!
    $toTime: String!
    $status: Boolean
  ) {
    addDoctor(
      userName: $userName
      email: $email
      password: $password
      phone: $phone
      department: $department
      specialization: $specialization
      experience: $experience
      availableDate: $availableDate
      consultationFee: $consultationFee
      fromTime:$fromTime
      toTime:$toTime
      status: $status
    ) {
      message
      doctor {
        id
        department
        specialization
        experience
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
    $availableDate: String!
    $fromTime: String!
    $toTime: String!
    $consultationFee: Int!
    $status: Boolean!
    $user: ID
    $availability:ID
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
      availableDate: $availableDate
      fromTime:$fromTime
      toTime:$toTime
      consultationFee: $consultationFee
      status: $status
      user: $user
      availability:$availability
    ) {
      message
      doctor {
        id
        department
        specialization
        experience
        consultationFee
        status
        user {
          id
          userName
          email
          phone
        }
        availability{
          id
          availableDate
          fromTime
          toTime
        }
      }
    }
  }
`;

export const CHANGEDOCTORSTATUS = gql`
    mutation ChangeDoctorStatus(
      $id: ID!
      $status:Boolean
    ) {
      changeDoctorStatus(
          id: $id
          status:$status
        ) {
          message
          doctor {
              id
              status
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


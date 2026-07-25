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
      image
      about
      qualification
      address
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
    $consultationFee: Int!
    $qualification:String
    $address:String
    $image:String
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
      qualification: $qualification
      address:$address
      image:$image
      consultationFee: $consultationFee
      status: $status
    ) {
      message
      doctor {
        id
        department
        specialization
        experience
        consultationFee
        qualification
        address
        image
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
    $qualification:String
    $address:String
    $image:String
    $consultationFee: Int!
    $status: Boolean!
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
      qualification: $qualification
      address:$address
      image:$image
      consultationFee: $consultationFee
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


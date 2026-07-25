import { gql } from "@apollo/client";

export const GETME = gql`
  query GetMe {
    getMe {
      id
      userName
      email
      phone
      createdAt
      role {
        id
        roleName
      }
      patient {
        id
        age
        gender
        bloodGroup
        address
        dateOfBirth
        emergencyNumber
        height
        weight
      }
      doctor {
        id
        department
        specialization
        experience
        consultationFee
        status
        address
        dateOfBirth
        gender
        about
      }
    }
  }
`;

export const GETUSERS = gql`
  query GetMe {
    getUsers {
      id
      userName
      email
      phone
      createdAt
      role{
        id
        roleName
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register(
    $userName: String
    $email: String
    $password: String
    $confirmPassword: String
    $phone: String
  ) {
    register(
      userName: $userName
      email: $email
      password: $password
      confirmPassword: $confirmPassword
      phone: $phone
    ) {
      message
    }
  }
`;

export const LOGIN = gql`
  mutation Login(
    $email: String!
    $password: String!
  ) {
    login(
      email: $email
      password: $password
    ) {
      message
    }
  }
`;

export const FORGET = gql`
  mutation Forget(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    forget(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      message
    }
  }
`

export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;

export const CHANGEPASSWORD = gql`
  mutation ChangePassword(
    $password: String!
    $newPassword: String!
    $confirmPassword: String!
  ) {
    changePassword(
      password: $password
      newPassword: $newPassword
      confirmPassword: $confirmPassword
    ) {
      message
    }
  }
`;

export const UPDATEPROFILE = gql`
    mutation UpdateProfile(
        $userName: String
        $email: String
        $phone: String
        $address: String
        $dateOfBirth: Date
        $gender: String
        $bloodGroup: String
        $height: Float
        $weight: Float
        $age: Int
        $about: String
    ) {
        updateProfile(
            userName: $userName
            email: $email
            phone: $phone
            address: $address
            dateOfBirth: $dateOfBirth
            gender: $gender
            bloodGroup: $bloodGroup
            height: $height
            weight: $weight
            age: $age
            about: $about
        ) {
            message
        }
    }
`;
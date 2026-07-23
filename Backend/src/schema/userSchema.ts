import { gql } from 'graphql-tag';

/**
 * @module User/Schema
 * User GraphQL schema.
 * Defines user-related types, authentication responses,
 * queries, and mutations for user management.
 */
export const userSchema = gql`

    type Role {
        id: ID!
        roleName: String!
    }
        
    type User{
        id:ID!
        userName:String!
        email:String!
        password:String!
        confirmPassword:String!
        newPassword:String
        phone:String!
        role:Role
        createdAt:Date
        patient: Patient
    }
    
    type AuthResponse{
        message:String
        token:String
    }

    type Query{
        getUsers:[User]
        getMe:User
    }

    type Mutation{
        register(
            id:ID
            userName:String
            email:String
            password:String
            confirmPassword:String
            phone:String
            role:ID
        ):AuthResponse

        login(
            email:String
            password:String
        ):AuthResponse

        forget(
            email:String
            password:String
            confirmPassword:String
        ):AuthResponse

        changePassword(
            password:String
            newPassword:String
            confirmPassword:String
        ):AuthResponse

        updateProfile(
            userName:String
            phone:String
            email:String
       ):AuthResponse

        logout:AuthResponse

    }
`;
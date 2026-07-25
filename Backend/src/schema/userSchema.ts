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
        height: Float
        weight: Float
        createdAt:Date
        patient: Patient
        doctor: Doctor
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
            userName: String
            email: String
            phone: String
            address: String
            dateOfBirth: Date
            gender: String
            bloodGroup: String
            height: Float
            weight: Float
            age: Int
            about: String
        ): AuthResponse

        logout:AuthResponse

    }
`;
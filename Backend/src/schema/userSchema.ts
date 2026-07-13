import {gql} from 'graphql-tag';

/**
 * User GraphQL schema.
 * Defines user-related types, authentication responses,
 * queries, and mutations for user management.
 */
export const userSchema=gql`
    type User{
        id:ID!
        userName:String!
        email:String!
        password:String!
        confirmPassword:String!
        newPassword:String
        phone:String!
        role:User
    }
    
    type AuthResponse{
        message:String
        token:String
    }

    type Query{
        getUsers:[User]
    }

    type Mutation{
        register(
            id:ID
            userName:String
            email:String
            password:String
            confirmPassword:String!
            phone:String
            role:ID
        ):AuthResponse

        login(
            email:String
            password:String
        ):AuthResponse

        forget(
            email:String
            newPassword:String
            confirmPassword:String
        ):AuthResponse

        changePassword(
            password:String
            newPassword:String
            confirmPassword:String
        ):AuthResponse

        logout:AuthResponse
    }
`;
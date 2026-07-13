/**
 * Doctor GraphQL schema.
 * Defines doctor-related types, queries,
 * and mutations for managing doctor profiles.
*/
import {gql} from 'graphql-tag';
export const doctorSchema=gql`
    type Doctor{
        id:ID
        department:String!
        specialization:String!
        experience:Int!
        availableDays:Date!
        consultationFee:Int!
        status:Boolean!
        user:User
    }

    type DoctorResponse{
        message:String
        doctor:Doctor
    }

    type Query{
        getDoctors(
            userName: String
            department: String
            specialization: String
            availableDate: Date
        ):[Doctor]
    }

    type Mutation{
        addDoctor(
            userName:String!
            email:String!
            password:String!
            phone:String!
            department:String!
            specialization:String!
            experience:Int!
            availableDays:Date!
            consultationFee:Int!
            status:Boolean!
            user:ID
        ):DoctorResponse

        editDoctor(
            id:ID!
            userName:String!
            email:String!
            password:String!
            phone:String!
            department:String!
            specialization:String!
            experience:Int!
            availableDays:Date!
            consultationFee:Int!
            status:Boolean!
            user:ID
        ):DoctorResponse

        deleteDoctor(
            id:ID!
        ):DoctorResponse

        changeDoctorStatus(
            id:ID!
        ):DoctorResponse
    }
`


/**
 * @module Doctor/Schema
 * Doctor GraphQL schema.
 * Defines doctor-related types, queries,
 * and mutations for managing doctor profiles.
*/

import { gql } from 'graphql-tag';

export const doctorSchema = gql`

    type Doctor{
        id: ID!
        department: String!
        specialization: String!
        experience: Int!
        consultationFee: Int!
        status: Boolean!
        image:String
        about:String
        qualification:String
        address:String
        user: User
        dateOfBirth: Date
        gender: String
        appointment: [Appointment]
        availability:[DoctorAvailability]
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
            doctorName:String
            patientName:String
            status:String
        ):[Doctor]
    }

    type Mutation{
        addDoctor(
            userName: String!
            email: String!
            password: String!
            phone: String!
            department: String!
            specialization: String!
            experience: Int!
            qualification:String
            address:String
            image:String
            consultationFee: Int!
            status: Boolean
        ):DoctorResponse

        updateDoctor(
            id: ID!
            userName: String
            email: String
            phone: String
            password:String
            department: String
            specialization: String
            experience: Int
            qualification:String
            address:String
            image:String
            consultationFee: Int
            status: Boolean
        ):DoctorResponse

        deleteDoctor(
            id:ID!
        ):DoctorResponse

        changeDoctorStatus(
            id:ID!
            status: Boolean
        ):DoctorResponse

    }
`


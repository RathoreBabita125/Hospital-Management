import { gql } from 'graphql-tag';

/**
 * @module Appointment/Schema
 * Defines appointment-related types,
 * queries, and mutations for managing
 * doctor-patient appointments.
 */

export const appointmentSchema = gql`

    enum AppointmentStatus {
        PENDING
        CONFIRMED
        COMPLETED
        CANCELLED
    }

    type User {
        id: ID!
        userName: String!
        email: String!
        phone: String!
        patient: Patient
    }

    type Appointment{
        id:ID!
        department:String!
        availableDate:Date!
        timeSlot:String!
        status:String
        doctor:Doctor
        user:User
        createdAt:Date
        prescriptions: [Prescription] 
    }

    type AppointmentResponse{
        message:String
        appointment:Appointment
    }

    type Query{

        viewUpcomingAppointments:[Appointment]

        todayAppointments:[Appointment]

        getAppointments(
            userName: String
            doctorName: String
            email: String
            bloodGroup: String
            gender: String
            department: String
            status:String
            prescriptions:ID
        ):[Appointment]

        getAllAppointmentsDetails(
            doctorName:String
            patientName:String
            department:String
            specialization:String
            status:String
        ):[Appointment]
    }

    type Mutation{
        bookAppointment(
            department:String
            availableDate:Date
            timeSlot:String
            status:String
            doctor:ID
            user:ID
        ):AppointmentResponse

        rescheduleAppointment(
            id: ID!
            availableDate: Date!
            timeSlot: String!
        ): AppointmentResponse

        cancelAppointment(
            id:ID
        ):AppointmentResponse

        updateAppointmentStatus(
            id: ID
            status: AppointmentStatus
        ): AppointmentResponse

        
    }
`
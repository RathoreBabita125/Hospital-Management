import { gql } from 'graphql-tag';

/**
 * Appointment GraphQL schema.
 * Defines appointment-related types,
 * queries, and mutations for managing
 * doctor-patient appointments.
 */

export const appointmentSchema = gql`

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
    }

    type AppointmentResponse{
        message:String
        appointment:Appointment
    }

    type Query{
        viewUpcomingAppointments:[Appointment]
        todayAppointments:[Appointment]
        getAppointments:[Appointment]
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
            id:ID
            department:String
            availableDate:Date
            timeSlot:String
            status:String
            doctor:ID
            user:ID
        ):AppointmentResponse

        acceptAppointment(
            id:ID
        ):AppointmentResponse

        completeAppointment(
            id:ID
        ):AppointmentResponse

        cancelAppointment(
            id:ID
        ):AppointmentResponse

        
    }
`
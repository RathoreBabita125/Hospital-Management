import {gql} from 'graphql-tag';

/**
 * @module DoctorAvailability/Schema
 * Defines the type, queries, and mutations used to manage a
 * doctor's available time slots for patient appointment booking.
 */

export const doctorAvailabilitySchema=gql`

    type TimeSlot{
        id:ID!
        fromTime:String!
        toTime:String!
        isBooked:Boolean
        availability:DoctorAvailability
        doctor:Doctor
    }

    type DoctorAvailability {
        id: ID!
        availableDate: Date!
        fromTime: String!
        toTime: String!
        slotDuration: Int!
        isBooked:Boolean
        doctor: Doctor
        timeSlot:[TimeSlot]
    }

    type AvailabilityResponse {
        message: String
        availability: DoctorAvailability
    }

    type Query {
        getMyAvailability: [DoctorAvailability]
        getTimeSlots:[TimeSlot]
    }

    type Mutation {
    
        addAvailability(
            availableDate: Date
            fromTime: String
            toTime: String
            slotDuration:Int
            isBooked:Boolean
            doctor:ID
        ): AvailabilityResponse

        updateAvailability(
            id: ID!
            availableDate: Date
            fromTime: String
            toTime: String
            slotDuration:Int
            isBooked:Boolean
            doctor:ID
        ): AvailabilityResponse

        deleteAvailability(
            id: ID!
        ): AvailabilityResponse
    }
`;
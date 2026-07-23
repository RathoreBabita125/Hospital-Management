import {gql} from 'graphql-tag';

/**
 * @module DoctorAvailability/Schema
 * Defines the type, queries, and mutations used to manage a
 * doctor's available time slots for patient appointment booking.
 */

export const doctorAvailabilitySchema=gql`

    type DoctorAvailability {
        id: ID!
        availableDate: Date!
        fromTime: String!
        toTime: String!
        isBooked: Boolean!
        doctor: Doctor
    }

    type AvailabilityResponse {
        message: String
        availability: DoctorAvailability
    }

    type Query {
        getMyAvailability: [DoctorAvailability]
    }

    type Mutation {
    
        addAvailability(
            availableDate: Date!
            fromTime: String!
            toTime: String!
            doctor:ID
        ): AvailabilityResponse

        updateAvailability(
            id: ID!
            availableDate: Date
            fromTime: String
            toTime: String
            doctor:ID
        ): AvailabilityResponse

        deleteAvailability(
            id: ID!
        ): AvailabilityResponse
    }
`;
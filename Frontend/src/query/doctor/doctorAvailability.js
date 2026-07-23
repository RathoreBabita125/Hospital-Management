import { gql } from "@apollo/client";

export const GETMYAVAILABILITY = gql`
    query GetMyAvailability {
        getMyAvailability {
            id
            availableDate
            fromTime
            toTime
            isBooked
            doctor{
                id
                department
            }
        }
    }
`;

export const ADDAVAILABILITY = gql`
    mutation AddAvailability(
        $availableDate: Date!
        $fromTime: String!
        $toTime: String!
    ) {
        addAvailability(
            availableDate: $availableDate
            fromTime: $fromTime
            toTime: $toTime
        ) {
            message
            availability {
                id
                availableDate
                fromTime
                toTime
                isBooked
            }
        }
    }
`;

export const UPDATEAVAILABILITY = gql`
    mutation UpdateAvailability(
        $id: ID!
        $availableDate: Date
        $fromTime: String
        $toTime: String
    ) {
        updateAvailability(
            id: $id
            availableDate: $availableDate
            fromTime: $fromTime
            toTime: $toTime
        ) {
            message
            availability {
                id
                availableDate
                fromTime
                toTime
                isBooked
            }
        }
    }
`;

export const DELETEAVAILABILITY = gql`
    mutation DeleteAvailability($id: ID!) {
        deleteAvailability(id: $id) {
            message
            availability {
                id
            }
        }
    }
`;
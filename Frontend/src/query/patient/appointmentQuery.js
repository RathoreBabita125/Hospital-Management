import { gql } from '@apollo/client';

export const GETAPPOINTMENTS = gql`
    query GetAppointments {
        getAppointments {
            id
            department
            availableDate
            timeSlot
            status
            createdAt
            user {
                id
                userName
                email
                phone
                patient {
                    age
                    gender
                    bloodGroup
                    address
                    emergencyNumber
                }
            }
            doctor {
                id
                department
                specialization
                experience
                consultationFee
                user {
                    id
                    userName
                    email
                    phone
                }
            }
        }
    }
`;

export const BOOKAPPOINTMENT = gql`
    mutation BookAppointment(
        $doctor: ID!
        $department: String!
        $availableDate: Date!
        $timeSlot: String!
    ) {
    bookAppointment(
        doctor: $doctor
        department: $department
        availableDate: $availableDate
        timeSlot: $timeSlot
    ) {
        message
        appointment {
        id
        department
        availableDate
        timeSlot
        }
    }
}
`;
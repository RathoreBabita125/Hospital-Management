import { gql } from '@apollo/client';

export const GETAPPOINTMENTS = gql`
    query GetAppointments(
        $userName: String
        $doctorName: String
        $email: String
        $bloodGroup: String
        $gender: String
        $department: String
        $status:String
    ){
        getAppointments(
            userName: $userName
            doctorName: $doctorName
            email: $email
            bloodGroup: $bloodGroup
            gender: $gender
            department: $department
            status:$status
        ){
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


export const UPDATEAPPOINTMENTSTATUS = gql`
  mutation UpdateAppointmentStatus(
        $id: ID!, 
        $status: AppointmentStatus
    ) {
    updateAppointmentStatus(
        id: $id, 
        status: $status
    ) {
      message
      appointment {
        id
        status
        availableDate
      }
    }
  }
`;

export const RESCHEDULEAPPOINTMENT = gql`
    mutation RescheduleAppointment(
        $id: ID!
        $availableDate: Date!
        $timeSlot: String!
    ) {
        rescheduleAppointment(
            id: $id
            availableDate: $availableDate
            timeSlot: $timeSlot
        ) {
            message
            appointment {
                id
                availableDate
                timeSlot
                status
            }
        }
    }
`;

export const CANCELAPPOINTMENT = gql`
    mutation CancelAppointment(
        $id: ID!
    ) {
        cancelAppointment(
            id: $id
        ) {
            message
            appointment {
                id
                status
            }
        }
    }
`;


import { gql } from "@apollo/client";

export const ADDPATIENT = gql`
    mutation AddPatient(
        $age: Int!
        $gender: String!
        $bloodGroup: String!
        $address: String!
        $dateOfBirth: Date!
        $emergencyNumber: String!
        $user:ID!
    ) {
        addPatient(
            age: $age
            gender: $gender
            bloodGroup: $bloodGroup
            address: $address
            dateOfBirth: $dateOfBirth
            emergencyNumber: $emergencyNumber
            user:$user
        ) {
        message
            patient {
                id
                age
                gender
                bloodGroup
                address
                dateOfBirth
                emergencyNumber
                user{
                    id
                    userName
                    email
                    phone
                }
            }
        }
    }
`;
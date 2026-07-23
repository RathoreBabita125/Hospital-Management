import {gql} from 'graphql-tag'
import { userSchema } from './userSchema.ts'
import { doctorSchema } from './doctorSchema.ts'
import { patientSchema } from './patientSchema.ts'
import { appointmentSchema } from './appointmentSchema.ts'
import { prescriptionSchema } from './prescriptionSchema.ts'
import { documentSchema } from './documentSchema.ts'
import { medicalHistorySchema } from './medicalHistorySchema.ts'
import { doctorAvailabilitySchema } from './doctorAvailabilitySchema.ts'

/**
 * @module Schema/Root
*/

export const typeDefs=gql`
    scalar Date
    ${userSchema}
    ${doctorSchema}
    ${patientSchema}
    ${appointmentSchema}
    ${prescriptionSchema}
    ${documentSchema}
    ${medicalHistorySchema}
    ${doctorAvailabilitySchema}
`
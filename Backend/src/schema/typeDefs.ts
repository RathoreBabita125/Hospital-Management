import {gql} from 'graphql-tag'
import { userSchema } from './userSchema.ts'
import { doctorSchema } from './doctorSchema.ts'
import { patientSchema } from './patientSchema.ts'

export const typeDefs=gql`
    scalar Date
    ${userSchema}
    ${doctorSchema}
    ${patientSchema}
`
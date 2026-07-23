/**
 *  @module Resolvers/Root
 */
import { adminResolvers} from "./admin.controller.ts";
import { doctorResolver } from "./doctor.controller.ts";
import { documentResolvers } from "./document.controller.ts";
import { medicalResolver } from "./medicalHistory.controller.ts";
import { patientResolvers } from "./patient.controller.ts";
import { userResolvers } from "./user.controller.ts";

/**
 * Query and Mutation fields are merged from each domain resolver
 * using the spread operator
 */
export const resolvers = {
    Query:{
        ...userResolvers.Query,
        ...adminResolvers.Query,
        ...patientResolvers.Query,
        ...doctorResolver.Query,
        ...documentResolvers.Query,
        ...medicalResolver.Query
    },

    Mutation:{
        ...userResolvers.Mutation,
        ...adminResolvers.Mutation,
        ...patientResolvers.Mutation,
        ...doctorResolver.Mutation,
        ...documentResolvers.Mutation,
        ...medicalResolver.Mutation
    }
}
import { adminResolvers} from "./admin.controller.ts";
import { patientResolvers } from "./patient.controller.ts";
import { userResolvers } from "./user.controller.ts";

export const resolvers = {
    Query:{
        ...userResolvers.Query,
        ...adminResolvers.Query
    },

    Mutation:{
        ...userResolvers.Mutation,
        ...adminResolvers.Mutation,
        ...patientResolvers.Mutation
    }
}
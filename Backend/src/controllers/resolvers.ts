import { adminResolvers} from "./admin.controller.ts";
import { doctorResolver } from "./doctor.controller.ts";
import { documentResolvers } from "./document.controller.ts";
import { patientResolvers } from "./patient.controller.ts";
import { userResolvers } from "./user.controller.ts";

export const resolvers = {
    Query:{
        ...userResolvers.Query,
        ...adminResolvers.Query,
        ...patientResolvers.Query,
        ...doctorResolver.Query,
        ...documentResolvers.Query
    },

    Mutation:{
        ...userResolvers.Mutation,
        ...adminResolvers.Mutation,
        ...patientResolvers.Mutation,
        ...doctorResolver.Mutation,
        ...documentResolvers.Mutation
    }
}
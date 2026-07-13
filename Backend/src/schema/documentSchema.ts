import { gql } from 'graphql-tag'

/**
 * Document GraphQL schema.
 * Defines document-related types, queries,
 * and mutations for managing uploaded files
 * associated with appointments.
 */
export const documentSchema = gql`

    type Document {
        id: ID!
        fileName: String!
        fileType: String!
        fileUrl: String!
        documentType: String!
        createdAt: Date!
        updatedAt: Date!
        appointment: Appointment!
    }

    type DocumentResponse {
        message: String
        document: Document
    }

    type Query {
        getDocuments: [Document]
    }

    type Mutation {

        uploadDocument(
            fileName: String!
            fileType: String!
            fileUrl: String!
            documentType: String!
            appointment: ID
        ): DocumentResponse

        deleteDocument(
            id: ID!
        ): DocumentResponse
        
    }

`
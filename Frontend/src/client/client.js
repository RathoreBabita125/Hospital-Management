import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// GraphQL API endpoint loaded from Vite environment variables
const apiUrl = import.meta.env.VITE_API_URL;

// Create and export a single Apollo Client instance
export const client = new ApolloClient({
    link: new HttpLink({ 
        uri: apiUrl,
        credentials:"include"
    }),
    cache: new InMemoryCache(),
});
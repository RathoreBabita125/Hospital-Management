/**
 * Application entry point.
 * Initializes database connection, seeds initial data,
 * configures Express middleware, and starts GraphQL server.
 */
import "reflect-metadata"
import express from 'express';
import { AppDataSource } from './src/config/db.ts';
import { ApolloServer } from "@apollo/server";
import { resolvers } from "./src/controllers/resolvers.ts";
import { typeDefs } from "./src/schema/typeDefs.ts";
import { expressMiddleware } from "@as-integrations/express5";
import { seedRoles } from "./src/seed/seedRoles.ts";
import { seedAdmin } from "./src/seed/seedAdmin.ts";
import cookieParser from 'cookie-parser'
import cors from "cors";
import { AuthMiddleware } from "./src/middleware/authMiddleware.ts";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL?.trim();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: CLIENT_URL,
  credentials:true
}));

/**
 * Starts the application server.
 * Connects database, initializes seed data,
 * and configures Apollo GraphQL server.
 */
const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database is connected successfuly.");

    await seedRoles();
    await seedAdmin();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();

    app.use(
      "/graphql",
      express.json(),
      expressMiddleware(server,{
        context:async({req, res,})=>{
          const user=AuthMiddleware(req);
          return{
            req,
            res,
            user
          }

        }
      })
    );

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/graphql`);
    });
    
  } catch (error) {
    console.error(error);
  }
};
startServer();

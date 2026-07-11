import "reflect-metadata"
import express from 'express';
import dotenv from 'dotenv';
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
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

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

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/graphql`);
    });
    
  } catch (error) {
    console.error(error);
  }
};
startServer();

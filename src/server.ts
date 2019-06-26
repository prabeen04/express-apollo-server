import express from "express";
import session from 'express-session';
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import depthLimit from "graphql-depth-limit";
import { createServer } from "http";
import compression from "compression";
import cors from "cors";
import dotenv from 'dotenv';
import schema from "./schema";
const app = express();
dotenv.config()
export function startServer() {
  mongoose.Promise = global.Promise;
  mongoose.connect("mongodb://localhost:27017/graphql", {
    useNewUrlParser: true
  }).then(res => {
    const server = new ApolloServer({
      schema,
      validationRules: [depthLimit(7)],
      context: ({ req, res }: any) => ({ req, res })
    });
    app.use("*", cors());
    // body parser middleware
    app.use(bodyParser.json());
    app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );
    app.use(
      session({
        name: "qid",
        secret: 'dgagagagag',
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        }
      })
    );
    app.use(compression());
    server.applyMiddleware({ app, path: "/graphql" });
    const httpServer = createServer(app);
    httpServer.listen(
      { port: 4000 },
      (): void =>
        console.log(
          `\n🚀     GraphQL is now running on http://localhost:4000/graphql`
        )
    );
  })
    .catch(() => console.log("MongoDB connection error:"));
  ;

}
startServer();

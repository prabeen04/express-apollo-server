import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';
const app = express();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/graphql", { useNewUrlParser: true });
//Get the default connection
let conn = mongoose.createConnection("mongodb://localhost:27017/graphql");

//Bind connection to error event (to get notification of connection errors)
conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
});
app.use('*', cors());
// body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);
httpServer.listen(
  { port: 4000 },
  (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:4000/graphql`));
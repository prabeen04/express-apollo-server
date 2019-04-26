import "graphql-import-node";
import * as path from 'path'
import { GraphQLSchema } from "graphql";
import { mergeResolvers, mergeTypes, fileLoader } from "merge-graphql-schemas";
import registerResolver from "./modules/auth/register/registerResolver";
import loginRegister from './modules/auth/login/loginResolver'
import todoResolver from "./modules/todo/todoResolver";
import storyResolver from "./modules/story/storyResolver";
import contactResolver from './modules/contact/contactResolver';
import accountResolver from './modules/account/accountResolver';
const typesArray = fileLoader(path.join(__dirname, './modules/**/*.graphql'), { recursive: true })

import { makeExecutableSchema } from "graphql-tools";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: mergeTypes(typesArray, { all: true }),
  resolvers: mergeResolvers([registerResolver, loginRegister, todoResolver, storyResolver, contactResolver, accountResolver])
});
export default schema;
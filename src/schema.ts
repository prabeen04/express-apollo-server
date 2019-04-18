import "graphql-import-node";
import * as path from "path";
import { GraphQLSchema } from "graphql";
import { mergeResolvers, mergeTypes, fileLoader } from "merge-graphql-schemas";
import * as userSchema from './modules/auth/shared/schema.graphql'
import * as registerTypedefs from "./modules/auth/register/schema.graphql";
import registerResolver from "./modules/auth/register/registerResolver";

import * as todoTypedefs from "./modules/todo/schema.graphql";
import todoResolver from "./modules/todo/todoResolver";

import * as storyTypedefs from "./modules/story/schema.graphql";
import storyResolver from "./modules/story/storyResolver";

import { makeExecutableSchema } from "graphql-tools";
const typesArray = fileLoader(path.join(__dirname, '.'), { recursive: true })
const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: mergeTypes(typesArray, { all: true }),
  resolvers: mergeResolvers([registerResolver, todoResolver, storyResolver])
});
export default schema;

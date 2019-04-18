import "graphql-import-node";
import { GraphQLSchema } from "graphql";
import { mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import * as userSchema from "./modules/auth/shared/schema.graphql";
import * as registerTypedefs from "./modules/auth/register/schema.graphql";
import registerResolver from "./modules/auth/register/registerResolver";

import * as todoTypedefs from "./modules/todo/schema.graphql";
import todoResolver from "./modules/todo/todoResolver";

import * as storyTypedefs from "./modules/story/schema.graphql";
import storyResolver from "./modules/story/storyResolver";

import { makeExecutableSchema } from "graphql-tools";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [userSchema, registerTypedefs, todoTypedefs, storyTypedefs],
  resolvers: mergeResolvers([registerResolver, todoResolver, storyResolver])
});
export default schema;

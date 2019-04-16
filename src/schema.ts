import "graphql-import-node";
import { GraphQLSchema } from "graphql";
import { mergeResolvers, mergeTypes } from "merge-graphql-schemas";
// import * as typeDefs from "./schema/schema.graphql";
import * as registerTypedefs from "./modules/auth/register/schema.graphql";
import * as registerResolver from "./modules/auth/register/registerResolver";

import * as todoTypedefs from "./modules/todo/schema.graphql";
import * as todoResolver from "./modules/todo/todoResolver";

import { makeExecutableSchema } from "graphql-tools";
// import resolvers from "./resolvers";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: mergeTypes([registerTypedefs, todoTypedefs]),
  resolvers: mergeResolvers([registerResolver, todoResolver])
});
export default schema;

import "graphql-import-node";
import { mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import * as typeDefs from "./schema/schema.graphql";
import * as registerTypedefs from "./modules/auth/register/schema.graphql";
import * as registerResolver from "./modules/auth/register/registerResolver";
import * as todoTypedefs from "./modules/todo/schema.graphql";
import * as todoResolver from "./modules/todo/todoResolver";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "./resolvers";
import { GraphQLSchema } from "graphql";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: mergeTypes([typeDefs, registerTypedefs, todoTypedefs]),
  resolvers: mergeResolvers([resolvers, registerResolver, todoResolver])
});
export default schema;

import "graphql-import-node";
import { mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import * as typeDefs from "./schema/schema.graphql";
import * as registerTypedefs from "./modules/auth/register/schema.graphql";
import * as registerResolver from './modules/auth/register/registerResolver'
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
import resolvers from "./resolvers";
import { GraphQLSchema } from "graphql";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: mergeTypes([typeDefs, registerTypedefs]),
  resolvers: mergeResolvers([resolvers, registerResolver])
});
export default schema;

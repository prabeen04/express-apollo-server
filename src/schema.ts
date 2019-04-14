import "graphql-import-node";
import { mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import * as typeDefs from "./schema/schema.graphql";
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
import resolvers from "./resolvers";
import { GraphQLSchema } from "graphql";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: mergeTypes([typeDefs]),
  resolvers: mergeResolvers([resolvers])
});
export default schema;

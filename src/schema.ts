import "graphql-import-node";
import * as path from "path";
import { GraphQLSchema } from "graphql";
import { mergeResolvers, mergeTypes, fileLoader } from "merge-graphql-schemas";
import registerResolver from "./modules/auth/register/registerResolver";
import todoResolver from "./modules/todo/todoResolver";
import storyResolver from "./modules/story/storyResolver";
import * as sharedSchema from './modules/auth/shared/schema.graphql'
import * as registerSChema from './modules/auth/register/schema.graphql'
import * as loginSchema from './modules/auth/login/schema.graphql'
import * as todoSchema from './modules/todo/schema.graphql'
import * as storySchema from './modules/story/schema.graphql'
import { makeExecutableSchema } from "graphql-tools";
// const typesArray = fileLoader(path.join(__dirname, './modules/**/*.graphql'), { recursive: true })
const typesArray: any[] = [sharedSchema, registerSChema, loginSchema, todoSchema, storySchema]

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: mergeTypes(typesArray, { all: true }),
  resolvers: mergeResolvers([registerResolver, todoResolver, storyResolver])
});
export default schema;

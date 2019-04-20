"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("graphql-import-node");
var merge_graphql_schemas_1 = require("merge-graphql-schemas");
var userSchema = __importStar(require("./modules/auth/shared/schema.graphql"));
var registerTypedefs = __importStar(require("./modules/auth/register/schema.graphql"));
var registerResolver_1 = __importDefault(require("./modules/auth/register/registerResolver"));
var todoTypedefs = __importStar(require("./modules/todo/schema.graphql"));
var todoResolver_1 = __importDefault(require("./modules/todo/todoResolver"));
var storyTypedefs = __importStar(require("./modules/story/schema.graphql"));
var storyResolver_1 = __importDefault(require("./modules/story/storyResolver"));
var graphql_tools_1 = require("graphql-tools");
var schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: merge_graphql_schemas_1.mergeTypes([userSchema, registerTypedefs, todoTypedefs, storyTypedefs, storyTypedefs], { all: true }),
    resolvers: merge_graphql_schemas_1.mergeResolvers([registerResolver_1.default, todoResolver_1.default, storyResolver_1.default])
});
exports.default = schema;

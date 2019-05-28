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
var path = __importStar(require("path"));
var merge_graphql_schemas_1 = require("merge-graphql-schemas");
var registerResolver_1 = __importDefault(require("./modules/auth/register/registerResolver"));
var loginResolver_1 = __importDefault(require("./modules/auth/login/loginResolver"));
var todoResolver_1 = __importDefault(require("./modules/todo/todoResolver"));
var storyResolver_1 = __importDefault(require("./modules/story/storyResolver"));
var typesArray = merge_graphql_schemas_1.fileLoader(path.join(__dirname, './modules/**/*.graphql'), { recursive: true });
var graphql_tools_1 = require("graphql-tools");
var schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: merge_graphql_schemas_1.mergeTypes(typesArray, { all: true }),
    resolvers: merge_graphql_schemas_1.mergeResolvers([registerResolver_1.default, loginResolver_1.default, todoResolver_1.default, storyResolver_1.default])
});
exports.default = schema;

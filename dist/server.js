"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
var http_1 = require("http");
var compression_1 = __importDefault(require("compression"));
var cors_1 = __importDefault(require("cors"));
var schema_1 = __importDefault(require("./schema"));
var app = express_1.default();
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect("mongodb://localhost:27017/graphql", { useNewUrlParser: true });
var conn = mongoose_1.default.createConnection("mongodb://localhost:27017/graphql");
conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
var server = new apollo_server_express_1.ApolloServer({
    schema: schema_1.default,
    validationRules: [graphql_depth_limit_1.default(7)],
});
app.use('*', cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false
}));
app.use(compression_1.default());
server.applyMiddleware({ app: app, path: '/graphql' });
var httpServer = http_1.createServer(app);
httpServer.listen({ port: 4000 }, function () { return console.log("\n\uD83D\uDE80      GraphQL is now running on http://localhost:4000/graphql"); });

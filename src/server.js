"use strict";
exports.__esModule = true;
var core_1 = require("@graphql-modules/core");
var apollo_server_express_1 = require("apollo-server-express");
var express = require("express");
var config_1 = require("./config");
var user_module_1 = require("./graphql/user-module");
var logger_1 = require("./utils/logger");
var list_module_1 = require("./graphql/list-module");
var sharedList_module_1 = require("./graphql/sharedList-module");
var appModule = new core_1.GraphQLModule({
    imports: [user_module_1.UserModule, list_module_1.ListModule, sharedList_module_1.SharedListModule]
});
var schema = appModule.schema, context = appModule.context;
var server = new apollo_server_express_1.ApolloServer({
    schema: schema,
    context: context
});
var app = express();
server.applyMiddleware({ app: app });
app.listen({ port: config_1.port }, function () { return logger_1.logger.info("\uD83D\uDE80 Server ready at http://localhost:4000" + server.graphqlPath); });

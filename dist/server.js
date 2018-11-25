"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@graphql-modules/core");
const apollo_server_express_1 = require("apollo-server-express");
const express = require("express");
const config_1 = require("./config");
const user_module_1 = require("./graphql/user-module");
const logger_1 = require("./utils/logger");
const list_module_1 = require("./graphql/list-module");
const sharedList_module_1 = require("./graphql/sharedList-module");
const appModule = new core_1.GraphQLModule({
    imports: [user_module_1.UserModule, list_module_1.ListModule, sharedList_module_1.SharedListModule]
});
const { schema, context } = appModule;
const server = new apollo_server_express_1.ApolloServer({
    schema,
    context,
    introspection: true
});
const app = express();
server.applyMiddleware({ app });
app.listen({ port: config_1.port }, () => logger_1.logger.info(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));

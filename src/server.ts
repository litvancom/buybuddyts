import { GraphQLModule } from "@graphql-modules/core";
import { ApolloServer } from "apollo-server-express";
import express = require("express");
import config from "./config";
import { UserModule } from "./graphql/user-module";
import { logger } from "./utils/logger";
import { ListModule } from "./graphql/list-module";
import { SharedListModule } from "./graphql/sharedList-module";

const appModule = new GraphQLModule({
  imports: [UserModule, ListModule, SharedListModule]
});

const { schema, context } = appModule;

const server = new ApolloServer({
  schema,
  context,
  introspection: true
});

const app = express();
server.applyMiddleware({ app });

app.listen(config.port, () => logger.info(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));

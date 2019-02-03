import "reflect-metadata";
import { GraphQLModule } from "@graphql-modules/core";
import { ApolloServer, introspectSchema, makeRemoteExecutableSchema, mergeSchemas } from "apollo-server-express";
import express = require("express");
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import config from "./config";
import { UserModule } from "./graphql/user-module";
import { logger } from "./utils/logger";
import { ListModule } from "./graphql/list-module";
import { SharedListModule } from "./graphql/sharedList-module";
import { ListItemModule } from "./graphql/listItem-module";
import { connection } from "./config/connection";

// @ts-ignore
// const link = new HttpLink({ uri: "http://api.githunt.com/graphql", fetch });

setImmediate(async () => {
  await connection;

  // const remoteSchema = await introspectSchema(link);

  // const executableSchema = makeRemoteExecutableSchema({
  //   schema: remoteSchema,
  //   link
  // });

  const appModule = new GraphQLModule({
    imports: [UserModule, ListModule, ListItemModule, SharedListModule]
  });

  const { schema, context } = appModule;

  const mergedSchema = mergeSchemas({
    schemas: [schema /*executableSchema*/]
  });

  const server = new ApolloServer({
    schema: mergedSchema,
    context,
    introspection: true
  });

  const cors = {
    origin: "*",
    credentials: true
  };

  const app = express();
  server.applyMiddleware({ app, cors });

  app.listen(config.port, () => logger.info(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
});

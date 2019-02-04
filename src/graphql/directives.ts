import { GraphQLModule } from "@graphql-modules/core";
import gql from "graphql-tag";
import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { logCath } from "../utils/logger";
import { IncomingMessage } from "http";
import AuthProvider from "../provider/authProvider";
import { RepositoryProvider } from "../provider/repositoryProvider";

export class IsAuthenticated extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      const [, , context] = args;
      if (!context.currentUser) {
        throw new Error(`Unauthenticated!`);
      }
      return await resolve.apply(this, args);
    };
  }
}

export const DirectivesModule = new GraphQLModule({
  typeDefs: gql`
    directive @isAuthenticated on FIELD | FIELD_DEFINITION
  `,
  providers: [AuthProvider, RepositoryProvider],
  schemaDirectives: { isAuthenticated: IsAuthenticated },
  async context(session, currentContext, { injector }) {
    const authToken = session.req.headers.authorization;
    const currentUser = await injector.get(AuthProvider).checkAuth(authToken);
    return {
      currentUser
    };
  }
});

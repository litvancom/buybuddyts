import { GraphQLModule } from "@graphql-modules/core";
import gql from "graphql-tag";
import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { logCath } from "../utils/logger";
import { IncomingMessage } from "http";
import AuthService from "../services/auth";

export class IsAuthenticated extends SchemaDirectiveVisitor {
  // public visitObject(object: GraphQLObjectType): GraphQLObjectType | void | null {
  //   return super.visitObject(object);
  // }

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
  //
  // public visitEnumValue(value: GraphQLEnumValue) {
  //     value.isDeprecated = true;
  //     value.deprecationReason = this.args.reason;
  // }
}

export const DirectivesModule = new GraphQLModule({
  typeDefs: gql`
    directive @isAuthenticated on FIELD | FIELD_DEFINITION
  `,
  schemaDirectives: {
    isAuthenticated: IsAuthenticated
  },
  contextBuilder: async ({ req }: { req: IncomingMessage }, currentContext) => {
    const {
      headers: { authorization }
    } = req;
    return {
      currentUser: await AuthService.checkAuth(authorization).catch(logCath)
    };
  }
});

// const context = async ({
//   req: {
//     headers: { authorization }
//   }
// }: {
//   authorization: any;
//   req: any;
// }) => {
//   return {
//     currentUser: await checkAuth(authorization).catch(logCath)
//   };
// };

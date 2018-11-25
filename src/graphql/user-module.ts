import { GraphQLModule } from "@graphql-modules/core";
import bcrypt = require("bcrypt");
import gql from "graphql-tag";
import { getUserLists } from "../db/model/list";
import { createUser, findLogin } from "../db/model/user";
import { signToken } from "../services/auth";
import { DirectivesModule } from "./directives";
import { ListModule } from "./list-module";

// @ts-ignore
export const UserModule = new GraphQLModule({
  imports: [DirectivesModule, ListModule],
  typeDefs: gql`
    type User {
      id: ID!
      userName: String!
    }

    input NewUser {
      userName: String!
      password: String!
    }

    type Token {
      bearer: String!
      user: User!
    }

    type AuthorizedUser {
      id: ID!
      userName: String!
      lists: [List]
    }

    type Query {
      me: AuthorizedUser @isAuthenticated
      userLogin(userName: String, password: String): Token!
    }

    type Mutation {
      userRegister(input: NewUser): User!
    }
  `,
  resolvers: {
    AuthorizedUser: {
      lists: async (root: any, args: any, { currentUser: { id: userId } }: { userId: string; currentUser: any }) => {
        return await getUserLists(userId);
      }
    },
    Query: {
      me: (root: any, args: any, context: any) => {
        return context.currentUser;
      },
      userLogin: async (_: any, { userName, password }: { userName: string; password: string }, context: any) => {
        const [user = {}] = await findLogin({ userName });
        if (await bcrypt.compare(password, user.password)) {
          delete user.password;

          const bearer = await signToken(user);
          return {
            bearer,
            user
          };
        } else {
          throw new Error("User does not match");
        }
      }
    },
    Mutation: {
      userRegister: async (root: any, { input }: { input: any }, context: any) => {
        input.password = await bcrypt.hash(input.password, 10);
        return await createUser(input);
      }
    }
  }
});

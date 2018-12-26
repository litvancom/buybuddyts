import { GraphQLModule } from "@graphql-modules/core";
import gql from "graphql-tag";
import { DirectivesModule } from "./directives";
import { ListModule } from "./list-module";
import UserModel from "../db/model/user";
import ListModel from "../db/model/list";
import bcrypt = require("bcrypt");
import rp = require("request-promise");
import { logger } from "../utils/logger";
import AuthService from "../services/auth";

// @ts-ignore
export const UserModule = new GraphQLModule({
  imports: [DirectivesModule, ListModule],
  typeDefs: gql`
    type User {
      id: ID!
      userName: String!
      email: String!
    }

    input NewUser {
      userName: String!
      email: String!
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
      userFriends: User! @isAuthenticated
      userFindNewFriends(query: String!): [User]! @isAuthenticated
      userFbLogin(token: String!): Token
    }

    type Mutation {
      userRegister(input: NewUser): User!
      userAddFriends(friendsIds: [ID]!): [User] @isAuthenticated
      userDeleteFriends(friendsIds: [ID]!): Boolean @isAuthenticated
    }
  `,
  resolvers: {
    AuthorizedUser: {
      lists: async (root: any, args: any, { currentUser: { id: userId } }: { userId: string; currentUser: any }) => {
        return await ListModel.findByUserId(userId);
      }
    },
    Query: {
      me: (root: any, args: any, context: any) => {
        return context.currentUser;
      },
      userLogin: async (_: any, { userName, password }: { userName: string; password: string }, context: any) => {
        const [user = {}] = await UserModel.findLogin({ userName });
        if (await bcrypt.compare(password, user.password)) {
          delete user.password;

          const bearer = await AuthService.signToken(user);
          return {
            bearer,
            user
          };
        } else {
          throw new Error("User does not match");
        }
      },
      userFriends: async (root, args, { currentUser: { id } }) => {
        return await UserModel.getFriends(id);
      },
      userFindNewFriends: async (root, { query }: { query: string }, { currentUser: { id } }) => {
        return UserModel.findNewFriends(id, query);
      },
      userFbLogin: async (root, { token }, context) => {
        const fbData = await AuthService.fbCheckToken(token);
        const user = await UserModel.fbLogin(fbData);

        return {
          bearer: AuthService.signToken(user),
          user
        };
      }
    },

    Mutation: {
      userRegister: async (root: any, { input }: { input: any }, context: any) => {
        input.password = await bcrypt.hash(input.password, 10);
        return await UserModel.create(input);
      },
      userAddFriends: async (root, { friendsIds }: { friendsIds: string[] }, { currentUser: { id } }) => {
        return UserModel.addFriends(id, friendsIds);
      },
      userDeleteFriends: async (root, { friendsIds }: { friendsIds: string[] }, { currentUser: { id } }) => {
        return UserModel.deleteFriends(id, friendsIds);
      }
    }
  }
});

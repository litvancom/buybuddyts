import { GraphQLModule, ModuleContext } from "@graphql-modules/core";
import gql from "graphql-tag";
import { DirectivesModule } from "./directives";
import { ListModule } from "./list-module";
import UserModel from "../db/model/user";
import ListModel from "../db/model/list";
import bcrypt = require("bcrypt");

import { UserRepository } from "../repository/userRepository";
import { RepositoryProvider } from "../provider/repositoryProvider";
import AuthProvider from "../provider/authProvider";

// @ts-ignore
export const UserModule = new GraphQLModule({
  imports: [DirectivesModule],
  providers: [RepositoryProvider, AuthProvider],
  typeDefs: gql`
    type User {
      id: ID!
      userName: String!
      email: String!
      emailIsConfirmed: Boolean!
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
      #      lists: [List]
    }

    type Query {
      me: AuthorizedUser @isAuthenticated
      userLogin(email: String, password: String): Token!
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
      // lists: async (root: any, args: any, { currentUser: { id: userId } }: { userId: string; currentUser: any }) => {
      //   return await ListModel.findByUserId(userId);
      // }
    },
    Query: {
      me: (root: any, args: any, context: any) => {
        return context.currentUser;
      },
      userLogin: async (_: any, { email, password }: { email: string; password: string }, { injector }: ModuleContext) => {
        const repository = injector.get(RepositoryProvider).getRepository(UserRepository);
        const user = await repository.findOne({
          where: { email },
          select: ["id", "userName", "email", "emailIsConfirmed", "password"]
        });

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (passwordIsValid) {
          const bearer = await injector.get(AuthProvider).signToken(user);
          return { bearer, user };
        } else {
          throw new Error("User does not match");
        }
      },
      userFriends: async (root, args, { currentUser: { id } }) => {
        throw Error("Not implemented");
        // return await UserModel.getFriends(id);
      },
      userFindNewFriends: async (root, { query }: { query: string }, { currentUser: { id } }) => {
        throw Error("Not implemented");
        // return UserModel.findNewFriends(id, query);
      },
      userFbLogin: async (root, { token }, context) => {
        throw Error("Not implemented");
        // const fbData = new AuthProvider().fbCheckToken(token);
        // const user = await UserModel.fbLogin(fbData);
        //
        // return {
        //   bearer: new AuthProvider().signToken(user),
        //   user
        // };
      }
    },

    Mutation: {
      userRegister: async (root: any, { input }: { input: any }, { injector }: ModuleContext) => {
        const userRepository = injector.get(RepositoryProvider).getRepository(UserRepository);
        const user = userRepository.create(input);
        await userRepository.save(user);
        return user;
      },
      userAddFriends: async (root, { friendsIds }: { friendsIds: string[] }, { currentUser: { id } }) => {
        throw Error("Not implemented");
        // return UserModel.addFriends(id, friendsIds);
      },
      userDeleteFriends: async (root, { friendsIds }: { friendsIds: string[] }, { currentUser: { id } }) => {
        throw Error("Not implemented");
        // return UserModel.deleteFriends(id, friendsIds);
      }
    }
  }
});

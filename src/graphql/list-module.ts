import { DirectivesModule } from "./directives";
import gql from "graphql-tag";
import { GraphQLModule, ModuleContext } from "@graphql-modules/core";
import { ListItemModule } from "./listItem-module";

import { RepositoryProvider } from "../provider/repositoryProvider";
import { ListRepository } from "../repository/listRepository";
import { ListItemRepository } from "../repository/listItemRepository";

export const ListModule = new GraphQLModule({
  imports: [DirectivesModule, ListItemModule],
  providers: [RepositoryProvider],
  typeDefs: gql`
    type List {
      id: ID!
      title: String
      items: [ListItem]
    }

    input InputList {
      title: String!
    }

    type Query {
      list(id: ID!): List @isAuthenticated
    }

    type Mutation {
      listCreate(input: InputList!): List! @isAuthenticated
      listUpdate(id: ID!, input: InputList!): List! @isAuthenticated
      listDelete(id: ID!): Boolean @isAuthenticated
    }
  `,
  resolvers: {
    List: {
      items: async (root, args, { injector }: ModuleContext) => {
        return injector
          .get(RepositoryProvider)
          .getRepository(ListItemRepository)
          .find({ list: root });
      }
    },
    Query: {
      list: async (_, { id }: { id: string }, { currentUser: { id: user }, injector }: ModuleContext) => {
        return injector
          .get(RepositoryProvider)
          .getRepository(ListRepository)
          .findOne({ id, user });
      }
    },
    Mutation: {
      listCreate: async (_, { input }, { currentUser: { id }, injector }: ModuleContext) => {
        return injector
          .get(RepositoryProvider)
          .getRepository(ListRepository)
          .create({ ...input, user: id });
      },
      listUpdate: async (_, { input, id }, { injector }: ModuleContext) => {
        return injector
          .get(RepositoryProvider)
          .getRepository(ListRepository)
          .update({ id }, input);
      },
      listDelete: async (_, { id }: { id: string }, { injector }: ModuleContext) => {
        return injector
          .get(RepositoryProvider)
          .getRepository(ListRepository)
          .delete(id);
      }
    }
  }
});

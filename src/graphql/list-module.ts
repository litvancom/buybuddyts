import { DirectivesModule } from "./directives";
import gql from "graphql-tag";
import { GraphQLModule } from "@graphql-modules/core";
import { ListItemModule } from "./listItem-module";
import { createList, deleteList, updateList } from "../db/model/list";
import { getListItems } from "../db/model/listItem";
import { logger } from "../utils/logger";

export const ListModule = new GraphQLModule({
  imports: [DirectivesModule, ListItemModule],
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
      items: async ({ id }, args, context) => {
        return getListItems(id);
      }
    },
    Query: {
      list: async (_, { id }: { id: string }, context) => {
        throw new Error("Not Implemented"); // todo implement
      }
    },
    Mutation: {
      listCreate: async (_, { input }, { currentUser: { id } }) => {
        return createList(input, id);
      },
      listUpdate: async (_, { input, id }, context) => {
        return updateList(id, input);
      },
      listDelete: async (_, { id }: { id: string }, context) => {
        return deleteList(id);
      }
    }
  }
});

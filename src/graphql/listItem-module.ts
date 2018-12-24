import { DirectivesModule } from "./directives";
import gql from "graphql-tag";
import { GraphQLModule } from "@graphql-modules/core";
import ListModel from "../db/model/list";
import ListItemModel from "../db/model/listItem";

export const ListItemModule = new GraphQLModule({
  imports: [DirectivesModule],
  typeDefs: gql`
    type ListItem {
      id: ID!
      name: String
      valueName: String
      value: String
      category: String
      order: Int
      checked: Boolean
    }
    input InputListItem {
      name: String!
      valueName: String!
      value: String!
      listId: String!
      category: String
      order: Int
      checked: Boolean
    }
    type Mutation {
      listItemCreate(input: InputListItem!): ListItem! @isAuthenticated
      listItemUpdate(id: String!, input: InputListItem!): ListItem! @isAuthenticated
      listItemDelete(id: String!): [String] @isAuthenticated
    }
  `,
  resolvers: {
    Query: {
      listItem: async (_, { id }: { id: string }, context) => {
        throw new Error("Not Implemented"); // todo implement
      }
    },
    Mutation: {
      listItemCreate: async (_, { input }, context) => {
        return ListItemModel.create(input);
      },
      listItemUpdate: async (_, { id, input }, context) => {
        return ListItemModel.update(id, input);
      },
      listItemDelete: async (_, { id }: { id: string }, context) => {
        ListItemModel.delete(id);
      }
    }
  }
});

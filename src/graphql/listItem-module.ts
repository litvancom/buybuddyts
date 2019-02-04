import { DirectivesModule } from "./directives";
import gql from "graphql-tag";
import { GraphQLModule, ModuleContext } from "@graphql-modules/core";
import { RepositoryProvider } from "../provider/repositoryProvider";
import { ListItemRepository } from "../repository/listItemRepository";

export const ListItemModule = new GraphQLModule({
  imports: [DirectivesModule],
  providers: [RepositoryProvider],
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
    // Query: {
    //   listItem: async (_, { id }: { id: string }, context) => {
    //     throw new Error("Not Implemented"); // todo implement
    //   }
    // },
    Mutation: {
      listItemCreate: async (_, { input }, { injector }: ModuleContext) => {
        return injector
          .get(RepositoryProvider)
          .getRepository(ListItemRepository)
          .create(input);
      },
      listItemUpdate: async (_, { id, input }, { injector }: ModuleContext) => {
        return injector
          .get(RepositoryProvider)
          .getRepository(ListItemRepository)
          .create(input);
      },
      listItemDelete: async (_, { id }: { id: string }, { injector }: ModuleContext) => {
        return injector
          .get(RepositoryProvider)
          .getRepository(ListItemRepository)
          .delete(id);
      }
    }
  }
});

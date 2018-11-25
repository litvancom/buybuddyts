import { DirectivesModule } from "./directives";
import gql from "graphql-tag";
import { GraphQLModule } from "@graphql-modules/core";
import bcrypt = require("bcrypt");
import { createSharedList, deleteSharedList, getListsFromSharedList, getSharedList, updateSharedList } from "../db/model/sharedList";
import { ListModule } from "./list-module";

export const SharedListModule = new GraphQLModule({
  imports: [DirectivesModule, ListModule],
  typeDefs: gql`
    type SharedList {
      id: ID!
      list: List!
      receiverId: String
      chmod: String
    }

    input NewSharedList {
      listId: String!
      receiverId: String
      chmod: String
      password: String
    }

    input UpdateSharedList {
      chmod: String!
    }

    type Query {
      sharedList(id: String!, password: String): SharedList
    }

    type Mutation {
      sharedListCreate(input: NewSharedList!): SharedList!
      sharedListUpdate(id: String, input: UpdateSharedList!): SharedList!
      sharedListDelete(id: String!): String
    }
  `,
  resolvers: {
    Query: {
      sharedList: async (_, { id, password }, context) => {
        const sharedList = await getSharedList(id);
        if (sharedList.password && password && bcrypt.compareSync(password, sharedList.password)) {
          return sharedList;
        } else if (sharedList.password && !password) {
          throw new Error("Password should be specified");
        } else if (sharedList.password && password) {
          throw new Error("Wrong password");
        }

        return sharedList;
      }
    },
    SharedList: {
      list: async (_, args, context) => {
        return await getListsFromSharedList(_.id);
      }
    },
    Mutation: {
      sharedListCreate: async (_, { input }, context) => {
        if (input.password) {
          input.password = await bcrypt.hash(input.password, 10);
        }
        return await createSharedList(input);
      },
      sharedListUpdate: async (_, { id, input }, context) => {
        return await updateSharedList(id, input);
      },
      sharedListDelete: async (_, { id }, context) => {
        return deleteSharedList(id);
      }
    }
  }
});

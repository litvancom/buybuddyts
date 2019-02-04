import { DirectivesModule } from "./directives";
import gql from "graphql-tag";
import { GraphQLModule, ModuleContext } from "@graphql-modules/core";
import bcrypt = require("bcrypt");
import { ListModule } from "./list-module";
import { UserModule } from "./user-module";
import { logger } from "../utils/logger";
import { RepositoryProvider } from "../provider/repositoryProvider";
import { SharedListRepository } from "../repository/sharedListRepository";

export const SharedListModule = new GraphQLModule({
  imports: [DirectivesModule, ListModule, UserModule],
  typeDefs: gql`
    type SharedList {
      id: ID!
      list: List!
      receivers: [User]
      chmod: String
    }

    input InputSharedList {
      listId: String!
      receiversId: [String]
      chmod: String
      password: String
    }

    type Query {
      sharedList(id: String!, password: String): SharedList
    }

    type Mutation {
      sharedListCreate(input: InputSharedList!): SharedList!
      sharedListUpdate(id: String, input: InputSharedList!): SharedList!
      sharedListDelete(id: String!): String
    }
  `,
  resolvers: {
    Query: {
      sharedList: async (_, { id, password }, { injector }: ModuleContext) => {
        const sharedList = await injector
          .get(RepositoryProvider)
          .getRepository(SharedListRepository)
          .findOne(id, { loadEagerRelations: true });
        if (sharedList.password && password && (await bcrypt.compare(password, sharedList.password))) {
          return sharedList;
        } else if (sharedList.password && !password) {
          throw new Error("Password should be specified");
        } else if (sharedList.password && password) {
          throw new Error("Wrong password");
        }

        return sharedList;
      }
    }, // SharedList: {
    //   list: async (root: SharedList, args, { injector }: ModuleContext) => {
    //     return injector
    //       .get(RepositoryProvider)
    //       .getRepository(ListRepository)
    //       .findOne({ id: root.list });
    //   },
    //   receivers: async (root, args, { injector }: ModuleContext) => {
    //     logger.info(root);
    //     return SharedListModel.getSharedListUsers(root.id);
    //   }
    // },
    Mutation: {
      sharedListCreate: async (_, { input }, { injector }: ModuleContext) => {
        if (input.password) {
          input.password = await bcrypt.hash(input.password, 10);
        }
        return await injector
          .get(RepositoryProvider)
          .getRepository(SharedListRepository)
          .create(input);
      },
      sharedListUpdate: async (_, { id, input }, { injector }: ModuleContext) => {
        return await injector
          .get(RepositoryProvider)
          .getRepository(SharedListRepository)
          .update({ id }, input);
      },
      sharedListDelete: async (_, { id }, { injector }: ModuleContext) => {
        await injector
          .get(RepositoryProvider)
          .getRepository(SharedListRepository)
          .delete(id);
      }
    }
  }
});

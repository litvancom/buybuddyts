"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const directives_1 = require("./directives");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const core_1 = require("@graphql-modules/core");
const listItem_1 = require("../db/model/listItem");
exports.ListItemModule = new core_1.GraphQLModule({
    imports: [directives_1.DirectivesModule],
    typeDefs: graphql_tag_1.default `
    type ListItem {
      id: ID!
      name: String
      valueName: String
      value: String
      category: String
      order: Int
    }
    input NewListItem {
      name: String!
      valueName: String!
      value: String!
      listId: String!
      category: String
      order: Int
    }
    input UpdateListItem {
      name: String
      valueName: String
      value: String
      listId: String
      category: String
      order: Int
    }
    extend type Mutation {
      listItemCreate(input: NewListItem!): ListItem! @isAuthenticated
      listItemUpdate(id: String!, input: UpdateListItem!): ListItem! @isAuthenticated
      listItemDelete(id: String!): [String] @isAuthenticated
    }
  `,
    resolvers: {
        Query: {
            listItem: (_, { id }, context) => __awaiter(this, void 0, void 0, function* () {
                throw new Error("Not Implemented"); // todo implement
            })
        },
        Mutation: {
            listItemCreate: (_, { input }, context) => __awaiter(this, void 0, void 0, function* () {
                return listItem_1.createListItem(input);
            }),
            listItemUpdate: (_, { id, input }, context) => __awaiter(this, void 0, void 0, function* () {
                return listItem_1.updateListItem(id, input);
            }),
            listItemDelete: (_, { id }, context) => __awaiter(this, void 0, void 0, function* () {
                listItem_1.deleteListItem(id);
            })
        }
    }
});

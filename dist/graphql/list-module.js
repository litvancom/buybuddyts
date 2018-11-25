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
const listItem_module_1 = require("./listItem-module");
const list_1 = require("../db/model/list");
const listItem_1 = require("../db/model/listItem");
exports.ListModule = new core_1.GraphQLModule({
    imports: [directives_1.DirectivesModule, listItem_module_1.ListItemModule],
    typeDefs: graphql_tag_1.default `
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
            items: ({ id }, args, context) => __awaiter(this, void 0, void 0, function* () {
                return listItem_1.getListItem(id);
            })
        },
        Query: {
            list: (_, { id }, context) => __awaiter(this, void 0, void 0, function* () {
                throw new Error("Not Implemented"); // todo implement
            })
        },
        Mutation: {
            listCreate: (_, { input, id }, context) => __awaiter(this, void 0, void 0, function* () {
                return list_1.createList(input, id);
            }),
            listUpdate: (_, { input, id }, context) => __awaiter(this, void 0, void 0, function* () {
                return list_1.updateList(id, input);
            }),
            listDelete: (_, { id }, context) => __awaiter(this, void 0, void 0, function* () {
                return list_1.deleteList(id);
            })
        }
    }
});

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
const bcrypt = require("bcrypt");
const sharedList_1 = require("../db/model/sharedList");
const list_module_1 = require("./list-module");
exports.SharedListModule = new core_1.GraphQLModule({
    imports: [directives_1.DirectivesModule, list_module_1.ListModule],
    typeDefs: graphql_tag_1.default `
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
            sharedList: (_, { id, password }, context) => __awaiter(this, void 0, void 0, function* () {
                const sharedList = yield sharedList_1.getSharedList(id);
                if (sharedList.password && password && bcrypt.compareSync(password, sharedList.password)) {
                    return sharedList;
                }
                else if (sharedList.password && !password) {
                    throw new Error("Password should be specified");
                }
                else if (sharedList.password && password) {
                    throw new Error("Wrong password");
                }
                return sharedList;
            })
        },
        SharedList: {
            list: (_, args, context) => __awaiter(this, void 0, void 0, function* () {
                return yield sharedList_1.getListsFromSharedList(_.id);
            })
        },
        Mutation: {
            sharedListCreate: (_, { input }, context) => __awaiter(this, void 0, void 0, function* () {
                if (input.password) {
                    input.password = yield bcrypt.hash(input.password, 10);
                }
                return yield sharedList_1.createSharedList(input);
            }),
            sharedListUpdate: (_, { id, input }, context) => __awaiter(this, void 0, void 0, function* () {
                return yield sharedList_1.updateSharedList(id, input);
            }),
            sharedListDelete: (_, { id }, context) => __awaiter(this, void 0, void 0, function* () {
                return sharedList_1.deleteSharedList(id);
            })
        }
    }
});

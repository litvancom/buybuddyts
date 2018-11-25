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
const core_1 = require("@graphql-modules/core");
const bcrypt = require("bcrypt");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const list_1 = require("../db/model/list");
const user_1 = require("../db/model/user");
const auth_1 = require("../services/auth");
const directives_1 = require("./directives");
const list_module_1 = require("./list-module");
// @ts-ignore
exports.UserModule = new core_1.GraphQLModule({
    imports: [directives_1.DirectivesModule, list_module_1.ListModule],
    typeDefs: graphql_tag_1.default `
    type User {
      id: ID!
      userName: String!
    }

    input NewUser {
      userName: String!
      password: String!
    }

    type Token {
      bearer: String!
      user: User!
    }

    type AuthorizedUser {
      id: ID!
      userName: String!
      lists: [List]
    }

    type Query {
      me: AuthorizedUser @isAuthenticated
      userLogin(userName: String, password: String): Token!
    }

    type Mutation {
      userRegister(input: NewUser): User!
    }
  `,
    resolvers: {
        AuthorizedUser: {
            lists: (root, args, { currentUser: { id: userId } }) => __awaiter(this, void 0, void 0, function* () {
                return yield list_1.getUserLists(userId);
            })
        },
        Query: {
            me: (root, args, context) => {
                return context.currentUser;
            },
            userLogin: (_, { userName, password }, context) => __awaiter(this, void 0, void 0, function* () {
                const [user = {}] = yield user_1.findLogin({ userName });
                if (yield bcrypt.compare(password, user.password)) {
                    delete user.password;
                    const bearer = yield auth_1.signToken(user);
                    return {
                        bearer,
                        user
                    };
                }
                else {
                    throw new Error("User does not match");
                }
            })
        },
        Mutation: {
            userRegister: (root, { input }, context) => __awaiter(this, void 0, void 0, function* () {
                input.password = yield bcrypt.hash(input.password, 10);
                return yield user_1.createUser(input);
            })
        }
    }
});
//# sourceMappingURL=user-module.js.map
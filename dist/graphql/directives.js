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
const graphql_tag_1 = __importDefault(require("graphql-tag"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_1 = require("graphql");
const logger_1 = require("../utils/logger");
const auth_1 = require("../services/auth");
class IsAuthenticated extends apollo_server_express_1.SchemaDirectiveVisitor {
    // public visitObject(object: GraphQLObjectType): GraphQLObjectType | void | null {
    //   return super.visitObject(object);
    // }
    visitFieldDefinition(field) {
        const { resolve = graphql_1.defaultFieldResolver } = field;
        field.resolve = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                const [, , context] = args;
                if (!context.currentUser) {
                    throw new Error(`Unauthenticated!`);
                }
                return yield resolve.apply(this, args);
            });
        };
    }
}
exports.IsAuthenticated = IsAuthenticated;
exports.DirectivesModule = new core_1.GraphQLModule({
    typeDefs: graphql_tag_1.default `
    directive @isAuthenticated on FIELD | FIELD_DEFINITION
  `,
    schemaDirectives: {
        isAuthenticated: IsAuthenticated
    },
    contextBuilder: ({ req }, currentContext) => __awaiter(this, void 0, void 0, function* () {
        const { headers: { authorization } } = req;
        return {
            currentUser: yield auth_1.checkAuth(authorization).catch(logger_1.logCath)
        };
    })
});
// const context = async ({
//   req: {
//     headers: { authorization }
//   }
// }: {
//   authorization: any;
//   req: any;
// }) => {
//   return {
//     currentUser: await checkAuth(authorization).catch(logCath)
//   };
// };
//# sourceMappingURL=directives.js.map
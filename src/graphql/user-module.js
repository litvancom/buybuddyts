"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var core_1 = require("@graphql-modules/core");
var bcrypt = require("bcrypt");
var graphql_tag_1 = require("graphql-tag");
var list_1 = require("../db/model/list");
var user_1 = require("../db/model/user");
var auth_1 = require("../services/auth");
var directives_1 = require("./directives");
var list_module_1 = require("./list-module");
// @ts-ignore
exports.UserModule = new core_1.GraphQLModule({
    imports: [directives_1.DirectivesModule, list_module_1.ListModule],
    typeDefs: graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type User {\n      id: ID!\n      userName: String!\n    }\n\n    input NewUser {\n      userName: String!\n      password: String!\n    }\n\n    type Token {\n      bearer: String!\n      user: User!\n    }\n\n    type AuthorizedUser {\n      id: ID!\n      userName: String!\n      lists: [List]\n    }\n\n    type Query {\n      me: AuthorizedUser @isAuthenticated\n      userLogin(userName: String, password: String): Token!\n    }\n\n    type Mutation {\n      userRegister(input: NewUser): User!\n    }\n  "], ["\n    type User {\n      id: ID!\n      userName: String!\n    }\n\n    input NewUser {\n      userName: String!\n      password: String!\n    }\n\n    type Token {\n      bearer: String!\n      user: User!\n    }\n\n    type AuthorizedUser {\n      id: ID!\n      userName: String!\n      lists: [List]\n    }\n\n    type Query {\n      me: AuthorizedUser @isAuthenticated\n      userLogin(userName: String, password: String): Token!\n    }\n\n    type Mutation {\n      userRegister(input: NewUser): User!\n    }\n  "]))),
    resolvers: {
        AuthorizedUser: {
            lists: function (root, args, _a) {
                var userId = _a.currentUser.id;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, list_1.getUserLists(userId)];
                            case 1: return [2 /*return*/, _b.sent()];
                        }
                    });
                });
            }
        },
        Query: {
            me: function (root, args, context) {
                return context.currentUser;
            },
            userLogin: function (_, _a, context) {
                var userName = _a.userName, password = _a.password;
                return __awaiter(_this, void 0, void 0, function () {
                    var _b, user, bearer;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, user_1.findLogin({ userName: userName })];
                            case 1:
                                _b = (_c.sent())[0], user = _b === void 0 ? {} : _b;
                                return [4 /*yield*/, bcrypt.compare(password, user.password)];
                            case 2:
                                if (!_c.sent()) return [3 /*break*/, 4];
                                delete user.password;
                                return [4 /*yield*/, auth_1.signToken(user)];
                            case 3:
                                bearer = _c.sent();
                                return [2 /*return*/, {
                                        bearer: bearer,
                                        user: user
                                    }];
                            case 4: throw new Error("User does not match");
                        }
                    });
                });
            }
        },
        Mutation: {
            userRegister: function (root, _a, context) {
                var input = _a.input;
                return __awaiter(_this, void 0, void 0, function () {
                    var _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = input;
                                return [4 /*yield*/, bcrypt.hash(input.password, 10)];
                            case 1:
                                _b.password = _c.sent();
                                return [4 /*yield*/, user_1.createUser(input)];
                            case 2: return [2 /*return*/, _c.sent()];
                        }
                    });
                });
            }
        }
    }
});
var templateObject_1;

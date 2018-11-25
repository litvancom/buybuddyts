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
var directives_1 = require("./directives");
var graphql_tag_1 = require("graphql-tag");
var core_1 = require("@graphql-modules/core");
var bcrypt = require("bcrypt");
var sharedList_1 = require("../db/model/sharedList");
var list_module_1 = require("./list-module");
exports.SharedListModule = new core_1.GraphQLModule({
    imports: [directives_1.DirectivesModule, list_module_1.ListModule],
    typeDefs: graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type SharedList {\n      id: ID!\n      list: List!\n      receiverId: String\n      chmod: String\n    }\n\n    input NewSharedList {\n      listId: String!\n      receiverId: String\n      chmod: String\n      password: String\n    }\n\n    input UpdateSharedList {\n      chmod: String!\n    }\n\n    type Query {\n      sharedList(id: String!, password: String): SharedList\n    }\n\n    type Mutation {\n      sharedListCreate(input: NewSharedList!): SharedList!\n      sharedListUpdate(id: String, input: UpdateSharedList!): SharedList!\n      sharedListDelete(id: String!): String\n    }\n  "], ["\n    type SharedList {\n      id: ID!\n      list: List!\n      receiverId: String\n      chmod: String\n    }\n\n    input NewSharedList {\n      listId: String!\n      receiverId: String\n      chmod: String\n      password: String\n    }\n\n    input UpdateSharedList {\n      chmod: String!\n    }\n\n    type Query {\n      sharedList(id: String!, password: String): SharedList\n    }\n\n    type Mutation {\n      sharedListCreate(input: NewSharedList!): SharedList!\n      sharedListUpdate(id: String, input: UpdateSharedList!): SharedList!\n      sharedListDelete(id: String!): String\n    }\n  "]))),
    resolvers: {
        Query: {
            sharedList: function (_, _a, context) {
                var id = _a.id, password = _a.password;
                return __awaiter(_this, void 0, void 0, function () {
                    var sharedList;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, sharedList_1.getSharedList(id)];
                            case 1:
                                sharedList = _b.sent();
                                if (sharedList.password && password && bcrypt.compareSync(password, sharedList.password)) {
                                    return [2 /*return*/, sharedList];
                                }
                                else if (sharedList.password && !password) {
                                    throw new Error("Password should be specified");
                                }
                                else if (sharedList.password && password) {
                                    throw new Error("Wrong password");
                                }
                                return [2 /*return*/, sharedList];
                        }
                    });
                });
            }
        },
        SharedList: {
            list: function (_, args, context) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, sharedList_1.getListsFromSharedList(_.id)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            }); }
        },
        Mutation: {
            sharedListCreate: function (_, _a, context) {
                var input = _a.input;
                return __awaiter(_this, void 0, void 0, function () {
                    var _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!input.password) return [3 /*break*/, 2];
                                _b = input;
                                return [4 /*yield*/, bcrypt.hash(input.password, 10)];
                            case 1:
                                _b.password = _c.sent();
                                _c.label = 2;
                            case 2: return [4 /*yield*/, sharedList_1.createSharedList(input)];
                            case 3: return [2 /*return*/, _c.sent()];
                        }
                    });
                });
            },
            sharedListUpdate: function (_, _a, context) {
                var id = _a.id, input = _a.input;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, sharedList_1.updateSharedList(id, input)];
                            case 1: return [2 /*return*/, _b.sent()];
                        }
                    });
                });
            },
            sharedListDelete: function (_, _a, context) {
                var id = _a.id;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        return [2 /*return*/, sharedList_1.deleteSharedList(id)];
                    });
                });
            }
        }
    }
});
var templateObject_1;

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
var listItem_1 = require("../db/model/listItem");
exports.ListItemModule = new core_1.GraphQLModule({
    imports: [directives_1.DirectivesModule],
    typeDefs: graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type ListItem {\n      id: ID!\n      name: String\n      valueName: String\n      value: String\n      category: String\n      order: Int\n    }\n    input NewListItem {\n      name: String!\n      valueName: String!\n      value: String!\n      listId: String!\n      category: String\n      order: Int\n    }\n    input UpdateListItem {\n      name: String\n      valueName: String\n      value: String\n      listId: String\n      category: String\n      order: Int\n    }\n    extend type Mutation {\n      listItemCreate(input: NewListItem!): ListItem! @isAuthenticated\n      listItemUpdate(id: String!, input: UpdateListItem!): ListItem! @isAuthenticated\n      listItemDelete(id: String!): [String] @isAuthenticated\n    }\n  "], ["\n    type ListItem {\n      id: ID!\n      name: String\n      valueName: String\n      value: String\n      category: String\n      order: Int\n    }\n    input NewListItem {\n      name: String!\n      valueName: String!\n      value: String!\n      listId: String!\n      category: String\n      order: Int\n    }\n    input UpdateListItem {\n      name: String\n      valueName: String\n      value: String\n      listId: String\n      category: String\n      order: Int\n    }\n    extend type Mutation {\n      listItemCreate(input: NewListItem!): ListItem! @isAuthenticated\n      listItemUpdate(id: String!, input: UpdateListItem!): ListItem! @isAuthenticated\n      listItemDelete(id: String!): [String] @isAuthenticated\n    }\n  "]))),
    resolvers: {
        Query: {
            listItem: function (_, _a, context) {
                var id = _a.id;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        throw new Error("Not Implemented"); // todo implement
                    });
                });
            }
        },
        Mutation: {
            listItemCreate: function (_, _a, context) {
                var input = _a.input;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        return [2 /*return*/, listItem_1.createListItem(input)];
                    });
                });
            },
            listItemUpdate: function (_, _a, context) {
                var id = _a.id, input = _a.input;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        return [2 /*return*/, listItem_1.updateListItem(id, input)];
                    });
                });
            },
            listItemDelete: function (_, _a, context) {
                var id = _a.id;
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        listItem_1.deleteListItem(id);
                        return [2 /*return*/];
                    });
                });
            }
        }
    }
});
var templateObject_1;

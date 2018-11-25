"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
const tableName = "listItems";
exports.createListItem = (data) => {
    return connection_1.default(tableName)
        .insert(data)
        .returning("*")
        .spread((item) => item);
};
exports.updateListItem = (id, data) => {
    return connection_1.default(tableName)
        .update(data)
        .where({ id })
        .returning("*")
        .spread((item) => item);
};
exports.deleteListItem = (id) => {
    return connection_1.default(tableName)
        .delete()
        .where({ id })
        .returning("id")
        .spread((item) => item);
};
exports.getListItem = (listId) => {
    return connection_1.default(tableName)
        .select()
        .where({ listId })
        .first();
};

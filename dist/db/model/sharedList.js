"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
const tableName = "sharedLists";
exports.createSharedList = (data) => {
    return connection_1.default(tableName)
        .insert(data)
        .returning("*")
        .spread((item) => item);
};
exports.updateSharedList = (id, data) => {
    return connection_1.default(tableName)
        .update(data)
        .where({ id })
        .returning("*")
        .spread((item) => item);
};
exports.deleteSharedList = (id) => {
    return connection_1.default(tableName)
        .delete()
        .where({ id })
        .returning("id")
        .spread((item) => item);
};
exports.getSharedList = (id) => {
    return connection_1.default(tableName)
        .select()
        .where({ id })
        .first();
};
exports.getListsFromSharedList = (id) => {
    return connection_1.default(tableName)
        .select("lists.*")
        .leftJoin("lists", "lists.id", `${tableName}.listId`)
        .where({ [`${tableName}.id`]: id })
        .first();
};
//# sourceMappingURL=sharedList.js.map
"use strict";
exports.__esModule = true;
var connection_1 = require("../connection");
var tableName = "sharedLists";
exports.createSharedList = function (data) {
    return connection_1["default"](tableName)
        .insert(data)
        .returning("*")
        .spread(function (item) { return item; });
};
exports.updateSharedList = function (id, data) {
    return connection_1["default"](tableName)
        .update(data)
        .where({ id: id })
        .returning("*")
        .spread(function (item) { return item; });
};
exports.deleteSharedList = function (id) {
    return connection_1["default"](tableName)["delete"]()
        .where({ id: id })
        .returning("id")
        .spread(function (item) { return item; });
};
exports.getSharedList = function (id) {
    return connection_1["default"](tableName)
        .select()
        .where({ id: id })
        .first();
};
exports.getListsFromSharedList = function (id) {
    var _a;
    return connection_1["default"](tableName)
        .select("lists.*")
        .leftJoin("lists", "lists.id", tableName + ".listId")
        .where((_a = {}, _a[tableName + ".id"] = id, _a))
        .first();
};

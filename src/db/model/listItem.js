"use strict";
exports.__esModule = true;
var connection_1 = require("../connection");
var tableName = "listItems";
exports.createListItem = function (data) {
    return connection_1["default"](tableName)
        .insert(data)
        .returning("*")
        .spread(function (item) { return item; });
};
exports.updateListItem = function (id, data) {
    return connection_1["default"](tableName)
        .update(data)
        .where({ id: id })
        .returning("*")
        .spread(function (item) { return item; });
};
exports.deleteListItem = function (id) {
    return connection_1["default"](tableName)["delete"]()
        .where({ id: id })
        .returning("id")
        .spread(function (item) { return item; });
};
exports.getListItem = function (listId) {
    return connection_1["default"](tableName)
        .select()
        .where({ listId: listId })
        .first();
};

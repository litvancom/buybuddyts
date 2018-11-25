"use strict";
exports.__esModule = true;
var connection_1 = require("../connection");
var tableName = "users";
exports.createUser = function (data) {
    return connection_1["default"]
        .insert(data)
        .returning(["id", "userName"])
        .table(tableName);
};
exports.findLogin = function (data) {
    return connection_1["default"](tableName)
        .select()
        .where(data);
};
exports.findUserById = function (id) {
    return connection_1["default"](tableName)
        .select()
        .where({ id: id });
};

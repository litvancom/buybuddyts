"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var connection_1 = require("../connection");
var tableName = "lists";
exports.createList = function (data, userId) {
    return connection_1["default"](tableName)
        .insert(__assign({}, data, { userId: userId }))
        .returning("*").spread(function (item) { return item; });
};
exports.updateList = function (id, data) {
    return connection_1["default"](tableName)
        .update(data)
        .where({ id: id })
        .returning("*").spread(function (item) { return item; });
};
exports.deleteList = function (id) {
    return connection_1["default"](tableName)["delete"]()
        .where({ id: id })
        .returning("id").spread(function (item) { return item; });
};
exports.getUserLists = function (userId, filter) {
    return connection_1["default"](tableName)
        .select()
        .where({
        userId: userId
    });
    // .andWhere((builder)=>{
    //
    //   for(keys of Object.keys(filter)){
    //     console.log(filter)
    //   }
    // });
};

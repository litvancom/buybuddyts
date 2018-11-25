"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
const tableName = "lists";
exports.createList = (data, userId) => {
    return connection_1.default(tableName)
        .insert(Object.assign({}, data, { userId }))
        .returning("*").spread((item) => item);
};
exports.updateList = (id, data) => {
    return connection_1.default(tableName)
        .update(data)
        .where({ id })
        .returning("*").spread((item) => item);
};
exports.deleteList = (id) => {
    return connection_1.default(tableName)
        .delete()
        .where({ id })
        .returning("id").spread((item) => item);
};
exports.getUserLists = (userId, filter) => {
    return connection_1.default(tableName)
        .select()
        .where({
        userId,
    });
    // .andWhere((builder)=>{
    //
    //   for(keys of Object.keys(filter)){
    //     console.log(filter)
    //   }
    // });
};

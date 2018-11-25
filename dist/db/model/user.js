"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../connection"));
const tableName = "users";
exports.createUser = (data) => {
    return connection_1.default
        .insert(data)
        .returning(["id", "userName"])
        .table(tableName);
};
exports.findLogin = (data) => {
    return connection_1.default(tableName)
        .select()
        .where(data);
};
exports.findUserById = (id) => {
    return connection_1.default(tableName)
        .select()
        .where({ id });
};

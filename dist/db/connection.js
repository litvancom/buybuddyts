"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex = require("knex");
const config_1 = __importDefault(require("../config"));
exports.default = knex(config_1.default.dbConnection);

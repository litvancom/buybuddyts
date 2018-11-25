"use strict";
exports.__esModule = true;
var knex_1 = require("knex");
var config_1 = require("../config");
exports["default"] = knex_1["default"](config_1.dbConnection);

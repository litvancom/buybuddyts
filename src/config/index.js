"use strict";
exports.__esModule = true;
exports.port = process.env.PORT || 4000;
exports.dbConnection = {
    client: "pg",
    connection: process.env.DATABASE_URL || "postgres://postgres:Instance%401@localhost:5434/buybuddy"
};

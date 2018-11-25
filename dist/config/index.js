"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: process.env.PORT || 4000,
    dbConnection: {
        client: "pg",
        connection: process.env.DATABASE_URL || "postgres://postgres:Instance%401@localhost:5434/buybuddy"
    }
};

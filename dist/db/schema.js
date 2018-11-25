"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
(() => __awaiter(this, void 0, void 0, function* () {
    const knex = yield require("./connection");
    yield knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    const usersExists = yield knex.schema.hasTable("users");
    if (usersExists === false) {
        yield knex.schema
            .createTable("users", (table) => {
            table
                .uuid("id")
                .primary("user_id")
                .defaultTo(knex.raw("uuid_generate_v4()"));
            table.string("userName").unique();
            table.string("email").unique();
            table.string("password");
        })
            .catch(logger_1.logCath);
    }
    const listsExists = yield knex.schema.hasTable("lists");
    if (listsExists === false) {
        yield knex.schema
            .createTable("lists", (table) => {
            table
                .uuid("id")
                .primary()
                .defaultTo(knex.raw("uuid_generate_v4()"));
            table.string("title");
            table.uuid("userId").notNull();
            table
                .foreign("userId")
                .references("id")
                .inTable("users")
                .onDelete("CASCADE");
        })
            .catch(logger_1.logCath);
    }
    const listItemsTable = "listItems";
    const listItemsExists = yield knex.schema.hasTable(listItemsTable);
    if (listItemsExists === false) {
        yield knex.schema
            .createTable(listItemsTable, (table) => {
            table
                .uuid("id")
                .primary()
                .defaultTo(knex.raw("uuid_generate_v4()"));
            table.string("name");
            table.string("valueName");
            table.double("value");
            table.string("category");
            table.integer("order");
            table.uuid("listId").notNull();
            table
                .foreign("listId")
                .references("id")
                .inTable("lists")
                .onDelete("CASCADE");
        })
            .catch(logger_1.logCath);
    }
    const sharedListsTable = "sharedLists";
    const sharedListsExists = yield knex.schema.hasTable(sharedListsTable);
    if (sharedListsExists === false) {
        yield knex.schema
            .createTable(sharedListsTable, (table) => {
            table
                .uuid("id")
                .primary()
                .defaultTo(knex.raw("uuid_generate_v4()"));
            table.uuid("listId").notNull();
            table.uuid("receiverId");
            table.string("password");
            table
                .enum("chmod", ["r", "rw"])
                .notNull()
                .defaultTo("r");
            table
                .foreign("receiverId")
                .references("id")
                .inTable("users");
            table
                .foreign("listId")
                .references("id")
                .inTable("lists")
                .onDelete("CASCADE");
        })
            .catch(logger_1.logCath);
        yield knex.schema.raw(`
      ALTER TABLE "${sharedListsTable}"
        ADD CONSTRAINT CK_one_is_null
      CHECK (
        "${sharedListsTable}"."receiverId" IS NOT NULL OR "${sharedListsTable}"."password" IS NOT NULL
      );`);
    }
    process.exit();
}))();

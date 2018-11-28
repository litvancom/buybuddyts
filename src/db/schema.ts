import { logCath } from "../utils/logger";

import connection from "./connection";
import { TableBuilder } from "knex";

(async () => {
  const knex = await connection;

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  const usersExists = await knex.schema.hasTable("users");

  if (usersExists === false) {
    await knex.schema
      .createTable("users", (table: TableBuilder) => {
        table
          .uuid("id")
          .primary("user_id")
          .defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("userName").unique();
        table.string("email").unique();
        table.string("password");
      })
      .catch(logCath);
  }

  const listsExists = await knex.schema.hasTable("lists");

  if (listsExists === false) {
    await knex.schema
      .createTable("lists", (table: TableBuilder) => {
        table
          .uuid("id")
          .primary()
          .defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("title");
        table.uuid("userId").notNullable();
        table
          .foreign("userId")
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
      })
      .catch(logCath);
  }

  const listItemsTable = "listItems";
  const listItemsExists = await knex.schema.hasTable(listItemsTable);

  if (listItemsExists === false) {
    await knex.schema
      .createTable(listItemsTable, (table: TableBuilder) => {
        table
          .uuid("id")
          .primary()
          .defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("name");
        table.string("valueName");
        // @ts-ignore
        table.double("value");
        table.string("category");
        table.boolean("checked").defaultTo(false);
        table.integer("order");
        table.uuid("listId").notNullable();
        table
          .foreign("listId")
          .references("id")
          .inTable("lists")
          .onDelete("CASCADE");
      })
      .catch(logCath);
  }

  const sharedListsTable = "sharedLists";
  const sharedListsExists = await knex.schema.hasTable(sharedListsTable);

  if (sharedListsExists === false) {
    await knex.schema
      .createTable(sharedListsTable, (table: TableBuilder) => {
        table
          .uuid("id")
          .primary()
          .defaultTo(knex.raw("uuid_generate_v4()"));
        table.uuid("listId").notNullable();
        table.uuid("receiverId");
        table.string("password");
        table
          .enum("chmod", ["r", "rw"])
          .notNullable()
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
      .catch(logCath);

    // await knex.schema.raw(`
    //   ALTER TABLE "${sharedListsTable}"
    //     ADD CONSTRAINT CK_one_is_null
    //   CHECK (
    //     "${sharedListsTable}"."receiverId" IS NOT NULL OR "${sharedListsTable}"."password" IS NOT NULL
    //   );`);
  }

  const sharedListsUsersTable = "sharedListsUsers";
  const sharedListsUsersExists = await knex.schema.hasTable(sharedListsUsersTable);

  if (sharedListsUsersExists === false) {
    await knex.schema
      .createTable(sharedListsUsersTable, (table: TableBuilder) => {
        table.uuid("userId");
        table.uuid("sharedListId");
        table.unique(["userId", "sharedListId"]);
      })
      .catch(logCath);
  }

  process.exit();
})();

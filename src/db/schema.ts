import { logCath } from "../utils/logger";

(async () => {
  const knex = await require("./connection");

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  const usersExists = await knex.schema.hasTable("users");

  if (usersExists === false) {
    await knex.schema
      .createTable("users", (table: any) => {
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
      .createTable("lists", (table: any) => {
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
      .catch(logCath);
  }

  const listItemsTable = "listItems";
  const listItemsExists = await knex.schema.hasTable(listItemsTable);

  if (listItemsExists === false) {
    await knex.schema
      .createTable(listItemsTable, (table: any) => {
        table
          .uuid("id")
          .primary()
          .defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("name");
        table.string("valueName");
        table.double("value");
        table.string("category");
        table.boolean("checked").defaultTo(false);
        table.integer("order");
        table.uuid("listId").notNull();
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
      .createTable(sharedListsTable, (table: any) => {
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
      .catch(logCath);

    await knex.schema.raw(`
      ALTER TABLE "${sharedListsTable}"
        ADD CONSTRAINT CK_one_is_null
      CHECK (
        "${sharedListsTable}"."receiverId" IS NOT NULL OR "${sharedListsTable}"."password" IS NOT NULL
      );`);
  }

  process.exit();
})();

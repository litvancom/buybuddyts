import { logCath } from "../utils/logger";

import connection from "./connection";
import { TableBuilder } from "knex";
import UserModel from "./model/user";

(async () => {
  const knex = await connection;

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  const usersTable = "users";
  const usersExists = await knex.schema.hasTable(usersTable);

  if (usersExists === false) {
    await knex.schema
      .createTable(usersTable, (table: TableBuilder) => {
        table
          .uuid("id")
          .primary("user_id")
          .defaultTo(knex.raw("uuid_generate_v4()"));
        table
          .string("userName")
          .unique()
          .notNullable();
        table
          .string("email")
          .unique()
          .notNullable();
        table.boolean("emailIsConfirmed").defaultTo(false);
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

  const friendListTable = "friendList";
  const friendListExists = await knex.schema.hasTable(friendListTable);

  if (friendListExists === false) {
    await knex.schema
      .createTable(friendListTable, (table: any) => {
        table.uuid("userId");
        table.uuid("friendId");
        table.unique(["userId", "friendId"]);
        table
          .foreign("friendId")
          .references("id")
          .inTable(UserModel.tableName)
          .onDelete("CASCADE");
      })
      .catch(logCath);
  }

  const socialIdTable = "socialId";
  const socialIdExists = await knex.schema.hasTable(socialIdTable);

  if (socialIdExists === false) {
    await knex.schema
      .createTable(socialIdTable, (table: any) => {
        table
          .uuid("id")
          .primary()
          .defaultTo(knex.raw("uuid_generate_v4()"));
        table.string("socialId").notNullable();
        table.uuid("userId").notNullable();
        table.enum("type", ["fb"]);
        table.unique(["socialId", "userId", "type"]);
        table
          .foreign("userId")
          .references("id")
          .inTable(UserModel.tableName)
          .onDelete("CASCADE");
      })
      .catch(logCath);
  }

  process.exit();
})();

import * as Knex from "knex";

exports.seed = async (knex: Knex): Promise<any> => {
  // Deletes ALL existing entries
  const usersTable = knex("users");
  await usersTable.del();

  const userId = "3f39701a-389c-45c7-b607-92e039219f59";
  const secondUserId = "cd22152b-e50a-4c1e-b562-4227ea0e365a";
  await usersTable.insert([
    {
      id: userId,
      userName: "test",
      email: "test@shitmail.me",
      password: "$2a$10$LYQzYJQrvMDmF5sjPoIkk..Y3bOHhizVhEcY6vSVbDYAy6Ei5wFW2"
    },
    {
      id: secondUserId,
      userName: "test1",
      email: "test1@shitmail.me",
      password: "$2a$10$LYQzYJQrvMDmF5sjPoIkk..Y3bOHhizVhEcY6vSVbDYAy6Ei5wFW2"
    }
  ]);

  const listsTable = knex("lists");
  await listsTable.del();

  const listId = "befe8ff3-974a-41f8-9972-cb04ea4bf99f";
  await listsTable.insert([
    {
      id: listId,
      title: "testList",
      userId
    }
  ]);

  const listItemTable = knex("listItems");
  await listItemTable.del().insert([
    {
      name: "testItem",
      valueName: "testValueName",
      value: 0.01,
      category: "testCategory",
      order: 0,
      listId
    },
    {
      name: "testItem",
      valueName: "testValueName",
      value: 0.01,
      category: "testCategory",
      order: 0,
      listId
    },
    {
      name: "testItem",
      valueName: "testValueName",
      value: 0.01,
      category: "testCategory",
      order: 0,
      listId
    }
  ]);

  const sharedListsTable = knex("sharedLists");
  await sharedListsTable.del().insert([
    {
      id: "246b4cf3-ea72-42a0-9c38-6a088d6f2673",
      listId,
      receiverId: secondUserId
    },
    {
      id: "04977664-e765-45f0-977f-1d767690e13b",
      listId,
      receiverId: secondUserId,
      password: "$2a$10$LYQzYJQrvMDmF5sjPoIkk..Y3bOHhizVhEcY6vSVbDYAy6Ei5wFW2"
    },
    {
      id: "779e8e7c-22d7-40d1-bc7e-5ce302707229",
      listId,
      password: "$2a$10$LYQzYJQrvMDmF5sjPoIkk..Y3bOHhizVhEcY6vSVbDYAy6Ei5wFW2"
    }
  ]);

  return true;
};

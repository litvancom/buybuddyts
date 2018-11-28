import knex from "../connection";
import { logger } from "../../utils/logger";

const tableName = "sharedLists";
const sharedListsUsers = "sharedListsUsers";

export const createSharedList = async (data: any) => {
  const { receiversId, listId } = data;
  delete data.receiversId;

  const sharedList = await knex(tableName)
    .insert(data)
    .returning("*")
    .spread((item: any) => item);

  if (receiversId) {
    const relData = receiversId.map((item: any) => {
      return { sharedListId: sharedList.id, userId: item };
    });

    await knex(sharedListsUsers).insert(relData);
  }

  return Promise.resolve(sharedList);
};

export const getSharedListUsers = (sharedListId: string) => {
  return knex(sharedListsUsers)
    .where({ sharedListId })
    .leftJoin("users", "users.id", "userId")
    .select("users.*");
};

export const updateSharedList = (id: any, data: any) => {
  return knex(tableName)
    .update(data)
    .where({ id })
    .returning("*")
    .spread(item => item);
};

export const deleteSharedList = (id: any) => {
  return knex(tableName)
    .delete()
    .where({ id })
    .returning("id")
    .spread((item: any) => item);
};

export const getSharedList = (id: any) => {
  return knex(tableName)
    .select()
    .where({ id })
    .first();
};

export const getListsFromSharedList = (id: any) => {
  return knex(tableName)
    .select("lists.*")
    .leftJoin("lists", "lists.id", `${tableName}.listId`)
    .where({ [`${tableName}.id`]: id })
    .first();
};

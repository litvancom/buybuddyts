import knex from "../connection";

const tableName = "sharedLists";

export const createSharedList = (data: any) => {
  return knex(tableName)
    .insert(data)
    .returning("*")
    .spread((item: any ) => item);
};

export const updateSharedList = (id: any, data: any) => {
  return knex(tableName)
    .update(data)
    .where({ id })
    .returning("*")
    .spread((item) => item);
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

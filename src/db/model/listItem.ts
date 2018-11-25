import knex from "../connection";

const tableName = "listItems";

export const createListItem = (data: any) => {
  return knex(tableName)
    .insert(data)
    .returning("*")
    .spread((item?: any) => item);
};

export const updateListItem = (id: string, data: any) => {
  return knex(tableName)
    .update(data)
    .where({ id })
    .returning("*")
    .spread((item?: any) => item);
};

export const deleteListItem = (id: string) => {
  return knex(tableName)
    .delete()
    .where({ id })
    .returning("id")
    .spread((item?: any) => item);
};

export const getListItem = (listId: string) => {
  return knex(tableName)
    .select()
    .where({ listId })
    .first();
};

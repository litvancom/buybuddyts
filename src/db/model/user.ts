import knex from "../connection";

const tableName = "users";

export const createUser = (data: any) => {
  return knex
    .insert(data)
    .returning(["id", "userName"])
    .table(tableName);
};

export const findLogin = (data: any) => {
  return knex(tableName)
    .select()
    .where(data);
};

export const findUserById = (id: any) => {
  return knex(tableName)
    .select()
    .where({ id });
};

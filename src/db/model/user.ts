import knex from "../connection";

const tableName = "users";

export default class UserModel {
  public static create(data: any) {
    return knex
      .insert(data)
      .returning(["id", "userName"])
      .table(tableName);
  }

  public static findLogin(data: any) {
    return knex(tableName)
      .select()
      .where(data);
  }

  public static findUserById(id: any) {
    return knex(tableName)
      .select()
      .where({ id });
  }
}

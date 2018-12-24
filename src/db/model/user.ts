import knex from "../connection";
import Joi = require("joi");

const schema = Joi.string()
  .min(3)
  .required()
  .error(new Error("Query should be a bit longer, at least 3 characters long please"));

export default class UserModel {
  public static tableName = "users";
  public static friendsListTable = "friendList";

  private static get table() {
    return knex(UserModel.tableName);
  }

  public static create(data: any) {
    return knex
      .insert(data)
      .returning(["id", "userName"])
      .table(UserModel.tableName);
  }

  public static findLogin(data: any) {
    return knex(UserModel.tableName)
      .select()
      .where(data);
  }

  public static findUserById(id: any) {
    return knex(UserModel.tableName)
      .select()
      .where({ id });
  }

  public static async addFriends(userId: string, ids: string[]) {
    const insetData = ids.map((item) => ({ userId, friendId: item }));
    await knex(UserModel.friendsListTable)
      .insert(insetData)
      .returning("*");
    return knex(UserModel.tableName)
      .select()
      .whereIn("id", ids);
  }
  public static async deleteFriends(userId: string, ids: string[]) {
    await knex(UserModel.friendsListTable)
      .delete()
      .where({ userId })
      .whereIn("friendId", ids);
    return true;
  }

  public static getFriends(id: string) {
    return knex(UserModel.friendsListTable)
      .innerJoin(UserModel.tableName, `${UserModel.tableName}.id`, `${UserModel.friendsListTable}.userId`)
      .select(`${UserModel.tableName}.*`)
      .first();
  }

  public static async findNewFriends(userId: string, query: string) {
    await Joi.validate(query, schema);
    return UserModel.table
      .select()
      .where("id", "!=", userId)
      .andWhere((builder) => builder.where("email", "like", `${query}%`).orWhere("userName", "like", `${query}%`));
  }
}

import knex from "../connection";
import Joi = require("joi");

const schema = Joi.string()
  .min(3)
  .required()
  .error(new Error("Query should be a bit longer, at least 3 characters long please"));

export default class UserModel {
  public static tableName = "users";
  public static friendsListTableName = "friendList";
  public static socialIdTableName = "socialId";

  private static get table() {
    return knex(UserModel.tableName);
  }

  private static get socialIdTable() {
    return knex(UserModel.socialIdTableName);
  }

  public static create(data: any): any {
    return knex
      .insert(data)
      .returning(["id", "userName", "email"])
      .table(UserModel.tableName)
      .spread((res) => res);
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
    await knex(UserModel.friendsListTableName)
      .insert(insetData)
      .returning("*");
    return knex(UserModel.tableName)
      .select()
      .whereIn("id", ids);
  }
  public static async deleteFriends(userId: string, ids: string[]) {
    await knex(UserModel.friendsListTableName)
      .delete()
      .where({ userId })
      .whereIn("friendId", ids);
    return true;
  }

  public static getFriends(id: string) {
    return knex(UserModel.friendsListTableName)
      .innerJoin(UserModel.tableName, `${UserModel.tableName}.id`, `${UserModel.friendsListTableName}.userId`)
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

  public static async fbLogin({ id, email }: any) {
    const result = await UserModel.socialIdTable
      .select(`${UserModel.tableName}.*`)
      .innerJoin(UserModel.tableName, `${UserModel.tableName}.id`, `${UserModel.socialIdTableName}.userId`)
      .where("socialId", id)
      .andWhere("type", "fb")
      .limit(1)
      .first();

    if (result) {
      return result;
    }

    const user = await UserModel.create({
      email,
      userName: email
    });

    await UserModel.socialIdTable.insert({ type: "fb", userId: user.id, socialId: id });

    return user;
  }
}

import knex from "../connection";

export default class ListModel {
  public static create(data: any, userId: string) {
    return knex(ListModel.tableName)
      .insert({ ...data, userId })
      .returning("*")
      .spread((item?: any) => item);
  }

  public static update(id: string, data: any) {
    return knex(ListModel.tableName)
      .update(data)
      .where({ id })
      .returning("*")
      .spread((item?: any) => item);
  }

  public static delete(id: string) {
    return knex(ListModel.tableName)
      .delete()
      .where({ id })
      .returning("id")
      .spread((item?: any) => item);
  }

  public static findByUserId(userId: string, filter?: any) {
    return knex(ListModel.tableName)
      .select()
      .where({
        userId
      });
  }
  private static readonly tableName = "lists";
}

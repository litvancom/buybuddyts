import knex from "../connection";

export default class ListItemModel {
  public static create(data: any) {
    return knex(ListItemModel.tableName)
      .insert(data)
      .returning("*")
      .spread((item?: any) => item);
  }

  public static update(id: string, data: any) {
    return knex(ListItemModel.tableName)
      .update(data)
      .where({ id })
      .returning("*")
      .spread((item?: any) => item);
  }

  public static delete(id: string) {
    return knex(ListItemModel.tableName)
      .delete()
      .where({ id })
      .returning("id")
      .spread((item?: any) => item);
  }

  public static findByListId(listId: string) {
    return knex(ListItemModel.tableName)
      .select()
      .where({ listId });
  }
  private static readonly tableName = "listItems";
}

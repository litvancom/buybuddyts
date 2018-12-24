import knex from "../connection";
import { logger } from "../../utils/logger";

const tableName = "sharedLists";
const sharedListsUsers = "sharedListsUsers";

export default class SharedListModel {
  public static getSharedListUsers(sharedListId: string) {
    return knex(sharedListsUsers)
      .where({ sharedListId })
      .leftJoin("users", "users.id", "userId")
      .select("users.*");
  }
  public static async create(data: any) {
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
  }

  public static update(id: any, data: any) {
    return knex(tableName)
      .update(data)
      .where({ id })
      .returning("*")
      .spread((item) => item);
  }

  public static delete(id: any) {
    return knex(tableName)
      .delete()
      .where({ id })
      .returning("id")
      .spread((item: any) => item);
  }

  public static get(id: any) {
    return knex(tableName)
      .select()
      .where({ id })
      .first();
  }

  public static getLists(id: any) {
    return knex(tableName)
      .select("lists.*")
      .leftJoin("lists", "lists.id", `${tableName}.listId`)
      .where({ [`${tableName}.id`]: id })
      .first();
  }
}

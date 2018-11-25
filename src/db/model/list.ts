import knex from "../connection";

const tableName = "lists";

export const createList = (data: any, userId: string) => {
  return knex(tableName)
    .insert({ ...data, userId })
    .returning("*").spread((item?: any) => item);
};

export const updateList = (id: string, data: any) => {
  return knex(tableName)
    .update(data)
    .where({ id })
    .returning("*").spread((item?: any) => item);
};

export const deleteList = (id: string) => {
  return knex(tableName)
    .delete()
    .where({ id })
    .returning("id").spread((item?: any) => item);
};

export const getUserLists = (userId: string, filter?: any) => {
  return knex(tableName)
    .select()
    .where({
      userId,
    });

  // .andWhere((builder)=>{
  //
  //   for(keys of Object.keys(filter)){
  //     console.log(filter)
  //   }
  // });
};

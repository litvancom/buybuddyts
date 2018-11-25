"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = (knex) => __awaiter(this, void 0, void 0, function* () {
    // Deletes ALL existing entries
    const usersTable = knex("users");
    yield usersTable.del();
    const userId = "3f39701a-389c-45c7-b607-92e039219f59";
    const secondUserId = "cd22152b-e50a-4c1e-b562-4227ea0e365a";
    yield usersTable.insert([
        {
            id: userId,
            userName: "test",
            password: "$2a$10$LYQzYJQrvMDmF5sjPoIkk..Y3bOHhizVhEcY6vSVbDYAy6Ei5wFW2",
        },
        {
            id: secondUserId,
            userName: "test1",
            password: "$2a$10$LYQzYJQrvMDmF5sjPoIkk..Y3bOHhizVhEcY6vSVbDYAy6Ei5wFW2",
        },
    ]);
    const listsTable = knex("lists");
    yield listsTable.del();
    const listId = "befe8ff3-974a-41f8-9972-cb04ea4bf99f";
    yield listsTable.insert([
        {
            id: listId,
            title: "testList",
            userId,
        },
    ]);
    const listItemTable = knex("listItems");
    yield listItemTable.del().insert([
        {
            name: "testItem",
            valueName: "testValueName",
            value: 0.01,
            category: "testCategory",
            order: 0,
            listId,
        },
        {
            name: "testItem",
            valueName: "testValueName",
            value: 0.01,
            category: "testCategory",
            order: 0,
            listId,
        },
        {
            name: "testItem",
            valueName: "testValueName",
            value: 0.01,
            category: "testCategory",
            order: 0,
            listId,
        },
    ]);
    const sharedListsTable = knex("sharedLists");
    yield sharedListsTable.del().insert([
        {
            id: "246b4cf3-ea72-42a0-9c38-6a088d6f2673",
            listId,
            receiverId: secondUserId
        },
        {
            id: "04977664-e765-45f0-977f-1d767690e13b",
            listId,
            receiverId: secondUserId,
            password: "$2a$10$LYQzYJQrvMDmF5sjPoIkk..Y3bOHhizVhEcY6vSVbDYAy6Ei5wFW2"
        },
        {
            id: "779e8e7c-22d7-40d1-bc7e-5ce302707229",
            listId,
            password: "$2a$10$LYQzYJQrvMDmF5sjPoIkk..Y3bOHhizVhEcY6vSVbDYAy6Ei5wFW2"
        }
    ]);
    return true;
});

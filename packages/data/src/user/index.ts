import { Client as FaunaDBClient, query as q } from "faunadb";
import { addGamePlayed } from "./addGamePlayed";
import { addWin } from "./addWin";
import { create } from "./create";
import { getById } from "./getById";
import { getByNickname } from "./getByNickname";
import { setNickname } from "./setNickname";

// todo type these properly
export type UserDatabaseFunctions = {
    create: (authId: string) => Promise<object>;

    getById: (id: string) => Promise<object>;
    getByNickname: (nickname: string) => Promise<object>;

    addWin: (id: string) => Promise<object>;
    addGamePlayed: (id: string) => Promise<object>;

    setNickname: (id: string, nickname: string) => Promise<object>;
};

export const userDatabase = (client: FaunaDBClient): UserDatabaseFunctions => {
    return {
        create: create(client),
        getById: getById(client),
        getByNickname: getByNickname(client),
        addWin: addWin(client),
        addGamePlayed: addGamePlayed(client),
        setNickname: setNickname(client)
    };
};

export { setupUserDatabase } from "./_setup";

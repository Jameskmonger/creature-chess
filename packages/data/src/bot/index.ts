import { Client as FaunaDBClient } from "faunadb";
import { getLeastPlayedBots } from "./getLeastPlayedBots";
import { addWin } from "./addWin";
import { addGamePlayed } from "./addGamePlayed";

// todo type these properly
export type BotDatabaseFunctions = {
    getLeastPlayedBots: (count: number) => Promise<{ id: string, name: string }[]>;

    addWin: (id: string) => Promise<object>;
    addGamePlayed: (id: string) => Promise<object>;
};

export const botDatabase = (client: FaunaDBClient): BotDatabaseFunctions => {
    return {
        getLeastPlayedBots: getLeastPlayedBots(client),
        addGamePlayed: addGamePlayed(client),
        addWin: addWin(client)
    };
};

export { setupBotDatabase } from "./_setup";

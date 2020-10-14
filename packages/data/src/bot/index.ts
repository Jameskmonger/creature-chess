import { Client as FaunaDBClient } from "faunadb";
import { getLeastPlayedBots } from "./getLeastPlayedBots";

// todo type these properly
export type BotDatabaseFunctions = {
    getLeastPlayedBots: () => Promise<{ id: string, name: string }[]>;
};

export const userDatabase = (client: FaunaDBClient): BotDatabaseFunctions => {
    return {
        getLeastPlayedBots: getLeastPlayedBots(client)
    };
};

export { setupBotDatabase } from "./_setup";

import { Client as FaunaDBClient, query as q } from "faunadb";
import { setupBotDatabase } from "./bot";
import { setupUserDatabase } from "./user";

export const setup = async (client: FaunaDBClient) => {
    console.log("Setting up database...");

    await setupUserDatabase(client);

    await setupBotDatabase(client);
};

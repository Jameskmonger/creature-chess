import { Client as FaunaDBClient } from "faunadb";
import { setup } from "./setup";
import { userDatabase, UserDatabaseFunctions } from "./user";

export type DatabaseConnection = {
    user: UserDatabaseFunctions;
};

export const createDatabaseConnection = (faunaSecret: string): DatabaseConnection => {
    const client = new FaunaDBClient({ secret: faunaSecret });

    setup(client);

    return {
        user: userDatabase(client)
    };
};

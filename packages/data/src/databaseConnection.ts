import { Client as FaunaDBClient, query as q } from "faunadb";
import { userDatabase, UserDatabaseFunctions } from "./user";

export type DatabaseConnection = {
    user: UserDatabaseFunctions;
};

export const createDatabaseConnection = (faunaSecret: string): DatabaseConnection => {
    const client = new FaunaDBClient({ secret: faunaSecret });

    return {
        user: userDatabase(client)
    };
};

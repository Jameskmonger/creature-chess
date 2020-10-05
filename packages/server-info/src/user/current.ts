import { ManagementClient } from "auth0";
import { Request, Response } from "express";
import { DatabaseConnection } from "@creature-chess/data";
import { authenticate, UserAppMetadata } from "@creature-chess/auth-server";
import { sanitize } from "./utils/sanitize";

export const current = (database: DatabaseConnection, authClient: ManagementClient<UserAppMetadata>) => {
    return async (req: Request, res: Response) => {
        const { authorization } = req.headers;

        if (!authorization) {
            res.send(null);

            return;
        }

        const user = await authenticate(authClient, database, authorization);
        const sanitized = sanitize(user);

        res.send(sanitized);
    };
};

import { ManagementClient } from "auth0";
import { Request, Response } from "express";
import Filter = require("bad-words");
import { DatabaseConnection } from "@creature-chess/data";
import { validateNickname } from "@creature-chess/shared";
import { authenticate, convertDatabaseUserToUserModel, UserAppMetadata } from "@creature-chess/auth-server";
import { sanitize } from "./utils/sanitize";
import { SanitizedUser } from "@creature-chess/models";

export const getCurrent = (database: DatabaseConnection, authClient: ManagementClient<UserAppMetadata>) => {
    return async (req: Request, res: Response<SanitizedUser>) => {
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

type PatchError = { type: "invalid_nickname", error: string };
type PatchResponse = SanitizedUser | PatchError;

export const patchCurrent = (
    database: DatabaseConnection,
    authClient: ManagementClient<UserAppMetadata>,
    filter: Filter
) => {
    return async (req: Request<{}, PatchResponse, { nickname: string }>, res: Response<PatchResponse>) => {
        const { authorization } = req.headers;

        if (!authorization) {
            res.send(null);

            return;
        }

        const user = await authenticate(authClient, database, authorization);

        if (!user) {
            res.sendStatus(401);
            return;
        }

        if (user.registered) {
            console.log(`Registered user ${user.id} tried to patch`);
            res.sendStatus(403);
            return;
        }

        if (!req.body) {
            res.sendStatus(400);
            return;
        }

        const { nickname } = req.body;

        if (!nickname) {
            res.sendStatus(400);
            return;
        }

        const trimmedNickname = nickname.trim();

        const nicknameError = validateNickname(trimmedNickname);

        const failNickname = (error: string) => res.status(400).send({ type: "invalid_nickname", error });

        if (nicknameError) {
            failNickname(nicknameError);
            return;
        }

        if (filter.isProfane(trimmedNickname)) {
            failNickname("Profanity filter");
            return;
        }

        const isUnique = (await database.user.getByNickname(trimmedNickname)) === null;

        if (!isUnique) {
            failNickname("Nickname already in use");
            return;
        }

        const updatedUser = await database.user.setNickname(user.id, trimmedNickname);

        const sanitized = sanitize(convertDatabaseUserToUserModel(updatedUser));

        res.send(sanitized);
    };
};

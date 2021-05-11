// tslint:disable: no-console
import { ManagementClient } from "auth0";
import { Request, Response } from "express";
import Filter = require("bad-words");
import { DatabaseConnection } from "@creature-chess/data";
import { authenticate, convertDatabaseUserToUserModel, UserAppMetadata } from "@creature-chess/auth-server";
import { sanitize } from "./utils/sanitize";
import { SanitizedUser, validateNicknameFormat } from "@creature-chess/models";

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

type PatchCurrentUserRequest = Request<{}, PatchResponse, { nickname: string, picture: number }>;

const getNicknameError = async (filter: Filter, database: DatabaseConnection, nickname: string): Promise<string | null> => {
    const nicknameError = validateNicknameFormat(nickname);

    if (nicknameError) {
        return nicknameError;
    }

    if (filter.isProfane(nickname)) {
        return "Profanity filter";
    }

    const isUnique = (await database.user.getByNickname(nickname)) === null;

    if (!isUnique) {
        return "Nickname already in use";
    }

    return null;
};

export const patchCurrent = (
    database: DatabaseConnection,
    authClient: ManagementClient<UserAppMetadata>,
    filter: Filter
) => {
    return async (req: PatchCurrentUserRequest, res: Response<PatchResponse>) => {
        const { body, headers: { authorization } } = req;

        if (!authorization) {
            res.send(null);
            return;
        }

        if (!body) {
            res.sendStatus(400);
            return;
        }

        const user = await authenticate(authClient, database, authorization);

        if (!user) {
            res.sendStatus(401);
            return;
        }

        if (user.registered && user.profile.picture) {
            console.log(`Registered user ${user.id} tried to patch`);
            res.sendStatus(403);
            return;
        }

        const { nickname, picture } = req.body;

        let outputUser = user;

        if (nickname) {
            const trimmedNickname = nickname.trim();
            const nicknameError = await getNicknameError(filter, database, trimmedNickname);

            if (nicknameError) {
                res.status(400).send({
                    type: "invalid_nickname",
                    error: nicknameError
                });

                return;
            }

            const updatedUser = await database.user.setProfileInfo(user.id, trimmedNickname, picture);
            outputUser = convertDatabaseUserToUserModel(updatedUser);
        }
        if (nickname === null) {
            const updatedUser = await database.user.setProfileInfo(user.id, null, picture);
            outputUser = convertDatabaseUserToUserModel(updatedUser);
        }

        // update metadata if anything changed
        if (outputUser !== user) {
            await authClient.updateAppMetadata(
                { id: outputUser.authId }, { playerId: outputUser.id, playerNickname: outputUser.nickname, playerPicture: outputUser.profile.picture }
            );
        }

        const sanitized = sanitize(outputUser);

        res.send(sanitized);
    };
};

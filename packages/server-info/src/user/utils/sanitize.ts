import { UserModel } from "@creature-chess/auth-server";
import { SanitizedUser } from "@creature-chess/models";

export const sanitize = (user: UserModel): SanitizedUser => {
    const {
        id,
        nickname,
        stats
    } = user;

    return {
        id,
        nickname,
        stats
    };
};

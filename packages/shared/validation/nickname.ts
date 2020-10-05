import { MAX_NAME_LENGTH } from "@creature-chess/models/src/constants";

const NAME_REGEX = /^[a-zA-Z0-9_\ ]*$/;

export const validateNickname = (nickname: string) => {
    if (!nickname || !nickname.length  || nickname.length < 4) {
        return "Your nickname must be at least 4 characters long.";
    }

    if (nickname.length > MAX_NAME_LENGTH) {
        return "Name too long";
    }

    if (nickname.match(NAME_REGEX) === null) {
        return "Invalid characters in name";
    }

    return null;
};

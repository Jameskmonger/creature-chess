import { MAX_NAME_LENGTH } from '@common/constants';

const NAME_REGEX = /^[a-zA-Z0-9_\ ]*$/;

export const nameValidator = (name: string) => {
    if (name.match(NAME_REGEX) === null) {
        return "Invalid characters in name";
    }

    if (name.length > MAX_NAME_LENGTH) {
        return "Name too long";
    }

    return null;
};
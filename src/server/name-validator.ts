import { MAX_NAME_LENGTH } from '@common/constants';
import { log } from '@common/log';

const NAME_REGEX = /^[a-zA-Z0-9_\ ]*$/;

export const nameValidator = (name: string) => {
    log(`Attempting to validate name: ${JSON.stringify(name)}`);

    if (!name) {
        return "No name provided";
    }

    if (name.match(NAME_REGEX) === null) {
        return "Invalid characters in name";
    }

    if (name.length > MAX_NAME_LENGTH) {
        return "Name too long";
    }

    return null;
};

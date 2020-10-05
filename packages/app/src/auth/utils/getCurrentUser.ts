import { CURRENT_USER_ENDPOINT } from "../config";

export const getCurrentUser = async (token: string) => {
    const response = await fetch(CURRENT_USER_ENDPOINT, { headers: { Authorization: token } });

    if (response.ok) {
        const profile = await response.json();

        return profile;
    }

    return null;
};

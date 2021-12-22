import { Auth0User } from "@creature-chess/auth-web";

const namespace = "https://creaturechess.jamesmonger.com";

export const hasNickname = (user: Auth0User): boolean => (user[`${namespace}/playerNickname`] !== null);
export const isRegistered = (user: Auth0User): boolean => (user[`${namespace}/playerNickname`] !== null && user[`${namespace}/playerPicture`] !== null);

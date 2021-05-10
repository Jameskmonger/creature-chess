import { Auth0User } from "../user";

export const isRegistered = (user: Auth0User): boolean => user["https://creaturechess.jamesmonger.com/playerNickname"] !== null;

import { Auth0User } from "../user";

const namespace = "https://creaturechess.jamesmonger.com"

export const isRegistered = (user: Auth0User): boolean => {
    return (user[`${namespace}/playerNickname`] !== null)
}
export const isFullyRegistered = (user: Auth0User): boolean => {
    return (user[`${namespace}/playerNickname`] !== null && user[`${namespace}/playerPicture`] !== null)
}

import { SanitizedUser } from "@creature-chess/models";

export const USER_UPDATED = "USER_UPDATED";
export type USER_UPDATED = typeof USER_UPDATED;
export const USER_AUTHENTICATED = "USER_AUTHENTICATED";
export type USER_AUTHENTICATED = typeof USER_AUTHENTICATED;

export type UserUpdatedAction = { type: USER_UPDATED, payload: { user: SanitizedUser }};
export type UserAuthenticatedAction = { type: USER_AUTHENTICATED, payload: { token: string } };

export const userUpdated = (user: SanitizedUser): UserUpdatedAction => ({ type: USER_UPDATED, payload: { user }});
export const userAuthenticated = (token: string): UserAuthenticatedAction => ({ type: USER_AUTHENTICATED, payload: { token } });

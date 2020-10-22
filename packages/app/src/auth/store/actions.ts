import { SanitizedUser } from "@creature-chess/models";

export const USER_AUTHENTICATED = "USER_AUTHENTICATED";
export type USER_AUTHENTICATED = typeof USER_AUTHENTICATED;
export const USER_UPDATED = "USER_UPDATED";
export type USER_UPDATED = typeof USER_UPDATED;
export const SESSION_CHECKED = "SESSION_CHECKED";
export type SESSION_CHECKED = typeof SESSION_CHECKED;

export const HANDLE_AUTHENTICATION_CALLBACK = "HANDLE_AUTHENTICATION_CALLBACK";
export type HANDLE_AUTHENTICATION_CALLBACK = typeof HANDLE_AUTHENTICATION_CALLBACK;

export type SessionCheckedAction = { type: SESSION_CHECKED };
export type UserAuthenticatedAction = {
    type: USER_AUTHENTICATED;
    payload: {
        token: string;
        expiry: number;
        user: SanitizedUser;
    };
};
export type UserUpdatedAction = { type: USER_UPDATED, payload: { user: SanitizedUser }};

export const userAuthenticated = (token: string, expiry: number, user: SanitizedUser): UserAuthenticatedAction => ({
    type: USER_AUTHENTICATED,
    payload: {
        token,
        expiry,
        user
    }
});
export const userUpdated = (user: SanitizedUser): UserUpdatedAction => ({ type: USER_UPDATED, payload: { user }});

export const sessionChecked = (): SessionCheckedAction => ({ type: SESSION_CHECKED });

export const handleAuthenticationCallback = () => ({ type: HANDLE_AUTHENTICATION_CALLBACK });

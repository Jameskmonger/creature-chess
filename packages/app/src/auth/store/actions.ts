export const USER_AUTHENTICATED = "USER_AUTHENTICATED";
export type USER_AUTHENTICATED = typeof USER_AUTHENTICATED;
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
    };
};

export const userAuthenticated = (token: string, expiry: number): UserAuthenticatedAction => ({
    type: USER_AUTHENTICATED,
    payload: {
        token,
        expiry
    }
});

export const sessionChecked = (): SessionCheckedAction => ({ type: SESSION_CHECKED });

export const handleAuthenticationCallback = () => ({ type: HANDLE_AUTHENTICATION_CALLBACK });

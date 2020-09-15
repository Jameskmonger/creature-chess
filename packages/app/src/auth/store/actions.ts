export const USER_LOADED = "USER_LOADED";
export type USER_LOADED = typeof USER_LOADED;
export const SESSION_CHECKED = "SESSION_CHECKED";
export type SESSION_CHECKED = typeof SESSION_CHECKED;

export const HANDLE_AUTHENTICATION_CALLBACK = "HANDLE_AUTHENTICATION_CALLBACK";
export type HANDLE_AUTHENTICATION_CALLBACK = typeof HANDLE_AUTHENTICATION_CALLBACK;

export type SessionCheckedAction = { type: SESSION_CHECKED };
export type UserLoadedAction = { type: USER_LOADED, payload: { user: AuthInfo } };

interface AuthInfo {
    authenticated: boolean;
    idToken: string;
    profile: any;
    expiresAt: number;
}

export const userLoaded = (user: AuthInfo): UserLoadedAction => ({
    type: USER_LOADED,
    payload: {
        user
    }
});

export const sessionChecked = (): SessionCheckedAction => ({ type: SESSION_CHECKED });

export const handleAuthenticationCallback = () => ({ type: HANDLE_AUTHENTICATION_CALLBACK });

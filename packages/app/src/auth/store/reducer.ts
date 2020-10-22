import { AuthState } from "./state";
import { SessionCheckedAction, SESSION_CHECKED, UserAuthenticatedAction, UserUpdatedAction, USER_AUTHENTICATED, USER_UPDATED } from "./actions";

export const initialState: AuthState = {
    checkingSession: true,
    token: null,
    tokenExpiry: null,
    user: null
};

type AuthReducerActionTypes = UserAuthenticatedAction | UserUpdatedAction | SessionCheckedAction;

export function authReducer(state: AuthState = initialState, action: AuthReducerActionTypes): AuthState {
    switch (action.type) {
        case USER_AUTHENTICATED: {
            const { token, expiry, user } = action.payload;

            return {
                ...state,
                checkingSession: false,
                token,
                tokenExpiry: expiry,
                user
            };
        }
        case USER_UPDATED: {
            const { user } = action.payload;

            return {
                ...state,
                user
            };
        }
        case SESSION_CHECKED: {
            return {
                ...state,
                checkingSession: false
            };
        }
        default:
            return state;
    }
}

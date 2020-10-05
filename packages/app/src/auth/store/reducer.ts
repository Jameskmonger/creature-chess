import { AuthState } from "./state";
import { SessionCheckedAction, SESSION_CHECKED, UserAuthenticatedAction, USER_AUTHENTICATED } from "./actions";

export const initialState: AuthState = {
    checkingSession: true,
    token: null,
    tokenExpiry: null,
    user: null
};

type AuthReducerActionTypes = UserAuthenticatedAction | SessionCheckedAction;

export function authReducer(state: AuthState = initialState, action: AuthReducerActionTypes): AuthState {
    switch (action.type) {
        case USER_AUTHENTICATED:
            const { token, expiry, user } = action.payload;

            return {
                ...state,
                checkingSession: false,
                token,
                tokenExpiry: expiry,
                user
            };
        case SESSION_CHECKED:
            return {
                ...state,
                checkingSession: false
            };
        default:
            return state;
    }
}

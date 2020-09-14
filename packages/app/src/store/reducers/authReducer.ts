import { AuthState } from "../state";
import { SessionCheckedAction, SESSION_CHECKED, UserLoadedAction, USER_LOADED } from "../actions/authActions";

export const initialState: AuthState = {
    checkingSession: true,
    user: null
};

type AuthReducerActionTypes = UserLoadedAction | SessionCheckedAction;

export function auth(state: AuthState = initialState, action: AuthReducerActionTypes): AuthState {
    switch (action.type) {
        case USER_LOADED:
            const { user } = action.payload;

            return {
                ...state,
                checkingSession: false,
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

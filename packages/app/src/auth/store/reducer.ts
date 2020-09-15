import { AuthState } from "../../store/state";
import { SessionCheckedAction, SESSION_CHECKED, UserLoadedAction, USER_LOADED } from "./actions";

export const initialState: AuthState = {
    checkingSession: true,
    user: null
};

type AuthReducerActionTypes = UserLoadedAction | SessionCheckedAction;

export function authReducer(state: AuthState = initialState, action: AuthReducerActionTypes): AuthState {
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

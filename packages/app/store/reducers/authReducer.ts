import { AuthState } from "../state";
import { UserLoadedAction, USER_LOADED } from "../actions/authActions";

export const initialState: AuthState = null;

type AuthReducerActionTypes = UserLoadedAction;

export function auth(state: AuthState = initialState, action: AuthReducerActionTypes): AuthState {
    switch (action.type) {
        case USER_LOADED:
            const {
                user: {
                    authenticated,
                    expiresAt,
                    idToken,
                    profile
                }
            } = action.payload;

            return {
                authenticated,
                expiresAt,
                idToken,
                profile
            };
        default:
            return state;
    }
}

import { SanitizedUser } from "@creature-chess/models";
import { UserUpdatedAction, USER_UPDATED } from "./actions";

export type UserState = {
    fetched: boolean,
    user: SanitizedUser | null
};

const initialState: UserState = {
    fetched: false,
    user: null
};

export function userReducer(state = initialState, action: UserUpdatedAction): UserState {
    switch (action.type) {
        case USER_UPDATED: {
            const { user } = action.payload;

            return {
                ...state,
                fetched: true,
                user
            };
        }
        default:
            return state;
    }
}

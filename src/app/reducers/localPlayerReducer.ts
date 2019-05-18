import { LocalPlayerState } from "../store/store";
import { LocalPlayerAction } from "../actions/localPlayerActions";
import { JOIN_COMPLETE, LEVEL_UPDATE } from "../actiontypes/localPlayerActionTypes";

const initialState: LocalPlayerState = {
    id: null,
    name: null,
    level: null,
    xp: null
};

export function localPlayer(state: LocalPlayerState = initialState, action: LocalPlayerAction) {
    switch (action.type) {
        case JOIN_COMPLETE:
            return {
                id: action.payload.playerId,
                name: action.payload.name,
                level: 1,
                xp: 0
            };
        case LEVEL_UPDATE:
            return {
                ...state,
                level: action.payload.level,
                xp: action.payload.xp
            };
        default:
            return state;
    }
}

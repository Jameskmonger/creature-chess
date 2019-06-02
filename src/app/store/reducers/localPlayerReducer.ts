import { LocalPlayerState } from "../store";
import { LocalPlayerAction } from "../actions/localPlayerActions";
import { JOIN_COMPLETE, LEVEL_UPDATE, READY_UP } from "../actiontypes/localPlayerActionTypes";
import { GamePhaseUpdateAction } from "../actions/gameActions";
import { GAME_PHASE_UPDATE } from "../actiontypes/gameActionTypes";
import { GamePhase } from "@common";

const initialState: LocalPlayerState = {
    id: null,
    name: null,
    level: null,
    xp: null,
    ready: false
};

export function localPlayer(state: LocalPlayerState = initialState, action: LocalPlayerAction | GamePhaseUpdateAction) {
    switch (action.type) {
        case JOIN_COMPLETE:
            return {
                id: action.payload.playerId,
                name: action.payload.name,
                level: 1,
                xp: 0,
                ready: false
            };
        case LEVEL_UPDATE:
            return {
                ...state,
                level: action.payload.level,
                xp: action.payload.xp
            };
        case READY_UP:
            return {
                ...state,
                ready: true
            };
        case GAME_PHASE_UPDATE:
            if (action.payload.phase !== GamePhase.READY) {
                return state;
            }

            return {
                ...state,
                ready: false
            };
        default:
            return state;
    }
}

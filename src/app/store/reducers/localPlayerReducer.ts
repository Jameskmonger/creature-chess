import { LocalPlayerState } from "../state";
import { LocalPlayerAction } from "../actions/localPlayerActions";
import { JOIN_COMPLETE, LEVEL_UPDATE } from "../actiontypes/localPlayerActionTypes";
import { GamePhase } from "@common/models";
import { PlayerActions } from "@common/player";
import { GamePhaseUpdateAction, GAME_PHASE_UPDATE } from "@common/player/gameInfo";
import { READY_UP } from "@common/player/actions";

const initialState: LocalPlayerState = {
    id: null,
    name: null,
    level: 1,
    xp: 0,
    ready: false
};

export function localPlayer(state: LocalPlayerState = initialState, action: LocalPlayerAction | GamePhaseUpdateAction | PlayerActions.ReadyUpAction) {
    switch (action.type) {
        case JOIN_COMPLETE:
            return {
                ...state,
                id: action.payload.playerId,
                name: action.payload.name,
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

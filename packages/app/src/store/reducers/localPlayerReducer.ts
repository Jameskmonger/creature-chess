import { LocalPlayerState } from "../state";
import { JoinCompleteAction } from "../actions/localPlayerActions";
import { JOIN_COMPLETE } from "../actiontypes/localPlayerActionTypes";
import { GamePhase } from "@creature-chess/models";
import { PlayerActions } from "@creature-chess/shared/player";
import { GamePhaseUpdateAction, GAME_PHASE_UPDATE } from "@creature-chess/shared/player/gameInfo";
import { READY_UP } from "@creature-chess/shared/player/actions";

const initialState: LocalPlayerState = {
    id: null,
    ready: false
};

export function localPlayer(
    state: LocalPlayerState = initialState,
    action: JoinCompleteAction | GamePhaseUpdateAction | PlayerActions.ReadyUpAction
): LocalPlayerState {
    switch (action.type) {
        case JOIN_COMPLETE:
            return {
                ...state,
                id: action.payload.playerId,
                ready: false
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

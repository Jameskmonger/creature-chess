import { GameAction, JOIN_COMPLETE } from "./actions";
import { GameState } from "./state";
import { GamePhase } from "@creature-chess/models";
import { GAME_PHASE_UPDATE } from "@creature-chess/shared/player/gameInfo";

export const initialState: GameState = {
    id: null,
    round: null,
};

export function reducer(state: GameState = initialState, action: GameAction): GameState {
    switch (action.type) {
        case JOIN_COMPLETE:
            return {
                ...state,
                id: action.payload.gameId
            };
        case GAME_PHASE_UPDATE:
            if (action.payload.phase === GamePhase.PREPARING) {
                return {
                    ...state,
                    round: action.payload.payload.round
                };
            }

            return state;
        default:
            return state;
    }
}

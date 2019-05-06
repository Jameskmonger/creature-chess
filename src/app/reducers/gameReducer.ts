import { GameAction } from "../actions/gameActions";
import { JOIN_COMPLETE, JOIN_GAME, GAME_PHASE_UPDATE, MONEY_UPDATE, PIECE_SELECTED, PHASE_TIMER_UPDATED } from "../actiontypes/gameActionTypes";
import { GameState } from "../store/store";
import { GamePhase } from "../../shared";

const initialState: GameState = {
    localPlayerId: null,
    opponentId: null,
    loading: false,
    money: 0,
    selectedPiece: null,
    phase: GamePhase.WAITING,
    phaseTimer: null
};

export function game(state: GameState = initialState, action: GameAction) {
    switch (action.type) {
        case JOIN_GAME:
            return {
                ...state,
                loading: true,
                localPlayerId: null
            };
        case JOIN_COMPLETE:
            return {
                ...state,
                loading: false,
                localPlayerId: action.payload.id
            };
        case GAME_PHASE_UPDATE:
            if (action.payload.phase === GamePhase.READY) {
                return {
                    ...state,
                    phase: action.payload.phase,
                    opponentId: action.payload.payload.opponentId
                };
            }

            return {
                ...state,
                phase: action.payload.phase
            };
        case PHASE_TIMER_UPDATED:
            return {
                ...state,
                phaseTimer: action.payload.time
            };
        case MONEY_UPDATE:
            return {
                ...state,
                money: action.payload.money
            };
        case PIECE_SELECTED:
            return {
                ...state,
                selectedPiece: action.payload.piece
            };
        default:
            return state;
    }
}

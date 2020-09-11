import { MONEY_UPDATE, GAME_PHASE_UPDATE, GameAction } from "./actions";
import { GamePhase } from "@creature-chess/models";
import { STARTING_MONEY } from "@creature-chess/models/constants";

export interface GameInfoState {
    phase: GamePhase;
    money: number;
}

const initialState: GameInfoState = {
    phase: GamePhase.WAITING,
    money: STARTING_MONEY
};

export function gameInfo(state: GameInfoState = initialState, action: GameAction): GameInfoState {
    switch (action.type) {
        case MONEY_UPDATE:
            return {
                ...state,
                money: action.payload.money
            };
        case GAME_PHASE_UPDATE:
            return {
                ...state,
                phase: action.payload.phase
            };
        default:
            return state;
    }
}

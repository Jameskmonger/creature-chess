import { MONEY_UPDATE, SHOP_LOCK_UPDATED, GameAction, SET_OPPONENT, CLEAR_OPPONENT } from "./actions";
import { STARTING_MONEY } from "@creature-chess/models/src/constants";
import { READY_UP } from "../actions";
import { GAME_PHASE_UPDATE } from "../../game/store/actions";

export interface GameInfoState {
    opponentId: string;
    shopLocked: boolean;
    money: number;
    ready: boolean;
}

const initialState: GameInfoState = {
    opponentId: null,
    shopLocked: false,
    money: STARTING_MONEY,
    ready: false
};

export function gameInfo(state: GameInfoState = initialState, action: GameAction): GameInfoState {
    switch (action.type) {
        case MONEY_UPDATE:
            return {
                ...state,
                money: action.payload.money
            };
        case SET_OPPONENT:
            return {
                ...state,
                opponentId: action.payload.opponentId,
                ready: false
            };
        case CLEAR_OPPONENT:
            return {
                ...state,
                opponentId: null
            };
        case SHOP_LOCK_UPDATED: {
            return {
                ...state,
                shopLocked: action.payload.locked
            };
        };
        case READY_UP:
            return {
                ...state,
                ready: true
            };
        default:
            return state;
    }
}

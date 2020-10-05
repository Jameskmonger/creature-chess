import { MONEY_UPDATE, SHOP_LOCK_UPDATED, GameAction, SET_OPPONENT, CLEAR_OPPONENT, LEVEL_UPDATE, CARDS_UPDATED } from "./actions";
import { STARTING_LEVEL, STARTING_MONEY } from "@creature-chess/models/src/constants";
import { READY_UP } from "../actions";
import { Card } from "@creature-chess/models";

export interface PlayerInfoState {
    opponentId: string;
    shopLocked: boolean;
    money: number;
    ready: boolean;
    level: number;
    xp: number;
    cards: Card[];
}

const initialState: PlayerInfoState = {
    opponentId: null,
    shopLocked: false,
    money: STARTING_MONEY,
    ready: false,
    level: STARTING_LEVEL,
    xp: 0,
    cards: []
};

export function playerInfoReducer(state: PlayerInfoState = initialState, action: GameAction): PlayerInfoState {
    switch (action.type) {
        case CARDS_UPDATED:
            return {
                ...state,
                cards: action.payload.cards
            };
        case LEVEL_UPDATE:
            return {
                ...state,
                level: action.payload.level,
                xp: action.payload.xp
            };
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

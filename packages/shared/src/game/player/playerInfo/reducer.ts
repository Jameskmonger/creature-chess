import { STARTING_HEALTH, STARTING_LEVEL, STARTING_MONEY, Card, StreakType, PlayerBattle, PlayerStatus } from "@creature-chess/models";
import {
    UPDATE_MONEY_COMMAND, UPDATE_SHOP_LOCK_COMMAND, PlayerInfoCommand, UPDATE_OPPONENT_COMMAND, CLEAR_OPPONENT_COMMAND,
    UPDATE_LEVEL_COMMAND, UPDATE_CARDS_COMMAND, UPDATE_HEALTH_COMMAND, UPDATE_ROUND_DIED_AT_COMMAND, UPDATE_STREAK_COMMAND, UPDATE_STATUS_COMMAND, UPDATE_BATTLE_COMMAND
} from "./commands";
import { READY_UP_ACTION } from "../actions";
import { PlayerEvent, PLAYER_DEATH_EVENT } from "../events";

export interface PlayerStreak {
    type: StreakType;
    amount: number;
}

export type HasPlayerInfo = { playerInfo: PlayerInfoState };

export interface PlayerInfoState {
    status: PlayerStatus;
    health: number;
    streak: PlayerStreak;
    battle: PlayerBattle | null;

    dead: boolean;
    roundDiedAt: number | null;

    opponentId: string;
    shopLocked: boolean;
    money: number;
    ready: boolean;
    level: number;
    xp: number;
    cards: Card[];
}

const initialState: PlayerInfoState = {
    status: PlayerStatus.CONNECTED,
    health: STARTING_HEALTH,
    roundDiedAt: null,
    dead: false,
    streak: {
        type: StreakType.WIN,
        amount: 0
    },
    battle: null,
    opponentId: null,
    shopLocked: false,
    money: STARTING_MONEY,
    ready: false,
    level: STARTING_LEVEL,
    xp: 0,
    cards: []
};

export function playerInfoReducer(state: PlayerInfoState = initialState, command: PlayerInfoCommand | PlayerEvent): PlayerInfoState {
    switch (command.type) {
        case PLAYER_DEATH_EVENT:
            return {
                ...state,
                dead: true
            };
        case UPDATE_STATUS_COMMAND:
            return {
                ...state,
                status: command.payload.status
            };
        case UPDATE_BATTLE_COMMAND:
            return {
                ...state,
                battle: command.payload.battle
            };
        case UPDATE_HEALTH_COMMAND:
            return {
                ...state,
                health: command.payload.health
            };
        case UPDATE_STREAK_COMMAND:
            return {
                ...state,
                streak: {
                    amount: command.payload.amount,
                    type: command.payload.type
                }
            };
        case UPDATE_ROUND_DIED_AT_COMMAND:
            return {
                ...state,
                roundDiedAt: command.payload.roundDiedAt
            };
        case UPDATE_CARDS_COMMAND:
            return {
                ...state,
                cards: command.payload.cards
            };
        case UPDATE_LEVEL_COMMAND:
            return {
                ...state,
                level: command.payload.level,
                xp: command.payload.xp
            };
        case UPDATE_MONEY_COMMAND:
            return {
                ...state,
                money: command.payload.money
            };
        case UPDATE_OPPONENT_COMMAND:
            return {
                ...state,
                opponentId: command.payload.opponentId,
                ready: false
            };
        case CLEAR_OPPONENT_COMMAND:
            return {
                ...state,
                opponentId: null
            };
        case UPDATE_SHOP_LOCK_COMMAND:
            return {
                ...state,
                shopLocked: command.payload.locked
            };
        case READY_UP_ACTION:
            return {
                ...state,
                ready: true
            };
        default:
            return state;
    }
}
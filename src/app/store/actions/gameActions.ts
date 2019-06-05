import { JOIN_GAME, MONEY_UPDATE, GAME_PHASE_UPDATE, PHASE_TIMER_UPDATED, CREATE_GAME, JOIN_ERROR, ENABLE_DEBUG_MODE } from "../actiontypes/gameActionTypes";
import { PhaseUpdatePacket } from "@common/packet-opcodes";
import { JoinCompleteAction } from "./localPlayerActions";

export type JoinGameAction = ({ type: JOIN_GAME, payload: { serverIP: string, name: string, gameId: string } });
export type CreateGameAction = ({ type: CREATE_GAME, payload: { serverIP: string, name: string, playerCount: number, botCount: number } });
export type JoinErrorAction = ({ type: JOIN_ERROR, payload: { error: string }});
export type GamePhaseUpdateAction = ({ type: GAME_PHASE_UPDATE, payload: PhaseUpdatePacket });

export type GameAction =
    JoinGameAction
    | CreateGameAction
    | JoinErrorAction
    | ({ type: MONEY_UPDATE, payload: { money: number } })
    | ({ type: PHASE_TIMER_UPDATED, payload: { time: number }})
    | JoinCompleteAction
    | GamePhaseUpdateAction
    | ({ type: ENABLE_DEBUG_MODE });

export const joinGameAction = (serverIP: string, name: string, gameId: string): JoinGameAction => ({
    type: JOIN_GAME,
    payload: {
        name,
        serverIP,
        gameId
    }
});

export const createGameAction = (serverIP: string, name: string, playerCount: number, botCount: number): CreateGameAction => ({
    type: CREATE_GAME,
    payload: {
        name,
        serverIP,
        playerCount,
        botCount
    }
});

export const joinGameError = (error: string): JoinErrorAction => ({
    type: JOIN_ERROR,
    payload: {
        error
    }
});

export const gamePhaseUpdate = (packet: PhaseUpdatePacket) => ({
    type: GAME_PHASE_UPDATE,
    payload: packet
});

export const moneyUpdateAction = (money: number) => ({
    type: MONEY_UPDATE,
    payload: {
        money
    }
});

export const phaseTimerUpdated = (time: number) => ({
    type: PHASE_TIMER_UPDATED,
    payload: {
        time
    }
});

export const enableDebugMode = () => ({
    type: ENABLE_DEBUG_MODE
});

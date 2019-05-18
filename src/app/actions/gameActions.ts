import { JOIN_GAME, MONEY_UPDATE, GAME_PHASE_UPDATE, PHASE_TIMER_UPDATED } from "../actiontypes/gameActionTypes";
import { PhaseUpdatePacket } from "@common/packet-opcodes";
import { JoinCompleteAction } from "./localPlayerActions";

export type GamePhaseUpdateAction = ({ type: GAME_PHASE_UPDATE, payload: PhaseUpdatePacket });

export type GameAction =
    ({ type: JOIN_GAME, payload: { serverIP: string, name: string } })
    | ({ type: MONEY_UPDATE, payload: { money: number } })
    | ({ type: PHASE_TIMER_UPDATED, payload: { time: number }})
    | JoinCompleteAction
    | GamePhaseUpdateAction;

export const joinGameAction = (serverIP: string, name: string) => ({
    type: JOIN_GAME,
    payload: {
        name,
        serverIP
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

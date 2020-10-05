import { ServerToClient } from "../../networking";

export const GAME_PHASE_UPDATE = "GAME_PHASE_UPDATE";
export type GAME_PHASE_UPDATE = typeof GAME_PHASE_UPDATE;
export const PLAYERS_RESURRECTED = "PLAYERS_RESURRECTED";
export type PLAYERS_RESURRECTED = typeof PLAYERS_RESURRECTED;
export const FINISH_GAME = "FINISH_GAME";
export type FINISH_GAME = typeof FINISH_GAME;
export const PHASE_START_SECONDS = "PHASE_START_SECONDS";
export type PHASE_START_SECONDS = typeof PHASE_START_SECONDS;

export type GamePhaseUpdateAction = ({ type: GAME_PHASE_UPDATE, payload: ServerToClient.PhaseUpdatePacket });
export type FinishGameAction = ({ type: FINISH_GAME, payload: { winnerName: string }});
export type PlayersResurrectedAction = ({ type: PLAYERS_RESURRECTED, payload: { playerIds: string[] }});
export type PhaseStartSecondsAction = ({ type: PHASE_START_SECONDS, payload: { time: number } });

export type GameAction = GamePhaseUpdateAction | PhaseStartSecondsAction;

export const gamePhaseUpdate = (packet: ServerToClient.PhaseUpdatePacket) => ({
    type: GAME_PHASE_UPDATE,
    payload: packet
});

export const playersResurrected = (playerIds: string[]): PlayersResurrectedAction => ({
    type: PLAYERS_RESURRECTED,
    payload: {
        playerIds
    }
});

export const finishGameAction = (winnerName: string): FinishGameAction => ({
    type: FINISH_GAME,
    payload: {
        winnerName
    }
});

export const phaseStartSeconds = (timeSeconds: number): PhaseStartSecondsAction => ({
    type: PHASE_START_SECONDS,
    payload: {
        time: timeSeconds
    }
});

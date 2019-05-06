import { JOIN_COMPLETE, JOIN_GAME, MONEY_UPDATE, GAME_PHASE_UPDATE, PIECE_SELECTED, PHASE_TIMER_UPDATED } from "../actiontypes/gameActionTypes";
import { PokemonPiece } from "../../shared";
import { PhaseUpdatePacket } from "../../shared/packet-opcodes";

export type GamePhaseUpdateAction = ({ type: GAME_PHASE_UPDATE, payload: PhaseUpdatePacket });

export type GameAction =
    ({ type: JOIN_GAME, payload: { serverIP: string, name: string } })
    | ({ type: JOIN_COMPLETE, payload: { id: string } })
    | GamePhaseUpdateAction
    | ({ type: MONEY_UPDATE, payload: { money: number } })
    | ({ type: PIECE_SELECTED, payload: { piece: PokemonPiece }})
    | ({ type: PHASE_TIMER_UPDATED, payload: { time: number }});

export const joinGameAction = (serverIP: string, name: string) => ({
    type: JOIN_GAME,
    payload: {
        name,
        serverIP
    }
});

export const joinCompleteAction = (id: string) => ({
    type: JOIN_COMPLETE,
    payload: {
        id
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

export const pieceSelectedAction = (piece: PokemonPiece) => ({
    type: PIECE_SELECTED,
    payload: {
        piece
    }
});

export const phaseTimerUpdated = (time: number) => ({
    type: PHASE_TIMER_UPDATED,
    payload: {
        time
    }
});

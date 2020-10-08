import { Socket } from "socket.io";
import { PlayerActions } from "@creature-chess/shared";
import { PlayerGameState } from "@creature-chess/shared/lib/networking/server-to-client";

export const RECEIVE_PLAYER_ACTIONS_EVENT = "RECEIVE_PLAYER_ACTIONS_EVENT";
export type RECEIVE_PLAYER_ACTIONS_EVENT = typeof RECEIVE_PLAYER_ACTIONS_EVENT;
export type ReceivePlayerActionsEvent = ({
    type: RECEIVE_PLAYER_ACTIONS_EVENT,
    payload: {
        index: number,
        actions: PlayerActions.PlayerAction[],
        ack: (accepted: boolean, packetIndex?: number) => void
    }
});
export const receivePlayerActionsEvent = (
    index: number,
    actions: PlayerActions.PlayerAction[],
    ack: (accepted: boolean, packetIndex?: number) => void
): ReceivePlayerActionsEvent => ({
    type: RECEIVE_PLAYER_ACTIONS_EVENT,
    payload: { index, actions, ack }
});

export const NEW_PLAYER_SOCKET_EVENT = "NEW_PLAYER_SOCKET_EVENT";
export type NEW_PLAYER_SOCKET_EVENT = typeof NEW_PLAYER_SOCKET_EVENT;
export type NewPlayerSocketEvent = ({
    type: NEW_PLAYER_SOCKET_EVENT,
    payload: { socket: Socket }
});
export const newPlayerSocketEvent = (socket: Socket): NewPlayerSocketEvent => ({
    type: NEW_PLAYER_SOCKET_EVENT,
    payload: { socket }
});

export const JOIN_GAME_EVENT = "JOIN_GAME_EVENT";
export type JOIN_GAME_EVENT = typeof JOIN_GAME_EVENT;
export type JoinGameEvent = ({
    type: JOIN_GAME_EVENT,
    payload: PlayerGameState
});
export const joinGameEvent = (state: PlayerGameState): JoinGameEvent => ({
    type: JOIN_GAME_EVENT,
    payload: state
});

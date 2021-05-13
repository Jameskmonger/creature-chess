import { Socket } from "socket.io";
import { PlayerGameActions } from "@creature-chess/gamemode";

export const RECEIVE_PLAYER_ACTIONS_EVENT = "RECEIVE_PLAYER_ACTIONS_EVENT";
export type RECEIVE_PLAYER_ACTIONS_EVENT = typeof RECEIVE_PLAYER_ACTIONS_EVENT;
export type ReceivePlayerActionsEvent = ({
	type: RECEIVE_PLAYER_ACTIONS_EVENT,
	payload: {
		index: number,
		actions: PlayerGameActions.PlayerGameAction[],
		ack: (accepted: boolean, packetIndex?: number) => void
	}
});
export const receivePlayerActionsEvent = (
	index: number,
	actions: PlayerGameActions.PlayerGameAction[],
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

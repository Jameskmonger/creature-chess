import { Socket } from "socket.io";
import { PlayerGameActions } from "@creature-chess/gamemode";

export const RECEIVE_PLAYER_ACTIONS_EVENT = "RECEIVE_PLAYER_ACTIONS_EVENT";
export type RECEIVE_PLAYER_ACTIONS_EVENT = typeof RECEIVE_PLAYER_ACTIONS_EVENT;
export type ReceivePlayerActionsEvent = ({
	type: RECEIVE_PLAYER_ACTIONS_EVENT,
	payload: {
		index: number,
		actions: PlayerGameActions.PlayerGameAction[]
	}
});
export const receivePlayerActionsEvent = (
	index: number,
	actions: PlayerGameActions.PlayerGameAction[]
): ReceivePlayerActionsEvent => ({
	type: RECEIVE_PLAYER_ACTIONS_EVENT,
	payload: { index, actions }
});

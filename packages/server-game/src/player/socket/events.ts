import { PlayerAction } from "@creature-chess/gamemode";

export const RECEIVE_PLAYER_ACTIONS_EVENT = "RECEIVE_PLAYER_ACTIONS_EVENT";
export type RECEIVE_PLAYER_ACTIONS_EVENT = typeof RECEIVE_PLAYER_ACTIONS_EVENT;
export type ReceivePlayerActionsEvent = ({
	type: RECEIVE_PLAYER_ACTIONS_EVENT,
	payload: {
		index: number,
		actions: PlayerAction[]
	}
});
export const receivePlayerActionsEvent = (
	index: number,
	actions: PlayerAction[]
): ReceivePlayerActionsEvent => ({
	type: RECEIVE_PLAYER_ACTIONS_EVENT,
	payload: { index, actions }
});

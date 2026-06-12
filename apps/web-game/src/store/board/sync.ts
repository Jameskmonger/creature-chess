import { createAction } from "@reduxjs/toolkit";
import { updateBoardFromPacket } from "~/networking/utils/updateBoardFromPacket";
import { ClientStartListening } from "~/store/listenerContext";

import { GameServerToClient } from "@creature-chess/networking";

import { startBattleCommand } from "../battle/commands";

export const boardUpdateAction =
	createAction<GameServerToClient.BoardUpdatePacket>("boardUpdateAction");
export const benchUpdateAction =
	createAction<GameServerToClient.BoardUpdatePacket>("benchUpdateAction");
export const matchBoardUpdateAction =
	createAction<GameServerToClient.MatchBoardUpdatePacket>(
		"matchBoardUpdateAction"
	);

export const setupBoardSyncListeners = (
	startListening: ClientStartListening
) => {
	startListening({
		actionCreator: boardUpdateAction,
		effect: ({ payload }, api) => {
			const { board, pieceRegistry } = api.extra.sessionHolder.get();
			updateBoardFromPacket(board, pieceRegistry, payload);
		},
	});

	startListening({
		actionCreator: benchUpdateAction,
		effect: ({ payload }, api) => {
			const { bench, pieceRegistry } = api.extra.sessionHolder.get();
			updateBoardFromPacket(bench, pieceRegistry, payload);
		},
	});

	startListening({
		actionCreator: matchBoardUpdateAction,
		// Mutation must complete before startBattleCommand fires.
		effect: ({ payload }, api) => {
			const { battle, pieceRegistry } = api.extra.sessionHolder.get();
			updateBoardFromPacket(battle.board, pieceRegistry, payload.board);

			if (payload.turn !== null) {
				api.dispatch(startBattleCommand({ turn: payload.turn }));
			}
		},
	});
};

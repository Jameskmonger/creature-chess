import { createAction } from "@reduxjs/toolkit";
import { GameBoardState } from "~/components/game/board/state";
import { updateBoardFromPacket } from "~/networking/utils/updateBoardFromPacket";
import { ClientStartListening } from "~/store/listenerContext";

import { GameServerToClient } from "@creature-chess/networking";

import { startBattleCommand } from "../battle/commands";

export const boardUpdateAction = createAction<GameServerToClient.BoardUpdatePacket>(
	"boardUpdateAction"
);
export const benchUpdateAction = createAction<GameServerToClient.BoardUpdatePacket>(
	"benchUpdateAction"
);
export const matchBoardUpdateAction =
	createAction<GameServerToClient.MatchBoardUpdatePacket>("matchBoardUpdateAction");

export const setupBoardSyncListeners = (
	startListening: ClientStartListening
) => {
	startListening({
		actionCreator: boardUpdateAction,
		effect: async ({ payload }, api) => {
			const { board, pieceRegistry } = api.extra.slices as GameBoardState;
			updateBoardFromPacket(board, pieceRegistry, payload);
		},
	});

	startListening({
		actionCreator: benchUpdateAction,
		effect: async ({ payload }, api) => {
			const { bench, pieceRegistry } = api.extra.slices as GameBoardState;
			updateBoardFromPacket(bench, pieceRegistry, payload);
		},
	});

	startListening({
		actionCreator: matchBoardUpdateAction,
		// Mutation must complete before startBattleCommand fires.
		effect: async ({ payload }, api) => {
			const { matchBoard, pieceRegistry } = api.extra.slices as GameBoardState;
			updateBoardFromPacket(matchBoard, pieceRegistry, payload.board);

			if (payload.turn !== null) {
				api.dispatch(startBattleCommand({ turn: payload.turn }));
			}
		},
	});
};

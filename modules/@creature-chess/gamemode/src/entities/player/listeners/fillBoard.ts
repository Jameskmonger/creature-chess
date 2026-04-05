import { PlayerPieceLocation } from "@creature-chess/models";

import { dropPiecePlayerAction } from "../../../playerActions";
import { PlayerStartListening } from "../dependencies";
import { PlayerState } from "../state";
import {
	isPlayerAlive,
	getPlayerBelowPieceLimit,
} from "../state/selectors";
import { Board, getFirstEmptySlot, packPosition } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

const FILL_BOARD_COMMAND = "FILL_BOARD_COMMAND";
type FILL_BOARD_COMMAND = typeof FILL_BOARD_COMMAND;
type FillBoardCommand = { type: FILL_BOARD_COMMAND };

export const fillBoardCommand = (): FillBoardCommand => ({
	type: FILL_BOARD_COMMAND,
});

const getMostExpensiveBenchPiece = (bench: Board, pieces: PieceRegistry) => {
	const benchPieces = bench.getAllPieces()
		.map(({ id }) => pieces.getPieceById(id))
		.filter((piece): piece is NonNullable<typeof piece> => piece !== null);

	if (!benchPieces.length) {
		return null;
	}

	benchPieces.sort((a, b) => b.definition.cost - a.definition.cost);

	return benchPieces[0];
};

export const setupFillBoardListener = (startListening: PlayerStartListening) => {
	startListening({
		type: FILL_BOARD_COMMAND,
		effect: async (_action, api) => {
			const { boards: { board, bench }, gamemode: { pieceRegistry } } = api.extra.dependencies;

			if (!isPlayerAlive(api.getState())) {
				return;
			}

			while (true) {
				const state: PlayerState = api.getState();
				const belowPieceLimit = getPlayerBelowPieceLimit(state.playerInfo.level, board);

				if (!belowPieceLimit) {
					return;
				}

				const benchPiece = getMostExpensiveBenchPiece(bench, pieceRegistry);

				if (!benchPiece) {
					return;
				}

				const destination = getFirstEmptySlot(board);

				if (!destination) {
					return;
				}

				const benchPiecePosition = bench.getPiecePosition(benchPiece.id);

				if (!benchPiecePosition) {
					return;
				}

				const fromLocation: PlayerPieceLocation = {
					type: "bench",
					location: packPosition(benchPiecePosition[0], 0),
				};

				const toLocation: PlayerPieceLocation = {
					type: "board",
					location: destination,
				};

				api.dispatch(
					dropPiecePlayerAction({
						pieceId: benchPiece.id,
						from: fromLocation,
						to: toLocation,
					})
				);
			}
		},
	});
};

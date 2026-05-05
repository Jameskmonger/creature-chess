import { Board, getFirstEmptySlot, packPosition } from "@creature-chess/board";
import { getDefinitionById, PlayerPieceLocation } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { dropPiecePlayerAction } from "../../../playerActions";
import { Player } from "../player";
import { isPlayerAlive, getPlayerBelowPieceLimit } from "../state/selectors";

const getMostExpensiveBenchPiece = (bench: Board, pieces: PieceRegistry) => {
	const benchPieces = bench
		.getAllPieces()
		.map(({ id }) => pieces.getPieceById(id))
		.filter((piece): piece is NonNullable<typeof piece> => piece !== null);

	if (!benchPieces.length) {
		return null;
	}

	benchPieces.sort(
		(a, b) =>
			(getDefinitionById(b.definitionId)?.cost ?? 0) -
			(getDefinitionById(a.definitionId)?.cost ?? 0)
	);

	return benchPieces[0];
};

export const fillBoard = (player: Player): void => {
	const { board, bench, gamemode } = player;
	const { pieceRegistry } = gamemode;

	if (!isPlayerAlive(player.select((s) => s))) {
		return;
	}

	while (true) {
		const state = player.select((s) => s);
		const belowPieceLimit = getPlayerBelowPieceLimit(
			state.playerInfo.level,
			board
		);

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

		player.put(
			dropPiecePlayerAction({
				pieceId: benchPiece.id,
				from: fromLocation,
				to: toLocation,
			})
		);
	}
};

import { Board, getFirstEmptySlot } from "@creature-chess/board";
import { getDefinitionById } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { Player } from "../player";

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

	if (!player.alive) {
		return;
	}

	while (true) {
		if (!player.belowPieceLimit) {
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

		player.removeBenchPiece({ pieceId: benchPiece.id });
		player.addBoardPiece({ pieceId: benchPiece.id, position: destination });
	}
};

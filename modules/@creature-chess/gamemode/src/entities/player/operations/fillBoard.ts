import { Board, getFirstEmptySlot } from "@creature-chess/board";
import { ReadablePieceRegistry } from "@creature-chess/utils";

import { CreatureRegistry } from "../../../factory";
import { Player } from "../player";

const getMostExpensiveBenchPiece = (
	bench: Board,
	pieces: ReadablePieceRegistry,
	creatures: CreatureRegistry
) => {
	const benchPieces = bench
		.getAllPieces()
		.map(({ id }) => pieces.getPieceById(id))
		.filter((piece): piece is NonNullable<typeof piece> => piece !== null);

	if (!benchPieces.length) {
		return null;
	}

	benchPieces.sort(
		(a, b) =>
			(creatures.get(b.definitionId)?.cost ?? 0) -
			(creatures.get(a.definitionId)?.cost ?? 0)
	);

	return benchPieces[0];
};

export const fillBoard = (player: Player): void => {
	const { board, bench, gamemode } = player;
	const { pieceRegistry, creatures } = gamemode;

	if (!player.alive) {
		return;
	}

	while (true) {
		if (!player.belowPieceLimit) {
			return;
		}

		const benchPiece = getMostExpensiveBenchPiece(
			bench,
			pieceRegistry,
			creatures
		);

		if (!benchPiece) {
			return;
		}

		const destination = getFirstEmptySlot(board);

		if (!destination) {
			return;
		}

		player.relocatePiece(benchPiece.id, {
			type: "board",
			location: destination,
		});
	}
};

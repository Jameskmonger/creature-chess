import { Board } from "@creature-chess/board";
import { Card, PieceModel } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

export const collectAllPieces = (
	board: Board,
	bench: Board,
	pieceRegistry: PieceRegistry
): PieceModel[] =>
	[...board.getAllPieces(), ...bench.getAllPieces()]
		.map((p) => pieceRegistry.getPieceById(p.id))
		.filter((p): p is PieceModel => p !== null);

/** Stage-0 copies of `card`'s definition already owned. 2 means this card stages up. */
export const completionProgress = (
	allPieces: PieceModel[],
	card: Card
): 0 | 1 | 2 => {
	let count = 0;
	for (const piece of allPieces) {
		if (piece.definitionId === card.definitionId && piece.stage === 0) {
			count++;
			if (count >= 2) {
				return 2;
			}
		}
	}
	return count as 0 | 1;
};

export const sharesTrait = (allPieces: PieceModel[], card: Card): boolean => {
	const owned = new Set<string>();
	for (const piece of allPieces) {
		for (const trait of piece.traits) {
			owned.add(trait);
		}
	}
	for (const trait of card.traits) {
		if (owned.has(trait)) {
			return true;
		}
	}
	return false;
};

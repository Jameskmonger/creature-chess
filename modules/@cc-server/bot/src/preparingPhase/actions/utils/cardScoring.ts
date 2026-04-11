import { Board } from "@creature-chess/board";
import { Card, PieceModel } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils/piece";

export const collectAllPieces = (
	board: Board,
	bench: Board,
	pieceRegistry: PieceRegistry
): PieceModel[] =>
	[...board.getAllPieces(), ...bench.getAllPieces()]
		.map((p) => pieceRegistry.getPieceById(p.id))
		.filter((p): p is PieceModel => p !== null);

/**
 * Count how many stage-0 pieces of the same definition the player already
 * owns. 0/1/2 — 2 means buying this card would complete a 3-of-a-kind.
 *
 * Higher stages aren't counted because shop cards arrive at stage 0 and only
 * combine with other stage-0 pieces of the same definition.
 */
export const getCompletionProximity = (
	allPieces: PieceModel[],
	card: Card
): number => {
	let count = 0;
	for (const piece of allPieces) {
		if (piece.definitionId === card.definitionId && piece.stage === 0) {
			count++;
			if (count >= 2) {
				return 2;
			}
		}
	}
	return count;
};

/**
 * Count how many of the card's traits are already represented on at least one
 * of the player's pieces. 0–3 (cards typically have 2–3 traits).
 */
export const getTraitSynergyCount = (
	allPieces: PieceModel[],
	card: Card
): number => {
	const ownedTraits = new Set<string>();
	for (const piece of allPieces) {
		for (const trait of piece.traits) {
			ownedTraits.add(trait);
		}
	}

	let matches = 0;
	for (const trait of card.traits) {
		if (ownedTraits.has(trait)) {
			matches++;
		}
	}
	return matches;
};

/**
 * A card is "wanted" if it would either complete a 3-of-a-kind setup or share
 * at least one trait with a piece the player already owns.
 */
export const isCardWanted = (allPieces: PieceModel[], card: Card): boolean =>
	getCompletionProximity(allPieces, card) > 0 ||
	getTraitSynergyCount(allPieces, card) > 0;

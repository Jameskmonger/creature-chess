import { createUtilityValue, ScoringDirection } from "@shoki/engine";

import {
	PlayerState,
	PlayerStateSelectors,
	PlayerActions,
} from "@creature-chess/gamemode";
import { PieceModel } from "@creature-chess/models";

import { BotPersonality } from "@cc-server/data";

import { BrainAction } from "../../brain";
import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

// Creates a "sell piece" action for any piece on the board OR bench.
//
// Hard gates are legality only:
//  - the piece must exist
//  - selling must not drop the player below their level's piece floor
//
// Everything else is expressed as a soft scoring input weighted by personality:
//  - cheap pieces are more sellable (ambition pulls toward selling expensive)
//  - pieces holding a unique trait are less sellable (vision)
//  - pieces with same-definition stage-0 siblings are less sellable (vision)
//  - board pieces are less sellable than bench pieces (composure)
//  - selling is more attractive when money is low (composure pulls panic-sells)
export const createSellPieceAction = (
	board: Board,
	bench: Board,
	pieceRegistry: PieceRegistry,
	state: PlayerState,
	personality: BotPersonality,
	pieceId: PieceModel["id"]
): BrainAction | null => {
	const piece = pieceRegistry.getPieceById(pieceId);

	if (!piece) {
		return null;
	}

	const allBoardPieces = board.getAllPieces();
	const allBenchPieces = bench.getAllPieces();
	const pieceCount = allBoardPieces.length + allBenchPieces.length;

	// Legality: don't sell a piece that would put the player under their level
	// (the auto-fill needs at least `level` pieces to keep the board populated).
	if (pieceCount - 1 < PlayerStateSelectors.getPlayerLevel(state)) {
		return null;
	}

	const isOnBoard = allBoardPieces.some((p) => p.id === pieceId);

	const allPieces = [...allBoardPieces, ...allBenchPieces]
		.map((p) => pieceRegistry.getPieceById(p.id))
		.filter((p): p is PieceModel => p !== null);

	// Trait uniqueness: how many of the piece's traits are *only* held by this
	// piece (i.e. it's the sole representative). 0 means safe to sell, higher
	// means losing it would shrink the trait pool.
	const ownedTraitCounts = new Map<string, number>();
	for (const p of allPieces) {
		for (const t of p.traits) {
			ownedTraitCounts.set(t, (ownedTraitCounts.get(t) ?? 0) + 1);
		}
	}
	const uniqueTraitCount = piece.traits.filter(
		(t) => (ownedTraitCounts.get(t) ?? 0) <= 1
	).length;

	// Same-definition stage-0 siblings (including this piece). 2+ means selling
	// breaks a potential 3-of-a-kind setup.
	const sameDefinitionStage0Count = allPieces.filter(
		(p) => p.definitionId === piece.definitionId && p.stage === 0
	).length;

	const money = PlayerStateSelectors.getPlayerMoney(state);

	return {
		name: `sell piece [${piece.definition.name}]`,
		action: () => PlayerActions.sellPiecePlayerAction({ pieceId: piece.id }),
		value: createUtilityValue([
			{
				// Low money + low composure → panic sell.
				value: money,
				range: [1, 50],
				direction: ScoringDirection.Low,
				weighting: {
					value: personality.composure,
					direction: ScoringDirection.Low,
				},
			},
			{
				// Cheap pieces are more sellable; ambition pulls hardest toward
				// dumping low-cost pieces in favour of (eventually) better ones.
				value: piece.definition.cost,
				range: [1, 5],
				direction: ScoringDirection.Low,
				weighting: {
					value: personality.ambition,
					direction: ScoringDirection.High,
				},
			},
			{
				// Vision protects 3-of-a-kind setups. More siblings = lower
				// sell utility.
				value: sameDefinitionStage0Count,
				range: [1, 3],
				direction: ScoringDirection.Low,
				weighting: {
					value: personality.vision,
					direction: ScoringDirection.High,
				},
			},
			{
				// Vision also protects unique trait carriers — selling a piece
				// that holds the only copy of a trait drops that trait entirely.
				value: uniqueTraitCount,
				range: [0, 3],
				direction: ScoringDirection.Low,
				weighting: {
					value: personality.vision,
					direction: ScoringDirection.High,
				},
			},
			{
				// Board pieces are actively fighting; selling one immediately
				// weakens the team. Composure (plan-stability) protects them.
				// `1` = on board, `0` = on bench.
				value: isOnBoard ? 1 : 0,
				range: [0, 1],
				direction: ScoringDirection.Low,
				weighting: {
					value: personality.composure,
					direction: ScoringDirection.High,
				},
			},
		]),
	};
};

import { createUtilityValue, ScoringDirection } from "@shoki/engine";

import {
	PlayerState,
	PlayerStateSelectors,
	PlayerActions,
} from "@creature-chess/gamemode";
import { PieceModel } from "@creature-chess/models";

import { BotPersonality } from "@cc-server/data";

import { BrainAction } from "../../brain";
import { isStrategicPiece } from "./utils/creatureType";
import { PieceRegistry } from "@creature-chess/utils/piece";
import { Board } from "@creature-chess/board";

export const createSellBoardPieceAction = (
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

	const hasMatchingPieceOnBench = allBenchPieces.some(
		(p) => {
			const other = pieceRegistry.getPieceById(p.id);

			return other?.definitionId === piece.definitionId;
		}
	);

	// to prevent mistakes, bots won't sell a piece if it will put them under their limit
	if (pieceCount - 1 < PlayerStateSelectors.getPlayerLevel(state)) {
		return null;
	}

	const allTraits = [
		...allBoardPieces,
		...allBenchPieces,
	].flatMap((p) => {
		const fullPiece = pieceRegistry.getPieceById(p.id);
		return fullPiece ? fullPiece.traits : [];
	});

	// don't sell piece if it is a strategically sound piece
	if (isStrategicPiece(piece.traits, allTraits)) {
		const betterStrategicPieceOnBench = allBenchPieces.find((benchPiece) => {
			const fullBenchPiece = pieceRegistry.getPieceById(benchPiece.id);

			if (!fullBenchPiece) {
				return false;
			}

			// TODO (James) this doesn't take piece evolution into account
			const isBetter =
				isStrategicPiece(fullBenchPiece.traits, allTraits) &&
				fullBenchPiece.definition.cost > piece.definition.cost;
			return isBetter;
		});

		if (!betterStrategicPieceOnBench) {
			return null;
		}
	}

	// don't sell bench pieces for which we have a piece on the bench
	if (hasMatchingPieceOnBench) {
		return null;
	}

	const money = PlayerStateSelectors.getPlayerMoney(state);

	return {
		name: `sell piece [${piece.definition.name}]`,
		action: () => PlayerActions.sellPiecePlayerAction({ pieceId: piece.id }),
		value: createUtilityValue([
			{
				value: money,
				range: [1, 20],

				// utility score should be higher if money is low
				direction: ScoringDirection.Low,

				// more important with low composure
				weighting: {
					value: personality.composure,
					direction: ScoringDirection.Low,
				},
			},
			{
				value: piece.definition.cost,
				range: [1, 5],

				// utility score should be higher if money is low
				direction: ScoringDirection.Low,

				// more important with high ambition
				weighting: {
					value: personality.ambition,
					direction: ScoringDirection.High,
				},
			},
		]),
	};
};

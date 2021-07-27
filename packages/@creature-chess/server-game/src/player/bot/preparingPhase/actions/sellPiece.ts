import { BoardSelectors } from "@shoki/board";
import { createUtilityValue, ScoringDirection } from "@shoki/engine";
import { PlayerState, PlayerStateSelectors, PlayerActions } from "@creature-chess/gamemode";
import { PieceModel } from "@creature-chess/models";
import { BotPersonality } from "@creature-chess/data";
import { BrainAction } from "../../brain";

export const createSellPieceAction = (state: PlayerState, personality: BotPersonality, piece: PieceModel): BrainAction | null => {
	// to prevent mistakes, bots won't sell a piece if it will put them under their limit
	const pieceCount = PlayerStateSelectors.getAllPieceCount(state);

	if ((pieceCount - 1) < PlayerStateSelectors.getPlayerLevel(state)) {
		return null;
	}

	const boardPieces = BoardSelectors.getAllPieces(state.board);
	const hasMatchingPieceOnBoard = boardPieces.some(p => p.definitionId === piece.definitionId);

	// don't sell bench pieces for which we have a piece on the board
	if (hasMatchingPieceOnBoard) {
		return null;
	}

	const money = PlayerStateSelectors.getPlayerMoney(state);

	return ({
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
					direction: ScoringDirection.Low
				}
			},
			{
				value: piece.definition.cost,
				range: [1, 5],

				// utility score should be higher if money is low
				direction: ScoringDirection.Low,

				// more important with high ambition
				weighting: {
					value: personality.ambition,
					direction: ScoringDirection.High
				}
			}
		])
	});
};

import { BoardSelectors } from "@shoki/board";
import { PlayerState, PlayerStateSelectors, PlayerActions } from "@creature-chess/gamemode";
import { PieceModel } from "@creature-chess/models";
import { BrainAction, BrainActionValue } from "../../brain";

const getValue = (state: PlayerState, piece: PieceModel): BrainActionValue => {
	const boardPieces = BoardSelectors.getAllPieces(state.board);

	const hasMatchingPieceOnBoard = boardPieces.some(p => p.definitionId === piece.definitionId);

	// sell bench pieces that aren't being saved for evolution
	if (!hasMatchingPieceOnBoard) {
		return BrainActionValue.MEDIUM_VALUE;
	}

	return BrainActionValue.USELESS;
};

export const createSellPieceAction = (state: PlayerState, piece: PieceModel): BrainAction | null => {
	// to prevent mistakes, bots won't sell a piece if it will put them under their limit
	const pieceCount = PlayerStateSelectors.getAllPieceCount(state);

	if ((pieceCount - 1) < PlayerStateSelectors.getPlayerLevel(state)) {
		return null;
	}

	return ({
		name: `sell piece [${piece.definition.name}]`,
		action: () => PlayerActions.sellPiecePlayerAction({ pieceId: piece.id }),
		value: getValue(state, piece)
	});
};

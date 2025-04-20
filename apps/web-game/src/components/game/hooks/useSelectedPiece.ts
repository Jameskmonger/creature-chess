import { useSelector } from "react-redux";

import { BoardSelectors } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { AppState } from "../../../store";

export function useSelectedPiece() {
	return useSelector<AppState, PieceModel | null>((state) =>
		state.game.ui.selectedPieceId
			? BoardSelectors.getPiece(
					state.game.board,
					state.game.ui.selectedPieceId
				) ||
				BoardSelectors.getPiece(
					state.game.bench,
					state.game.ui.selectedPieceId
				) ||
				null
			: null
	);
}

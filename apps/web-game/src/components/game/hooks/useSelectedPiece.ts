import { useSelector } from "react-redux";
import { AppState } from "~/store";

import { BoardSelectors } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

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

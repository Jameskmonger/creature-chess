import { useMemo } from "react";

import { useSelector } from "react-redux";
import { AppState } from "~/store";

import { useGameBoards } from "../board/state";

export function useSelectedPiece() {
	const selectedPieceId = useSelector<AppState, string | null>(
		(state) => state.game.ui.selectedPieceId
	);

	const { pieceRegistry } = useGameBoards();

	return useMemo(() => {
		if (!selectedPieceId) {
			return null;
		}

		return pieceRegistry.getPieceById(selectedPieceId);
	}, [selectedPieceId, pieceRegistry]);
}

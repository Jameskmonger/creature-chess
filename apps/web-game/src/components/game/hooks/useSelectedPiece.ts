import { useMemo } from "react";

import { useSelector } from "react-redux";
import { AppState } from "~/store";

import { useGameSession } from "~/game/sessionContext";

export function useSelectedPiece() {
	const selectedPieceId = useSelector<AppState, string | null>(
		(state) => state.game.ui.selectedPieceId
	);

	const { pieceRegistry } = useGameSession();

	return useMemo(() => {
		if (!selectedPieceId) {
			return null;
		}

		return pieceRegistry.getPieceById(selectedPieceId);
	}, [selectedPieceId, pieceRegistry]);
}

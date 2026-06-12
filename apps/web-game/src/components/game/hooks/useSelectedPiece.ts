import { useMemo } from "react";

import { useSelector } from "react-redux";
import { useGameSession } from "~/game/sessionContext";
import { AppState } from "~/store";

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

import { useDispatch, useStore } from "react-redux";
import { AppState } from "~/store";
import { clearSelectedPiece } from "~/store/game/ui";

import { Board, packPosition } from "@creature-chess/board";
import { PlayerPieceLocation } from "@creature-chess/models";

import { GameBoardLocation } from "../GameBoard";
import { resolvePiecePlacement } from "../resolvePiecePlacement";

export const useOnClickTile = (
	board: Board,
	bench: Board,
	{ canClickBoard = true }: { canClickBoard?: boolean } = {}
) => {
	const dispatch = useDispatch();
	const store = useStore<AppState>();

	return ({ location }: { location: GameBoardLocation }) => {
		if (location.locationType === "board" && !canClickBoard) {
			return;
		}

		const selectedPieceId = store.getState().game.ui.selectedPieceId;
		if (!selectedPieceId) {
			return;
		}

		const toY = location.locationType === "board" ? location.y : 0;
		const target: PlayerPieceLocation = {
			type: location.locationType,
			location: packPosition(location.x, toY),
		};

		const result = resolvePiecePlacement(selectedPieceId, target, board, bench);

		// Clicks deliberately don't swap - drag is the swap gesture.
		if (result.kind !== "drop") {
			return;
		}

		dispatch(result.action);
		dispatch(clearSelectedPiece());
	};
};

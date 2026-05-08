import { useDispatch } from "react-redux";
import { clearSelectedPiece } from "~/store/game/ui";

import { Board, packPosition } from "@creature-chess/board";
import { PlayerPieceLocation } from "@creature-chess/models";

import { GameBoardLocation } from "../GameBoard";
import { resolvePiecePlacement } from "../resolvePiecePlacement";

export const useOnDropPiece = (board: Board, bench: Board) => {
	const dispatch = useDispatch();

	return ({ id, location }: { id: string; location: GameBoardLocation }) => {
		const toY = location.locationType === "board" ? location.y : 0;
		const target: PlayerPieceLocation = {
			type: location.locationType,
			location: packPosition(location.x, toY),
		};

		const result = resolvePiecePlacement(id, target, board, bench);

		if (result.kind !== "noop") {
			dispatch(result.action);
		}

		dispatch(clearSelectedPiece());
	};
};

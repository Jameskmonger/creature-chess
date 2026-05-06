import { useDispatch } from "react-redux";
import { clearSelectedPiece } from "~/store/game/ui";

import { Board, packPosition } from "@creature-chess/board";
import { PlayerActions } from "@creature-chess/gamemode";
import { PlayerPieceLocation } from "@creature-chess/models";

import { GameBoardLocation } from "../GameBoard";

export const useOnDropPiece = (board: Board, bench: Board) => {
	const dispatch = useDispatch();

	return ({ id, location }: { id: string; location: GameBoardLocation }) => {
		if (!board) {
			return;
		}

		const toY = location.locationType === "board" ? location.y : 0;
		const to: PlayerPieceLocation = {
			type: location.locationType,
			location: packPosition(location.x, toY),
		};

		const targetBoard = location.locationType === "board" ? board : bench;
		const occupantId = targetBoard.getPieceIdAtPosition(location.x, toY);

		if (occupantId && occupantId !== id) {
			dispatch(
				PlayerActions.swapPiecePlayerAction({
					pieceAId: id,
					pieceBId: occupantId,
				})
			);
		} else {
			dispatch(
				PlayerActions.dropPiecePlayerAction({
					pieceId: id,
					to,
				})
			);
		}

		dispatch(clearSelectedPiece());
	};
};

import { useDispatch } from "react-redux";
import { clearSelectedPiece } from "~/store/game/ui";
import { getLocationForPiece } from "~/utils/getLocationForPiece";

import { PlayerActions } from "@creature-chess/gamemode";
import { PlayerPieceLocation } from "@creature-chess/models";

import { GameBoardLocation } from "../GameBoard";
import { Board, packPosition } from "@creature-chess/board";

export const useOnDropPiece = (
	board: Board,
	bench: Board,
) => {
	const dispatch = useDispatch();

	return ({ id, location }: { id: string; location: GameBoardLocation }) => {
		if (!board) {
			return;
		}

		const from = getLocationForPiece(id, board, bench);

		if (!from) {
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
					pieceALocation: from,
					pieceBId: occupantId,
					pieceBLocation: to,
				})
			);
		} else {
			dispatch(
				PlayerActions.dropPiecePlayerAction({
					pieceId: id,
					from,
					to,
				})
			);
		}

		dispatch(clearSelectedPiece());
	};
};

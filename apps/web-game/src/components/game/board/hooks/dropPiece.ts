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

		const loc: PlayerPieceLocation = {
			type: location.locationType,
			location: packPosition(location.x, (location as any).y || 0),
		};

		// todo `from` is here as a safety check, is it needed?
		dispatch(
			PlayerActions.dropPiecePlayerAction({
				pieceId: id,
				from,
				to: loc,
			})
		);

		dispatch(clearSelectedPiece());
	};
};

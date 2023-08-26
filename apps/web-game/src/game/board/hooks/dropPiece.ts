import { useDispatch } from "react-redux";

import { BoardState } from "@shoki/board";

import { PlayerActions } from "@creature-chess/gamemode";
import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { GameBoardLocation } from "@cc-web/ui";

import { clearSelectedPiece } from "../../ui";
import { getLocationForPiece } from "../getLocationForPiece";

export const useOnDropPiece = (
	board: BoardState<PieceModel> | null,
	bench: BoardState<PieceModel>
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
			location: {
				x: location.x,
				y: (location as any).y || 0,
			},
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

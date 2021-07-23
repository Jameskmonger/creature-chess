import { DragObjectWithType } from "react-dnd";
import { Dispatch } from "redux";
import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { PlayerActions } from "@creature-chess/gamemode";
import { BoardState, BoardSelectors } from "@shoki/board";
import { clearSelectedPiece } from "../../ui/actions";
import { playerClickTileAction } from "./sagas/clickTileSaga";

const getLocationForPiece = (pieceId: string, board: BoardState, bench: BoardState): PlayerPieceLocation | null => {
	if (board) {
		const boardPiecePosition = BoardSelectors.getPiecePosition(board, pieceId);

		if (boardPiecePosition) {
			return {
				type: "board",
				location: boardPiecePosition
			};
		}
	}

	if (bench) {
		const benchPiecePosition = BoardSelectors.getPiecePosition(bench, pieceId);

		if (benchPiecePosition) {
			return {
				type: "bench",
				location: benchPiecePosition
			};
		}
	}

	return null;
};

export const onDropPiece = (dispatch: Dispatch<any>, locationType: "board" | "bench", board: BoardState, bench: BoardState) =>
	(item: DragObjectWithType, x: number, y: number) => {
		const piece: PieceModel = (item as any).piece;
		const from = getLocationForPiece(piece.id, board, bench);

		if (!from) {
			return;
		}

		const location: PlayerPieceLocation = {
			type: locationType,
			location: { x, y }
		};

		// todo `from` is here as a safety check, is it needed?
		dispatch(PlayerActions.dropPiecePlayerAction({
			pieceId: piece.id,
			from,
			to: location
		}));
		dispatch(clearSelectedPiece());
	};

export const onTileClick = (dispatch: Dispatch<any>, locationType: "board" | "bench") =>
	(x: number, y: number) => dispatch(playerClickTileAction({ tile: { type: locationType, location: { x, y } } }));

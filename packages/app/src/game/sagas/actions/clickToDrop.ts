import { take, select, put } from "@redux-saga/core/effects";
import { PlayerActions, getPiece } from "@creature-chess/shared";
import { BoardState, BoardSelectors } from "@creature-chess/board";
import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { AppState } from "../../../store";
import { clearSelectedPiece } from "../../../ui/actions";

const getLocationForPiece = (pieceId: string, board: BoardState, bench: BoardState): PlayerPieceLocation => {
    if (board) {
        const boardPiecePosition = BoardSelectors.getPiecePosition(board, pieceId);

        if (boardPiecePosition) {
            return {
                type: "board",
                location: boardPiecePosition
            }
        }
    }

    if (bench) {
        const benchPiecePosition = BoardSelectors.getPiecePosition(bench, pieceId);

        if (benchPiecePosition !== undefined) {
            return {
                type: "bench",
                location: benchPiecePosition
            }
        }
    }

    return null;
};

export const clickToDrop = function*() {
    while (true) {
        const action: PlayerActions.PlayerClickTileAction = yield take(PlayerActions.PLAYER_CLICK_TILE_ACTION);

        const { tile } = action.payload;

        const piece: PieceModel = yield select((state: AppState) => state.ui.selectedPieceId ? getPiece(state.game, state.ui.selectedPieceId) : null);

        if (!piece) {
            continue;
        }

        let tileEmpty = false;
        const bench: BoardState = yield select((state: AppState) => state.game.bench);
        const board: BoardState = yield select((state: AppState) => state.game.board);

        const piecePositionKey = `${tile.location.x},${tile.location.y}`;

        if (tile.type === "bench") {
            tileEmpty = !bench.piecePositions[piecePositionKey];;
        } else if (tile.type === "board") {
            tileEmpty = !board.piecePositions[piecePositionKey];;
        }

        if (!tileEmpty) {
            continue;
        }

        const from: PlayerPieceLocation = getLocationForPiece(piece.id, board, bench);

        yield put(PlayerActions.playerDropPieceAction(piece.id, from, tile));
        yield put(clearSelectedPiece());
    }
};

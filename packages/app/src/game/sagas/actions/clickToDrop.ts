import { take, select, put } from "@redux-saga/core/effects";
import { PlayerActions, getPiece, BenchState, BoardState, BoardSelectors } from "@creature-chess/shared";
import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { AppState } from "../../../store";
import { clearSelectedPiece } from "../../features/board/actions";

const getLocationForPiece = (pieceId: string, board: BoardState, bench: BenchState): PlayerPieceLocation => {
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
        const benchSlot = bench.pieces.findIndex(p => p !== null && p.id === pieceId);

        if (benchSlot !== undefined) {
            return {
                type: "bench",
                location: { slot: benchSlot }
            }
        }
    }

    return null;
};

export const clickToDrop = function*() {
    while (true) {
        const action: PlayerActions.PlayerClickTileAction = yield take(PlayerActions.PLAYER_CLICK_TILE_ACTION);

        const { tile } = action.payload;

        const piece: PieceModel = yield select((state: AppState) => state.ui.selectedPieceId ? getPiece(state, state.ui.selectedPieceId) : null);

        if (!piece) {
            continue;
        }

        let tileEmpty = false;
        const bench: BenchState = yield select((state: AppState) => state.bench);
        const board: BoardState = yield select((state: AppState) => state.board);

        if (tile.type === "bench") {
            tileEmpty = !bench.pieces[tile.location.slot];
        } else if (tile.type === "board") {
            const piecePositionKey = `${tile.location.x},${tile.location.y}`;

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

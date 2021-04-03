import { take, select, put } from "@redux-saga/core/effects";
import { PlayerActions, getPiece, BenchState, BoardState } from "@creature-chess/shared";
import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { AppState } from "../../../store";
import { clearSelectedPiece } from "../../features/board/actions";

export const clickToDrop = function*() {
    while (true) {
        const action: PlayerActions.PlayerClickTileAction = yield take(PlayerActions.PLAYER_CLICK_TILE_ACTION);

        const { tile } = action.payload;

        const piece: PieceModel = yield select((state: AppState) => state.ui.selectedPieceId ? getPiece(state, state.ui.selectedPieceId) : null);

        if (!piece) {
            continue;
        }

        let tileEmpty = false

        if (tile.type === "bench") {
            const bench: BenchState = yield select((state: AppState) => state.bench);

            tileEmpty = !bench.pieces[tile.location.slot];
        } else if (tile.type === "board") {
            const piecePositionKey = `${tile.location.x},${tile.location.y}`;

            const board: BoardState = yield select((state: AppState) => state.board);

            tileEmpty = !board.piecePositions[piecePositionKey];;
        }

        if (!tileEmpty) {
            continue;
        }

        const from: PlayerPieceLocation = (
            piece.position.y !== null
                ? ({
                    type: "board",
                    location: { x: piece.position.x, y: piece.position.y }
                })
                : ({
                    type: "bench",
                    location: { slot: piece.position.x }
                })
        );

        yield put(PlayerActions.playerDropPieceAction(piece.id, from, tile));
        yield put(clearSelectedPiece());
    }
};

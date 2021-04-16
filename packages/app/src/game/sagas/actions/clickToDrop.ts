import { take, select, put } from "@redux-saga/core/effects";
import { getPiece, PlayerGameActions } from "@creature-chess/gamemode";
import { BoardState, BoardSelectors } from "@creature-chess/board";
import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { AppState } from "../../../store";
import { clearSelectedPiece } from "../../ui/actions";
import { createAction } from "@reduxjs/toolkit";

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

export type PlayerClickTileAction = ReturnType<typeof playerClickTileAction>;
export const playerClickTileAction = createAction<{ tile: PlayerPieceLocation }>("playerClickTileAction");

export const clickToDrop = function*() {
    while (true) {
        const action: PlayerClickTileAction = yield take(playerClickTileAction.toString());

        const { tile } = action.payload;

        const piece: PieceModel = yield select((state: AppState) => state.game.ui.selectedPieceId ? getPiece(state.game, state.game.ui.selectedPieceId) : null);

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

        yield put(PlayerGameActions.dropPiecePlayerAction({
            pieceId: piece.id,
            from,
            to: tile
        }));
        yield put(clearSelectedPiece());
    }
};

import { takeEvery, select, put } from "@redux-saga/core/effects";
import { PlayerState } from "../store";
import { PlayerPieceLocation } from "@creature-chess/models";
import { BoardSelectors } from "@creature-chess/board";
import { getMostExpensiveBenchPiece, getPlayerBelowPieceLimit, isPlayerAlive } from "../playerSelectors";
import { playerDropPieceAction } from "../actions";

const FILL_BOARD_COMMAND = "FILL_BOARD_COMMAND";
type FILL_BOARD_COMMAND = typeof FILL_BOARD_COMMAND;
type FillBoardCommand = ({ type: FILL_BOARD_COMMAND });

export const fillBoardCommand = (): FillBoardCommand => ({ type: FILL_BOARD_COMMAND });

export const fillBoardSagaFactory = <TState extends PlayerState>(playerId: string) => {
    return function*() {
        yield takeEvery<FillBoardCommand>(
            FILL_BOARD_COMMAND,
            function*() {
                const isAlive: boolean = yield select(isPlayerAlive);

                if (!isAlive) {
                    return;
                }

                while (true) {
                    const state: TState = yield select();
                    const belowPieceLimit = getPlayerBelowPieceLimit(state, playerId);

                    if (!belowPieceLimit) {
                        return;
                    }

                    const benchPiece = getMostExpensiveBenchPiece(state);

                    if (!benchPiece) {
                        return;
                    }

                    const destination = BoardSelectors.getFirstEmptySlot(state.board);

                    if (!destination) {
                        return;
                    }

                    const benchPiecePosition = BoardSelectors.getPiecePosition(state.bench, benchPiece.id);

                    const fromLocation: PlayerPieceLocation = {
                        type: "bench",
                        location: benchPiecePosition
                    };

                    const toLocation: PlayerPieceLocation = {
                        type: "board",
                        location: {
                            x: destination.x,
                            y: destination.y
                        }
                    };

                    yield put(playerDropPieceAction(benchPiece.id, fromLocation, toLocation));
                }
            }
        );
    };
};

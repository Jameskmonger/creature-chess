import { takeEvery, select, put } from "@redux-saga/core/effects";
import { PlayerState } from "../store";
import { GamePhaseUpdateAction, GAME_PHASE_UPDATE } from "packages/shared/game/store/actions";
import { GamePhase, PlayerPieceLocation } from "@creature-chess/models";
import { getMostExpensiveBenchPiece, getPlayerBelowPieceLimit, getPlayerFirstEmptyBoardSlot, isPlayerAlive } from "../playerSelectors";
import { playerDropPiece } from "../actions";

export const fillBoardSagaFactory = <TState extends PlayerState>() => {
    return function*() {
        yield takeEvery<GamePhaseUpdateAction>(
            GAME_PHASE_UPDATE,
            function*({ payload: { phase } }) {
                if (phase !== GamePhase.READY) {
                    return;
                }

                const isAlive: boolean = yield select(isPlayerAlive);

                if (!isAlive) {
                    return;
                }

                while (true) {
                    const state: TState = yield select();
                    const belowPieceLimit = getPlayerBelowPieceLimit(state, this.id);

                    if (!belowPieceLimit) {
                        return;
                    }

                    const benchPiece = getMostExpensiveBenchPiece(state);

                    if (!benchPiece) {
                        return;
                    }

                    const destination = getPlayerFirstEmptyBoardSlot(state);

                    if (!destination) {
                        return;
                    }

                    const fromLocation: PlayerPieceLocation = {
                        type: "bench",
                        location: {
                            slot: benchPiece.position.x
                        }
                    };

                    const toLocation: PlayerPieceLocation = {
                        type: "board",
                        location: {
                            x: destination.x,
                            y: destination.y
                        }
                    };

                    yield put(playerDropPiece(benchPiece.id, fromLocation, toLocation));
                }
            }
        );
    };
};

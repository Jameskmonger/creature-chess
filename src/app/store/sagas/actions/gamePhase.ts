import { put, takeEvery, all } from "@redux-saga/core/effects";
import { BoardActions } from "@common/board";
import { GamePhase } from "@common";
import { GAME_PHASE_UPDATE } from "../../actiontypes/gameActionTypes";
import { GamePhaseUpdateAction } from "../../actions/gameActions";
import { startBattle } from "@common/match/combat/battleSaga";

const isGamePhaseUpdate = (phase: GamePhase) =>
    (action: GamePhaseUpdateAction) => action.type === GAME_PHASE_UPDATE && action.payload.phase === phase;

export const gamePhase = function*() {
    yield all([
        yield takeEvery<GamePhaseUpdateAction>(
            [ isGamePhaseUpdate(GamePhase.PREPARING), isGamePhaseUpdate(GamePhase.READY) ],
            function*(action) {
                const pieces = (action.payload as any).payload.pieces;

                yield put(BoardActions.piecesUpdated(pieces));
            }
        ),
        yield takeEvery<GamePhaseUpdateAction>(
            isGamePhaseUpdate(GamePhase.PLAYING),
            function*() {
                yield put(startBattle());
            }
        )
    ]);
};

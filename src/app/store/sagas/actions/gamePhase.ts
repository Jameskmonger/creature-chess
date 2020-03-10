import { put, takeEvery, all } from "@redux-saga/core/effects";
import { BoardActions, BenchActions } from "@common/board";
import { GamePhase } from "@common";
import { GAME_PHASE_UPDATE } from "../../actiontypes/gameActionTypes";
import { GamePhaseUpdateAction } from "../../actions/gameActions";
import { startBattle } from "@common/match/combat/battleSaga";
import { LockEvolutionActions } from "@common/board";
import { cardsUpdated } from "../../../features/cardShop/cardActions";

const isGamePhaseUpdate = (phase: GamePhase) =>
    (action: GamePhaseUpdateAction) => action.type === GAME_PHASE_UPDATE && action.payload.phase === phase;

export const gamePhase = function*() {
    yield all([
        yield takeEvery<GamePhaseUpdateAction>(
            isGamePhaseUpdate(GamePhase.PREPARING),
            function*(action) {
                const payload = (action.payload as any).payload;

                yield put(BoardActions.piecesUpdated(payload.pieces));
                yield put(BenchActions.benchPiecesUpdated(payload.bench));
                yield put(cardsUpdated(payload.cards));
                yield put(LockEvolutionActions.unlockEvolutionAction());
            }
        ),
        yield takeEvery<GamePhaseUpdateAction>(
            isGamePhaseUpdate(GamePhase.READY),
            function*(action) {
                const pieces = (action.payload as any).payload.pieces;

                yield put(BoardActions.piecesUpdated(pieces));
                yield put(LockEvolutionActions.lockEvolutionAction());
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

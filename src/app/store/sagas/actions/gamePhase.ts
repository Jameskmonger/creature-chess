import { put, takeEvery, all, select } from "@redux-saga/core/effects";
import { BoardActions } from "@common/board";
import { GamePhase } from "@common/models";
import { GAME_PHASE_UPDATE } from "../../actiontypes/gameActionTypes";
import { GamePhaseUpdateAction, clearSelectedPiece } from "../../actions/gameActions";
import { startBattle } from "@common/match/combat/battleSaga";
import { cardsUpdated } from "../../../features/cardShop/cardActions";
import { PreparingPhaseUpdatePacket, ReadyPhaseUpdatePacket } from "@common/networking/server-to-client";
import { unlockBench, initialiseBench } from "@common/player/bench/benchActions";
import { unlockBoard, lockBoard, initialiseBoard } from "@common/board/actions/boardActions";
import { AppState } from "../../state";
import { getPiece } from "@common/player/pieceSelectors";
import { openOverlay, closeOverlay } from "@app/store/actions/uiActions";
import { Overlay } from "@app/overlay";

const isGamePhaseUpdate = (phase: GamePhase) =>
    (action: GamePhaseUpdateAction) => action.type === GAME_PHASE_UPDATE && action.payload.phase === phase;

export const gamePhase = function*() {
    yield all([
        yield takeEvery<GamePhaseUpdateAction>(
            isGamePhaseUpdate(GamePhase.PREPARING),
            function*(action) {
                const { payload } = (action.payload as PreparingPhaseUpdatePacket);

                yield put(initialiseBoard(payload.pieces.board.pieces));
                yield put(initialiseBench(payload.pieces.bench));
                yield put(cardsUpdated(payload.cards));
                yield put(unlockBoard());
                yield put(openOverlay(Overlay.SHOP));
            }
        ),
        yield takeEvery<GamePhaseUpdateAction>(
            isGamePhaseUpdate(GamePhase.READY),
            function*(action) {
                const { payload } = (action.payload as ReadyPhaseUpdatePacket);

                yield put(initialiseBoard(payload.board.pieces));
                yield put(lockBoard());
                yield put(closeOverlay());

                const state: AppState = yield select();

                const selectedPiece = getPiece(state, state.game.selectedPieceId);

                if (selectedPiece && selectedPiece.position.y !== null) {
                    yield put(clearSelectedPiece());
                }
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

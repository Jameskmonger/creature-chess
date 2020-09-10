import { put, takeEvery, all, select } from "@redux-saga/core/effects";
import { GamePhase } from "@creature-chess/shared/models";
import { clearSelectedPiece } from "../../actions/gameActions";
import { startBattle } from "@creature-chess/shared/match/combat/battleSaga";
import { PreparingPhaseUpdatePacket, ReadyPhaseUpdatePacket } from "@creature-chess/shared/networking/server-to-client";
import { initialiseBench } from "@creature-chess/shared/player/bench/benchActions";
import { unlockBoard, lockBoard, initialiseBoard } from "@creature-chess/shared/board/actions/boardActions";
import { AppState } from "../../state";
import { getPiece } from "@creature-chess/shared/player/pieceSelectors";
import { openOverlay, closeOverlay } from "../../../store/actions/uiActions";
import { Overlay } from "../../../overlay";
import { GamePhaseUpdateAction, GAME_PHASE_UPDATE } from "@creature-chess/shared/player/gameInfo";
import { cardsUpdated } from "@creature-chess/shared/player/cardShop";

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
                yield put(initialiseBench(payload.bench));
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

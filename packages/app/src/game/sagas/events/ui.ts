import { takeLatest, put, select } from "@redux-saga/core/effects";
import { GamePhase } from "@creature-chess/models";
import { clearSelectedPiece, openOverlay, closeOverlay, Overlay } from "../../../ui";
import { gameRoundUpdateEvent, GameRoundUpdateEvent } from "./roundUpdate";
import { AppState } from "../../../store";

export const uiSaga = function*() {
    yield takeLatest<GameRoundUpdateEvent>(
        gameRoundUpdateEvent.toString(),
        function*({ payload: { phase } }) {
            switch (phase) {
                case GamePhase.PREPARING: {
                    const isDead: boolean = yield select((state: AppState) => state.game.playerInfo.health === 0);

                    if (!isDead) {
                        yield put(openOverlay(Overlay.SHOP));
                        return;
                    }
                }

                case GamePhase.READY: {
                    yield put(closeOverlay());
                    yield put(clearSelectedPiece());
                    return;
                }
                default:
                    return;
            }
        }
    )
}

import { takeLatest, put, select } from "redux-saga/effects";
import { AppState } from "~/store";
import {
	clearSelectedPiece,
	openOverlay,
	closeOverlay,
	Overlay,
} from "~/store/game/ui";

import { GameEvents } from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";

export const uiSaga = function* () {
	yield takeLatest<GameEvents.GamePhaseStartedEvent>(
		GameEvents.gamePhaseStartedEvent.toString(),
		function* ({ payload: { phase } }) {
			switch (phase) {
				case GamePhase.PREPARING: {
					const isDead: boolean = yield select(
						(state: AppState) => state.game.playerInfo.health === 0
					);

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
	);
};

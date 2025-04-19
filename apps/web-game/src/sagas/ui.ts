import { takeLatest, put, select, all } from "redux-saga/effects";

import { GameEvents } from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";

import { AppState } from "../store";
import { PlayerListCommands } from "../store/game/playerList/state";
import {
	clearSelectedPiece,
	openOverlay,
	closeOverlay,
	Overlay,
} from "../store/game/ui";

export const uiSaga = function* () {
	yield all([
		takeLatest<GameEvents.GamePhaseStartedEvent>(
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
		),
		// todo get rid of this event and just sync the command
		takeLatest<GameEvents.PlayerListChangedEvent>(
			GameEvents.playerListChangedEvent.toString(),
			function* ({ payload: { players } }) {
				yield put(PlayerListCommands.updatePlayerListCommand(players));
			}
		),
	]);
};

import { put, takeLatest } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { getDependency } from "@shoki/engine";
import { PlayerSagaDependencies } from "../../../../player/sagaContext";
import { setSpectatingIdCommand } from "../../state/spectating";
import { PlayerSelectors } from "../../../../player";

export type SpectatePlayerAction = ReturnType<typeof spectatePlayerAction>;
export const spectatePlayerAction = createAction<{ playerId: string | null }, "spectatePlayerAction">("spectatePlayerAction");

export const spectatePlayerActionSaga = function*() {
	yield takeLatest<SpectatePlayerAction>(
		spectatePlayerAction.toString(),
		function*({ payload: { playerId } }) {
			if (playerId === null) {
				yield put(setSpectatingIdCommand(null));
				return;
			}

			const game = yield* getDependency<PlayerSagaDependencies, "game">("game");

			const other = game.getPlayerById(playerId);

			if (!other || !other.select(PlayerSelectors.isPlayerAlive)) {
				return;
			}

			yield put(setSpectatingIdCommand(playerId));
		}
	);
};

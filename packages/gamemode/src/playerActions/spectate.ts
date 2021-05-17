import { put, takeLatest } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { getDependency } from "@shoki/engine";
import { setSpectatingIdCommand } from "../entities/player/state/spectating";
import { PlayerEntityDependencies } from "../entities/player";
import { isPlayerAlive } from "../entities/player/state/selectors";

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

			const game = yield* getDependency<PlayerEntityDependencies, "game">("game");

			const other = game.getPlayerById(playerId);

			if (!other || !other.select(isPlayerAlive)) {
				return;
			}

			yield put(setSpectatingIdCommand(playerId));
		}
	);
};

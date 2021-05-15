import { takeLatest } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import { getDependency } from "@shoki/engine";
import { PlayerSagaDependencies } from "../../../../player/sagaContext";

export type SpectatePlayerAction = ReturnType<typeof spectatePlayerAction>;
export const spectatePlayerAction = createAction<{ playerId: string | null }, "spectatePlayerAction">("spectatePlayerAction");

export const spectatePlayerActionSaga = function*() {
	yield takeLatest<SpectatePlayerAction>(
		spectatePlayerAction.toString(),
		function*({ payload: { playerId } }) {
			const game = yield* getDependency<PlayerSagaDependencies, "game">("game");


		}
	);
};

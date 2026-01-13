import { call } from "redux-saga/effects";

import { Entity, entityFactory } from "@shoki/engine";

import { roundInfoReducer } from "../../game/roundInfo";
import { PlayerEntityDependencies } from "./dependencies";
import { playerRootSaga } from "./sagas/root";
import { PlayerState, playerReducers } from "./state";
import { PlayerVariables } from "./variables";

export const playerEntity = entityFactory<
	PlayerState,
	PlayerEntityDependencies,
	PlayerVariables
>({
	reducers: {
		...playerReducers,
		roundInfo: roundInfoReducer,
	},
	*rootSaga() {
		yield call(playerRootSaga);
	},
});

export type PlayerEntity = Entity<PlayerState, PlayerEntityDependencies, PlayerVariables>;

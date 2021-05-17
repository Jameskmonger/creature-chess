import { all, call } from "redux-saga/effects";
import { Entity, entityFactory } from "@shoki/engine";
import { roundInfoReducer } from "../../game/roundInfo";
import { playerInfoReducer } from "../../player/playerInfo";

import { PlayerState, playerReducers } from "./state";

import { playerActionsSaga } from "../../playerActions/saga";
import { evolutionSaga } from "./sagas/evolution";
import { playerPhases } from "./sagas/phases";
import { setStatusOnQuit } from "./sagas/setStatusOnQuit";
import { featuresRootSaga } from "../../features";
import { playerBattle } from "./sagas/battle";
import { playerXpSaga } from "./sagas/xp";
import { fillBoard } from "./sagas/fillBoard";
import { healthSaga } from "./sagas/health";
import { PlayerVariables } from "./variables";
import { PlayerEntityDependencies } from "./dependencies";

export const playerEntity = entityFactory<PlayerState, PlayerEntityDependencies, PlayerVariables>(
	({ boardSlices }) => ({
		reducers: {
			...playerReducers,
			board: boardSlices.boardSlice.boardReducer,
			bench: boardSlices.benchSlice.boardReducer,
			playerInfo: playerInfoReducer,
			roundInfo: roundInfoReducer,
		},
		*rootSaga() {
			yield all([
				call(playerPhases),
				call(playerActionsSaga),
				call(evolutionSaga),
				call(healthSaga),
				call(playerXpSaga),
				call(fillBoard),
				call(setStatusOnQuit),
				call(playerBattle),
				call(featuresRootSaga)
			]);
		}
	})
);

export type PlayerEntity = Entity<PlayerState, PlayerVariables>;

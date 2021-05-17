import { call } from "redux-saga/effects";
import { Entity, entityFactory } from "@shoki/engine";
import { roundInfoReducer } from "../../game/roundInfo";
import { playerInfoReducer } from "../../player/playerInfo";

import { PlayerState, playerReducers } from "./state";

import { PlayerVariables } from "./variables";
import { PlayerEntityDependencies } from "./dependencies";
import { playerRootSaga } from "./sagas/root";

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
			yield call(playerRootSaga);
		}
	})
);

export type PlayerEntity = Entity<PlayerState, PlayerVariables>;

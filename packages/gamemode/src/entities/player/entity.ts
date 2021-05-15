import { Entity, entityFactory } from "@shoki/engine";
import { all, call } from "redux-saga/effects";
import { roundInfoReducer } from "../../game";
import { PlayerVariables } from "../../player";
import { cardShopReducer } from "../../player/cardShop";
import { playerInfoReducer } from "../../player/playerInfo";
import { PlayerSagaDependencies } from "../../player/sagaContext";
import { PlayerState } from "./state";

import { playerGameActionsSaga } from "./sagas/playerGameActions";
import { evolutionSaga } from "./sagas/evolution";
import { playerPhases } from "./sagas/phases";
import { setStatusOnQuit } from "./sagas/setStatusOnQuit";
import { featuresRootSaga } from "../../features";
import { playerBattle } from "./sagas/battle";
import { playerXpSaga } from "./sagas/xp";
import { fillBoard } from "./sagas/fillBoard";
import { healthSaga } from "./sagas/health";

export const playerEntity = entityFactory<PlayerState, PlayerSagaDependencies, PlayerVariables>(
	({ boardSlices }) => ({
		reducers: {
			board: boardSlices.boardSlice.boardReducer,
			bench: boardSlices.benchSlice.boardReducer,
			playerInfo: playerInfoReducer,
			roundInfo: roundInfoReducer,
			cardShop: cardShopReducer
		},
		*rootSaga() {
			yield all([
				call(playerPhases),
				call(playerGameActionsSaga),
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

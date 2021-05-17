import { all, call, take, put } from "redux-saga/effects";

import { playerActionsSaga } from "../../../playerActions/saga";
import { evolutionSaga } from "./evolution";
import { playerPhases } from "./phases";
import { setStatusOnQuit } from "./setStatusOnQuit";
import { featuresRootSaga } from "../../../features";
import { playerBattle } from "./battle";
import { playerXpSaga } from "./xp";
import { fillBoard } from "./fillBoard";
import { healthSaga } from "./health";

export const playerRootSaga = function*() {
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
};

import { all, call, take, put } from "redux-saga/effects";

import { featuresRootSaga } from "../../../features";
import { playerActionsSaga } from "../../../playerActions/saga";
import { playerBattle } from "./battle";
import { evolutionSaga } from "./evolution";
import { fillBoard } from "./fillBoard";
import { healthSaga } from "./health";
import { playerPhases } from "./phases";
import { setStatusOnQuit } from "./setStatusOnQuit";
import { playerXpSaga } from "./xp";

export const playerRootSaga = function* () {
	yield all([
		call(playerPhases),
		call(playerActionsSaga),
		call(evolutionSaga),
		call(healthSaga),
		call(playerXpSaga),
		call(fillBoard),
		call(setStatusOnQuit),
		call(playerBattle),
		call(featuresRootSaga),
	]);
};

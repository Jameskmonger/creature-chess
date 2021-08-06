import { all, call } from "redux-saga/effects";
import { runScenarioSaga } from "../inputs/saga";

export const devSaga = function*() {
	yield all([
		call(runScenarioSaga)
	]);
};

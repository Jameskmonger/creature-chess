import { all, call } from "redux-saga/effects";
import { clientFinishMatch } from "./clientFinishMatch";
import { updateMatchVariable } from "./updateMatchVariable";

export const rootSaga = function*() {
	yield all([
		call(updateMatchVariable),
		call(clientFinishMatch)
	]);
};

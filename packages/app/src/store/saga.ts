import { all, call } from "redux-saga/effects";
import { findGame } from "../networking";
import { gameSaga } from "../game";

export const rootSaga = function*() {
	yield all([
		call(findGame),
		call(gameSaga)
	]);
};

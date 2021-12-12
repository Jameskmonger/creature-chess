import { all, call } from "redux-saga/effects";
import { gameSaga } from "../game";
import { connect } from "../networking";

export const rootSaga = function*() {
	yield all([
		call(connect),
		call(gameSaga)
	]);
};

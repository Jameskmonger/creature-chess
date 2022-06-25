import { all, call } from "redux-saga/effects";

import { gameSaga } from "../game";
import { networkingSaga } from "../networking";

export const rootSaga = function* () {
	yield all([call(networkingSaga), call(gameSaga)]);
};

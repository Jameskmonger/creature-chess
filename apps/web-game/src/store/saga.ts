import { call } from "redux-saga/effects";

import { networkingSaga } from "../networking";

export const rootSaga = function* () {
	yield call(networkingSaga);
};

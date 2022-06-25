import { all, call } from "redux-saga/effects";

import {
	matchRootSaga,
	MatchPlayerVariables,
	defaultMatchPlayerVariables,
} from "./match";

export const featuresRootSaga = function* () {
	yield all([call(matchRootSaga)]);
};

export type FeaturesPlayerVariables = MatchPlayerVariables;

export const defaultFeaturesPlayerVariables = (): FeaturesPlayerVariables => ({
	...defaultMatchPlayerVariables(),
});

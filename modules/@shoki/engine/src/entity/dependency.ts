import { getContext } from "redux-saga/effects";

export const getDependency = function* <
	TDependencies,
	TKey extends keyof TDependencies
>(key: TKey) {
	const dependencies: TDependencies = yield getContext("dependencies");

	return dependencies[key];
};

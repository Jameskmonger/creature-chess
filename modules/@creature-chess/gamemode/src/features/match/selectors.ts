import { all, SagaGenerator } from "typed-redux-saga";

import { getVariable } from "@shoki/engine";

import { PlayerEntity } from "../../entities";
import { Match } from "../../game/match";
import { PlayerVariables } from "./playerVariables";

export const getMatch = () =>
	getVariable<PlayerVariables, Match>((variables) => variables.match!);

export const getMatches = function* (players: PlayerEntity[]) {
	const promises = players.map((p) =>
		p
			.runSaga(function* () {
				return yield* getMatch();
			})
			.toPromise<Match>()
	);

	return yield* all(promises) as SagaGenerator<Match[]>;
};

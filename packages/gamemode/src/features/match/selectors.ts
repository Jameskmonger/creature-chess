import { all, SagaGenerator } from "typed-redux-saga";
import { Match } from "../../game/match";
import { Player } from "../../player";
import { getPlayerVariable } from "../../player/variablesStore";
import { PlayerVariables } from "./playerVariables";

export const getMatch = () => getPlayerVariable<PlayerVariables, Match>(variables => variables.match!);

export const getMatches = function*(players: Player[]) {
	const promises = players.map(
		p => p.runSaga(function*() {
			return yield* getMatch();
		}).toPromise<Match>()
	);

	return yield* (all(promises) as SagaGenerator<Match[]>);
};

import { all, takeLatest, put, call } from "redux-saga/effects";
import { select } from "typed-redux-saga";

import { finishedBattle, inProgressBattle } from "@creature-chess/models/game/playerList";
import { playerFinishMatchEvent, PlayerFinishMatchEvent } from "../events";
import {
	updateBattleCommand,
	UpdateOpponentCommand,
	updateOpponentCommand,
} from "../state/commands";
import { getOpponentId } from "../state/selectors";
import { playerMatchRewards } from "./matchRewards";

export const playerBattle = function*() {
	yield all([
		takeLatest<UpdateOpponentCommand>(
			updateOpponentCommand,
			function*({ payload: opponentId }) {
				// todo make this listen to a playerStartMatchEvent
				if (opponentId) {
					yield put(updateBattleCommand(inProgressBattle(opponentId)));
				}
			}
		),
		takeLatest<PlayerFinishMatchEvent>(
			playerFinishMatchEvent.toString(),
			function*({ payload: { isHomePlayer, homeScore, awayScore } }) {
				const opponentId = yield* select(getOpponentId);

				yield put(
					updateBattleCommand(
						finishedBattle(opponentId!, isHomePlayer, homeScore, awayScore)
					)
				);
			}
		),
		call(playerMatchRewards),
	]);
};

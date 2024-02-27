import { all, put, call } from "redux-saga/effects";
import { takeLatest, select } from "typed-redux-saga";

import {
	finishedBattle,
	inProgressBattle,
} from "@creature-chess/models/game/playerList";

import { playerFinishMatchEvent, PlayerFinishMatchEvent } from "../events";
import { playerInfoCommands } from "../state/commands";
import { getOpponentId } from "../state/selectors";
import { playerMatchRewards } from "./matchRewards";

export const playerBattle = function* () {
	yield all([
		takeLatest(
			playerInfoCommands.updateOpponentCommand,
			function* ({ payload: opponentId }) {
				// todo make this listen to a playerStartMatchEvent
				if (opponentId) {
					yield put(
						playerInfoCommands.updateBattleCommand(inProgressBattle(opponentId))
					);
				}
			}
		),
		takeLatest<PlayerFinishMatchEvent>(
			playerFinishMatchEvent,
			function* ({ payload: { isHomePlayer, homeScore, awayScore } }) {
				const opponentId = yield* select<typeof getOpponentId>(getOpponentId);

				yield put(
					playerInfoCommands.updateBattleCommand(
						finishedBattle(opponentId!, isHomePlayer, homeScore, awayScore)
					)
				);
			}
		),
		call(playerMatchRewards),
	]);
};

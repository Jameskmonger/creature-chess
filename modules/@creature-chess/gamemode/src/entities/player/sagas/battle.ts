import { all, put, call } from "redux-saga/effects";
import { takeLatest, select } from "typed-redux-saga";

import {
	finishedBattle,
	inProgressBattle,
} from "@creature-chess/models/game/playerList";

import { playerFinishMatchEvent, PlayerFinishMatchEvent } from "../events";
import { playerInfoCommands } from "../state/commands";
import { getOpponentId, getOpponentIsClone } from "../state/selectors";
import { playerMatchRewards } from "./matchRewards";

export const playerBattle = function* () {
	yield all([
		takeLatest(
			playerInfoCommands.updateOpponentCommand,
			function* ({ payload: { id, isClone } }) {
				// todo make this listen to a playerStartMatchEvent
				if (id) {
					yield put(
						playerInfoCommands.updateBattleCommand(
							inProgressBattle(id, isClone ?? false)
						)
					);
				}
			}
		),
		takeLatest<PlayerFinishMatchEvent>(
			playerFinishMatchEvent,
			function* ({ payload: { isHomePlayer, homeScore, awayScore } }) {
				const opponentId = yield* select<typeof getOpponentId>(getOpponentId);
				const opponentIsClone =
					yield* select<typeof getOpponentIsClone>(getOpponentIsClone);

				yield put(
					playerInfoCommands.updateBattleCommand(
						finishedBattle(
							opponentId!,
							opponentIsClone,
							isHomePlayer,
							homeScore,
							awayScore
						)
					)
				);
			}
		),
		call(playerMatchRewards),
	]);
};

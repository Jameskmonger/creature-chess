import { all, takeLatest, put, call } from "redux-saga/effects";
import { select } from "typed-redux-saga";
import { finishedBattle, inProgressBattle } from "@creature-chess/models";

import { playerFinishMatchEvent, PlayerFinishMatchEvent } from "../../../game/events";
import { PlayerInfoCommands } from "../../../player/playerInfo";
import { playerMatchRewards } from "./matchRewards";
import { getOpponentId } from "../../../player/playerSelectors";

export const playerBattle = function*() {
	yield all([
		takeLatest<PlayerInfoCommands.UpdateOpponentCommand>(
			PlayerInfoCommands.updateOpponentCommand,
			function*({ payload: opponentId }) {
				// todo make this listen to a playerStartMatchEvent
				if (opponentId) {
					yield put(PlayerInfoCommands.updateBattleCommand(inProgressBattle(opponentId)));
				}
			}
		),
		takeLatest<PlayerFinishMatchEvent>(
			playerFinishMatchEvent.toString(),
			function*({ payload: { isHomePlayer, homeScore, awayScore } }) {
				const opponentId = yield* select(getOpponentId);

				yield put(PlayerInfoCommands.updateBattleCommand(finishedBattle(opponentId!, isHomePlayer, homeScore, awayScore)));
			}
		),
		call(playerMatchRewards)
	]);
};

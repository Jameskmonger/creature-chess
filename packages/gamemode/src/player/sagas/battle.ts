import { all, takeLatest, put, fork } from "@redux-saga/core/effects";
import { select } from "typed-redux-saga";
import { finishedBattle, inProgressBattle } from "@creature-chess/models";

import { playerFinishMatchEvent, PlayerFinishMatchEvent } from "../../game/events";
import { HasPlayerInfo, PlayerInfoCommands } from "../playerInfo";
import { playerMatchRewards } from "./matchRewards";
import { clientFinishMatch } from "./clientFinishMatch";

export const playerBattle = function*() {
	yield all([
		takeLatest<PlayerInfoCommands.UpdateOpponentCommand>(
			PlayerInfoCommands.UPDATE_OPPONENT_COMMAND,
			function*({ payload: { opponentId } }) {
				yield put(PlayerInfoCommands.updateBattleCommand(inProgressBattle(opponentId)));
			}
		),
		takeLatest<PlayerFinishMatchEvent>(
			playerFinishMatchEvent.toString(),
			function*({ payload: { homeScore, awayScore } }) {
				const opponentId = yield* select((state: HasPlayerInfo) => state.playerInfo.opponentId);

				yield put(PlayerInfoCommands.updateBattleCommand(finishedBattle(opponentId!, homeScore, awayScore)));
			}
		),
		fork(playerMatchRewards),
		fork(clientFinishMatch)
	]);
};

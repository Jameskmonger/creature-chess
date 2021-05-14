import { all, takeLatest, put, call } from "redux-saga/effects";
import { select, getContext } from "typed-redux-saga";
import { finishedBattle, inProgressBattle } from "@creature-chess/models";

import { playerFinishMatchEvent, PlayerFinishMatchEvent } from "../../game/events";
import { HasPlayerInfo, PlayerInfoCommands } from "../playerInfo";
import { playerMatchRewards } from "./matchRewards";

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
			function*({ payload: { isHomePlayer, homeScore, awayScore } }) {
				const opponentId = yield* select((state: HasPlayerInfo) => state.playerInfo.opponentId);

				yield put(PlayerInfoCommands.updateBattleCommand(finishedBattle(opponentId!, isHomePlayer, homeScore, awayScore)));
			}
		),
		call(playerMatchRewards)
	]);
};

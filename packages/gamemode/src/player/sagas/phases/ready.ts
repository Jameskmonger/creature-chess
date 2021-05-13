import { put, takeEvery } from "redux-saga/effects";
import { getContext } from "typed-redux-saga";
import { playerRunReadyPhaseEvent, PlayerRunReadyPhaseEvent } from "../../../game/events";
import { PlayerInfoCommands } from "../../playerInfo";
import { PlayerBoardSlices } from "../../sagaContext";
import { fillBoardCommand } from "../fillBoard";

export const playerReadyPhase = function*() {
	const playerId = yield* getContext<string>("playerId");
	const { boardSlice } = yield* getContext<PlayerBoardSlices>("boardSlices");

	yield takeEvery<PlayerRunReadyPhaseEvent>(
		playerRunReadyPhaseEvent.toString(),
		function*({ payload: { match } }) {
			yield put(fillBoardCommand());

			yield put(boardSlice.commands.lockBoardCommand());

			const opponentId = match.home.id === playerId
				? match.away.id
				: match.home.id;

			yield put(PlayerInfoCommands.updateOpponentCommand(opponentId));
		}
	);
};

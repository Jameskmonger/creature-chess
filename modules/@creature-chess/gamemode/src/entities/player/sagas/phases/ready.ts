import { put, takeEvery } from "redux-saga/effects";
import { getContext } from "typed-redux-saga";

import {
	playerBeforeReadyPhaseEvent,
	playerRunReadyPhaseEvent,
	PlayerRunReadyPhaseEvent,
} from "../../../../game/events";
import { getBoardSlice } from "../../selectors";
import { playerInfoCommands } from "../../state/commands";
import { fillBoardCommand } from "../fillBoard";

export const playerReadyPhase = function* () {
	const playerId = yield* getContext<string>("id");
	const boardSlice = yield* getBoardSlice();

	yield takeEvery<PlayerRunReadyPhaseEvent>(
		playerBeforeReadyPhaseEvent.toString(),
		function* () {
			yield put(fillBoardCommand());
			yield put(playerInfoCommands.updateReadyCommand(false));
		}
	);

	yield takeEvery<PlayerRunReadyPhaseEvent>(
		playerRunReadyPhaseEvent.toString(),
		function* ({ payload: { match } }) {
			yield put(boardSlice.commands.lockBoardCommand());

			if (match.home.id === playerId) {
				yield put(
					playerInfoCommands.updateOpponentCommand({
						id: match.away.id,
						isClone: match.awayIsClone,
					})
				);
			} else {
				yield put(
					playerInfoCommands.updateOpponentCommand({
						id: match.home.id,
						isClone: false,
					})
				);
			}
		}
	);
};

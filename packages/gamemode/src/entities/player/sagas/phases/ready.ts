import { put, takeEvery } from "redux-saga/effects";
import { getContext } from "typed-redux-saga";
import { playerBeforeReadyPhaseEvent, playerRunReadyPhaseEvent, PlayerRunReadyPhaseEvent } from "../../../../game/events";
import { updateReadyCommand, updateOpponentCommand } from "../../state/commands";
import { getBoardSlice } from "../../selectors";
import { fillBoardCommand } from "../fillBoard";

export const playerReadyPhase = function*() {
	const playerId = yield* getContext<string>("id");
	const boardSlice = yield* getBoardSlice();

	yield takeEvery<PlayerRunReadyPhaseEvent>(
		playerBeforeReadyPhaseEvent.toString(),
		function*() {
			yield put(fillBoardCommand());
			yield put(updateReadyCommand(false));
		}
	);

	yield takeEvery<PlayerRunReadyPhaseEvent>(
		playerRunReadyPhaseEvent.toString(),
		function*({ payload: { match } }) {
			yield put(boardSlice.commands.lockBoardCommand());

			const opponentId = match.home.id === playerId
				? match.away.id
				: match.home.id;

			yield put(updateOpponentCommand(opponentId));
		}
	);
};

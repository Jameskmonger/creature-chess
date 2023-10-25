import { take, put } from "redux-saga/effects";
import { select } from "typed-redux-saga";

import { GamePhase } from "@creature-chess/models";

import { getXpToNextLevel } from "../../../player/xp";
import { getPlayerEntityDependencies } from "../dependencies";
import { PlayerState } from "../state";
import { updateLevelCommand } from "../state/commands";
import { getPlayerLevel, getPlayerXp } from "../state/selectors";

const ADD_XP_COMMAND = "ADD_XP_COMMAND";
type ADD_XP_COMMAND = typeof ADD_XP_COMMAND;
type AddXpCommand = { type: ADD_XP_COMMAND; payload: { amount: number } };
export const addXpCommand = (amount: number): AddXpCommand => ({
	type: ADD_XP_COMMAND,
	payload: { amount },
});

export const playerXpSaga = function* () {
	const {
		boardSlices: { boardSlice, benchSlice },
	} = yield* getPlayerEntityDependencies();

	while (true) {
		const {
			payload: { amount },
		}: AddXpCommand = yield take(ADD_XP_COMMAND);
		let level = yield* select(getPlayerLevel);
		let xp = yield* select(getPlayerXp);

		const oldLevel = level;

		for (let i = 0; i < amount; i++) {
			const toNextLevel = getXpToNextLevel(level);
			const newXp = xp + 1;

			if (newXp === toNextLevel) {
				xp = 0;
				level++;
			} else {
				xp = newXp;
			}
		}

		yield put(updateLevelCommand({ level, xp }));

		if (level !== oldLevel) {
			const inPreparingPhase: boolean = yield select(
				(state: PlayerState) => state.roundInfo.phase === GamePhase.PREPARING
			);

			if (inPreparingPhase) {
				yield put(boardSlice.commands.setPieceLimitCommand(level));
			}
		}
	}
};

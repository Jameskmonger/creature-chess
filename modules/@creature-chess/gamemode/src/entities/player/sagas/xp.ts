import { take, put } from "redux-saga/effects";
import { select } from "typed-redux-saga";


import { getXpToNextLevel } from "../../../player/xp";
import { playerInfoCommands } from "../state/commands";
import { getPlayerLevel, getPlayerXp } from "../state/selectors";

const ADD_XP_COMMAND = "ADD_XP_COMMAND";
type ADD_XP_COMMAND = typeof ADD_XP_COMMAND;
type AddXpCommand = { type: ADD_XP_COMMAND; payload: { amount: number } };
export const addXpCommand = (amount: number): AddXpCommand => ({
	type: ADD_XP_COMMAND,
	payload: { amount },
});

export const playerXpSaga = function*() {
	while (true) {
		const {
			payload: { amount },
		}: AddXpCommand = yield take(ADD_XP_COMMAND);
		let level = yield* select(getPlayerLevel);
		let xp = yield* select(getPlayerXp);

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

		yield put(playerInfoCommands.updateLevelCommand({ level, xp }));
	}
};

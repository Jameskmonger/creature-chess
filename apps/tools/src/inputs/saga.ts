import { put, call, take } from "@redux-saga/core/effects";
import { all } from "redux-saga/effects";
import { PlayerCommands } from "@creature-chess/gamemode";
import { botInfoActions } from "../store/botInfo";
import { runScenarioEvent } from "../store/events";

export const runScenarioSaga = function*() {
	while (true) {
		const action = yield take(runScenarioEvent.toString());

		const {
			health,
			money,
			xp,
			level,
			streakType,
			streakAmount,
			ambition,
			competency,
			composure,
			vision
		} = action.payload;

		yield all([
			put(PlayerCommands.updateMoneyCommand(money)),
			put(PlayerCommands.updateHealthCommand(health)),
			put(PlayerCommands.updateLevelCommand({ level, xp })),
			put(PlayerCommands.updateStreakCommand({ type: streakType, amount: streakAmount })),
			put(botInfoActions.updateAmbitionCommand(ambition)),
			put(botInfoActions.updateCompetencyCommand(competency)),
			put(botInfoActions.updateComposureCommand(composure)),
			put(botInfoActions.updateVisionCommand(vision)),
		]);
	}
};
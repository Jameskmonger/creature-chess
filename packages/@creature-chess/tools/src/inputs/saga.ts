import { put, call, take } from "@redux-saga/core/effects";
import { all } from "redux-saga/effects";
import { updateLevelCommand, updateStreakCommand } from "../../../gamemode/lib/entities/player/state/commands";
import { botInfoActions } from "../store/botInfo";
import { updateHealthCommand, updateMoneyCommand } from "../store/commands";
import { runScenarioEvent } from "../store/events";

export const runScenarioSaga = function*() {
	while (true) {
		const action = yield take(runScenarioEvent.toString());
		yield call(console.log, "Running scenario:");
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
			put(updateMoneyCommand(money)),
			put(updateHealthCommand(health)),
			put(updateLevelCommand({ level, xp })),
			put(updateStreakCommand({ type: streakType, amount: streakAmount })),
			put(botInfoActions.updateAmbitionCommand(ambition)),
			put(botInfoActions.updateCompetencyCommand(competency)),
			put(botInfoActions.updateComposureCommand(composure)),
			put(botInfoActions.updateVisionCommand(vision)),
		]);
	}
};

import { createAction } from "@reduxjs/toolkit";
import { put, takeLatest } from "redux-saga/effects";
import { select } from "typed-redux-saga";

import { getDependency, getVariable } from "@shoki/engine";

import { GamePhase } from "@creature-chess/models";

import {
	getPlayerEntityDependencies,
	PlayerEntityDependencies,
} from "../entities/player/dependencies";
import { playerInfoCommands } from "../entities/player/state/commands";
import {
	isPlayerAlive,
	isPlayerReady,
} from "../entities/player/state/selectors";
import { PlayerVariables } from "../entities/player/variables";

export type ReadyUpPlayerAction = ReturnType<typeof readyUpPlayerAction>;
export const readyUpPlayerAction = createAction("readyUpPlayerAction");

export const readyUpPlayerActionSaga = function* () {
	yield takeLatest<ReadyUpPlayerAction>(
		readyUpPlayerAction.toString(),
		function* () {
			const name = yield* getVariable<PlayerVariables, string>(
				(variables) => variables.name
			);
			const { logger } = yield* getPlayerEntityDependencies();

			const isAlive = yield* select(isPlayerAlive);

			if (isAlive === false) {
				logger.info("Attempted to ready up, but dead", { actor: { name } });
				return;
			}

			const game = yield* getDependency<PlayerEntityDependencies, "gamemode">(
				"gamemode"
			);

			if (game.getRoundInfo().phase !== GamePhase.PREPARING) {
				logger.info("Attempted to ready up, but not in preparing phase", {
					actor: { name },
				});
				return;
			}

			const ready = yield* select(isPlayerReady);

			if (ready) {
				logger.info("Attempted to ready up, but already ready", {
					actor: { name },
				});
				return;
			}

			yield put(playerInfoCommands.updateReadyCommand(true));
		}
	);
};

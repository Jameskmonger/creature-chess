import { createAction } from "@reduxjs/toolkit";

import { GamePhase } from "@creature-chess/models";

import { PlayerStartListening } from "../entities/player/dependencies";
import { playerInfoCommands } from "../entities/player/state/commands";
import {
	isPlayerAlive,
	isPlayerReady,
} from "../entities/player/state/selectors";

export type ReadyUpPlayerAction = ReturnType<typeof readyUpPlayerAction>;
export const readyUpPlayerAction = createAction("readyUpPlayerAction");

export const setupReadyUpListener = (startListening: PlayerStartListening) => {
	startListening({
		actionCreator: readyUpPlayerAction,
		effect: async (_action, api) => {
			api.cancelActiveListeners();

			const name = api.extra.getVariable((v) => v.name);
			const logger = api.extra.dependencies.logger;
			const state = api.getState();

			if (!isPlayerAlive(state)) {
				logger.info("Attempted to ready up, but dead", { actor: { name } });
				return;
			}

			const game = api.extra.dependencies.gamemode;

			if (game.getRoundInfo().phase !== GamePhase.PREPARING) {
				logger.info("Attempted to ready up, but not in preparing phase", {
					actor: { name },
				});
				return;
			}

			if (isPlayerReady(state)) {
				logger.info("Attempted to ready up, but already ready", {
					actor: { name },
				});
				return;
			}

			api.dispatch(playerInfoCommands.updateReadyCommand(true));
		},
	});
};

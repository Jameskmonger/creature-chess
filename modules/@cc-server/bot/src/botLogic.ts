import delay from "delay";

import {
	Player,
	PlayerEvents,
	GameEvents,
} from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";

import { BotPersonality } from "@cc-server/data";

import { preparingPhase } from "./preparingPhase";
import { putBenchOnBoard } from "./putBenchOnBoard";

export const setupBotLogic = (entity: Player, personality: BotPersonality) => {
	entity.addListener({
		actionCreator: GameEvents.gamePhaseStartedEvent,
		effect: async ({ payload: { phase } }, api) => {
			api.cancelActiveListeners();

			const state = api.getState();

			if (state.playerInfo.health <= 0) {
				return;
			}

			await delay(1000);

			if (phase === GamePhase.PREPARING) {
				await putBenchOnBoard(api);
				await preparingPhase(api, personality);
			} else if (phase === GamePhase.PLAYING) {
				api.dispatch(PlayerEvents.clientFinishMatchEvent());
			}
		},
	});
};

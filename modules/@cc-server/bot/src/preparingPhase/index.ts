import delay from "delay";

import { PlayerActions } from "@creature-chess/gamemode";
import { PlayerListenerApi } from "@creature-chess/gamemode/src/entities/player/player";

import { BotPersonality } from "@cc-server/data";

import { getActions } from "../actions";
import { putBenchOnBoard } from "../putBenchOnBoard";

export const preparingPhase = async (api: PlayerListenerApi, personality: BotPersonality) => {
	const { settings, board, bench, gamemode: { pieceRegistry } } = api.player;

	await delay(settings.botActionDelayMs);

	while (true) {
		const state = api.getState();

		const actions = getActions(board, bench, pieceRegistry, state, personality, settings);

		if (actions.length === 0) {
			break;
		}

		const [mostValuable] = actions;

		api.dispatch(mostValuable.action());

		await delay(settings.botActionDelayMs);

		await putBenchOnBoard(api);
	}

	api.dispatch(PlayerActions.readyUpPlayerAction());
};

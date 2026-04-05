import delay from "delay";

import { PlayerActions } from "@creature-chess/gamemode";
import { PlayerListenerApi } from "@creature-chess/gamemode/src/entities/player/dependencies";

import { BotPersonality } from "@cc-server/data";

import { getActions } from "../actions";
import { BOT_ACTION_TIME_MS } from "../constants";
import { putBenchOnBoard } from "../putBenchOnBoard";

export const preparingPhase = async (api: PlayerListenerApi, personality: BotPersonality) => {
	const {
		settings,
		boards: { board, bench },
		gamemode: { pieceRegistry },
	} = api.extra.dependencies;

	await delay(BOT_ACTION_TIME_MS);

	while (true) {
		const state = api.getState();

		const actions = getActions(board, bench, pieceRegistry, state, personality, settings);

		if (actions.length === 0) {
			break;
		}

		const [mostValuable] = actions;

		api.dispatch(mostValuable.action());

		await delay(BOT_ACTION_TIME_MS);

		await putBenchOnBoard(api);
	}

	api.dispatch(PlayerActions.readyUpPlayerAction());
};

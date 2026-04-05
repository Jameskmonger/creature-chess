import {
	finishedBattle,
	inProgressBattle,
} from "@creature-chess/models/game/playerList";

import { PlayerStartListening } from "../dependencies";
import { playerFinishMatchEvent } from "../events";
import { playerInfoCommands } from "../state/commands";
import { getOpponentId, getOpponentIsClone } from "../state/selectors";
import { setupMatchRewardsListener } from "./matchRewards";

export const setupPlayerBattleListeners = (startListening: PlayerStartListening) => {
	startListening({
		// todo make this listen to a playerStartMatchEvent
		actionCreator: playerInfoCommands.updateOpponentCommand,
		effect: async ({ payload: { id, isClone } }, api) => {
			api.cancelActiveListeners();

			if (id) {
				api.dispatch(
					playerInfoCommands.updateBattleCommand(
						inProgressBattle(id, isClone ?? false)
					)
				);
			}
		},
	});

	startListening({
		actionCreator: playerFinishMatchEvent,
		effect: async ({ payload: { isHomePlayer, homeScore, awayScore } }, api) => {
			api.cancelActiveListeners();

			const opponentId = getOpponentId(api.getState());
			const opponentIsClone = getOpponentIsClone(api.getState());

			api.dispatch(
				playerInfoCommands.updateBattleCommand(
					finishedBattle(
						opponentId!,
						opponentIsClone,
						isHomePlayer,
						homeScore,
						awayScore
					)
				)
			);
		},
	});

	setupMatchRewardsListener(startListening);
};

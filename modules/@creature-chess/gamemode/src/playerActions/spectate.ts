import { createAction } from "@reduxjs/toolkit";

import { PlayerStartListening } from "../entities/player/player";
import { isPlayerAlive } from "../entities/player/state/selectors";
import { setSpectatingIdCommand } from "../entities/player/state/spectating";

export type SpectatePlayerAction = ReturnType<typeof spectatePlayerAction>;
export const spectatePlayerAction = createAction<
	{ playerId: string | null },
	"spectatePlayerAction"
>("spectatePlayerAction");

export const setupSpectateListener = (startListening: PlayerStartListening) => {
	startListening({
		actionCreator: spectatePlayerAction,
		effect: async ({ payload: { playerId } }, api) => {
			api.cancelActiveListeners();

			if (playerId === null) {
				api.dispatch(setSpectatingIdCommand(null));
				return;
			}

			const game = api.player.gamemode;
			const other = game.getPlayerById(playerId);

			if (!other || !other.select(isPlayerAlive)) {
				return;
			}

			api.dispatch(setSpectatingIdCommand(playerId));
		},
	});
};

import { PlayerStatus } from "@creature-chess/models";

import { quitGamePlayerAction } from "../../../playerActions";
import { PlayerStartListening } from "../player";
import { playerInfoCommands } from "../state/commands";

export const setupSetStatusOnQuitListener = (
	startListening: PlayerStartListening
) => {
	startListening({
		actionCreator: quitGamePlayerAction,
		effect: async (_action, api) => {
			api.dispatch(playerInfoCommands.updateStatusCommand(PlayerStatus.QUIT));
		},
	});
};

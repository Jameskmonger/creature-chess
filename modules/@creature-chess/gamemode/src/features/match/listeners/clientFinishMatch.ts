import { PlayerStartListening } from "../../../entities/player/player";
import {
	clientFinishMatchEvent,
} from "../../../entities/player/events";

export const setupClientFinishMatchListener = (startListening: PlayerStartListening) => {
	startListening({
		actionCreator: clientFinishMatchEvent,
		effect: async (_action, api) => {
			api.cancelActiveListeners();

			api.player.match?.onClientFinishMatch(api.player.id);
		},
	});
};

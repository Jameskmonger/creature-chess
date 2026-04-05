import { PlayerStartListening } from "../../../entities/player/dependencies";
import {
	clientFinishMatchEvent,
} from "../../../entities/player/events";
import { Match } from "../../../game/match";
import { PlayerVariables } from "../playerVariables";

export const setupClientFinishMatchListener = (startListening: PlayerStartListening) => {
	startListening({
		actionCreator: clientFinishMatchEvent,
		effect: async (_action, api) => {
			api.cancelActiveListeners();

			const playerId = api.extra.id;
			const match = api.extra.getVariable((v: PlayerVariables) => v.match) as Match | null;

			match?.onClientFinishMatch(playerId);
		},
	});
};

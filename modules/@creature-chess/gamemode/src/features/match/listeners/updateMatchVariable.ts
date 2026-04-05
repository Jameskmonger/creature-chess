import { PlayerStartListening } from "../../../entities/player/player";
import {
	playerFinishMatchEvent,
} from "../../../entities/player/events";
import {
	playerRunReadyPhaseEvent,
} from "../../../game/events";

export const setupUpdateMatchVariableListeners = (startListening: PlayerStartListening) => {
	startListening({
		actionCreator: playerRunReadyPhaseEvent,
		effect: async ({ payload: { match } }, api) => {
			api.player.match = match;
		},
	});

	startListening({
		actionCreator: playerFinishMatchEvent,
		effect: async (_action, api) => {
			api.player.match = null;
		},
	});
};

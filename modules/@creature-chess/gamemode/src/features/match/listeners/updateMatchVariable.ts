import { PlayerStartListening } from "../../../entities/player/dependencies";
import {
	playerFinishMatchEvent,
} from "../../../entities/player/events";
import {
	playerRunReadyPhaseEvent,
} from "../../../game/events";
import { PlayerVariables } from "../playerVariables";

export const setupUpdateMatchVariableListeners = (startListening: PlayerStartListening) => {
	startListening({
		actionCreator: playerRunReadyPhaseEvent,
		effect: async ({ payload: { match } }, api) => {
			api.extra.updateVariables({ match } as Partial<PlayerVariables>);
		},
	});

	startListening({
		actionCreator: playerFinishMatchEvent,
		effect: async (_action, api) => {
			api.extra.updateVariables({ match: null } as Partial<PlayerVariables>);
		},
	});
};

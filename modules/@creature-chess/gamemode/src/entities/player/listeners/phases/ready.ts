import {
	playerBeforeReadyPhaseEvent,
	playerRunReadyPhaseEvent,
} from "../../../../game/events";
import { PlayerStartListening } from "../../dependencies";
import { playerInfoCommands } from "../../state/commands";
import { fillBoardCommand } from "../fillBoard";

export const setupReadyPhaseListeners = (startListening: PlayerStartListening) => {
	startListening({
		actionCreator: playerBeforeReadyPhaseEvent,
		effect: async (_action, api) => {
			api.dispatch(fillBoardCommand());
			api.dispatch(playerInfoCommands.updateReadyCommand(false));
		},
	});

	startListening({
		actionCreator: playerRunReadyPhaseEvent,
		effect: async ({ payload: { match } }, api) => {
			const playerId = api.extra.id;

			if (match.home.id === playerId) {
				api.dispatch(
					playerInfoCommands.updateOpponentCommand({
						id: match.away.id,
						isClone: match.awayIsClone,
					})
				);
			} else {
				api.dispatch(
					playerInfoCommands.updateOpponentCommand({
						id: match.home.id,
						isClone: false,
					})
				);
			}
		},
	});
};

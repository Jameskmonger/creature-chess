import { isNotQuit } from "../entities/player/state/selectors";
import { gamePhaseStartedEvent } from "./events";
import { RoundInfoCommands } from "./roundInfo";
import { GameStartListening } from "./store";

export const setupPublicEventsListener = (startListening: GameStartListening) => {
	startListening({
		actionCreator: RoundInfoCommands.setRoundInfoCommand,
		effect: async ({ payload }, api) => {
			api.cancelActiveListeners();

			const { players } = api.extra;

			players.getAll()
				.filter((p) => p.select(isNotQuit))
				.forEach((player) => {
					player.put(gamePhaseStartedEvent(payload));
				});
		},
	});
};

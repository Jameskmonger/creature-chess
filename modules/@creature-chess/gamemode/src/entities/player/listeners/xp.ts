import { PlayerStartListening } from "../dependencies";
import { getXpToNextLevel } from "../../../player/xp";
import { playerInfoCommands } from "../state/commands";
import { getPlayerLevel, getPlayerXp } from "../state/selectors";

const ADD_XP_COMMAND = "ADD_XP_COMMAND";
type ADD_XP_COMMAND = typeof ADD_XP_COMMAND;
type AddXpCommand = { type: ADD_XP_COMMAND; payload: { amount: number } };
export const addXpCommand = (amount: number): AddXpCommand => ({
	type: ADD_XP_COMMAND,
	payload: { amount },
});

export const setupXpListener = (startListening: PlayerStartListening) => {
	startListening({
		type: ADD_XP_COMMAND,
		effect: async (action, api) => {
			const { amount } = (action as AddXpCommand).payload;
			let level = getPlayerLevel(api.getState());
			let xp = getPlayerXp(api.getState());

			for (let i = 0; i < amount; i++) {
				const toNextLevel = getXpToNextLevel(level);
				const newXp = xp + 1;

				if (newXp === toNextLevel) {
					xp = 0;
					level++;
				} else {
					xp = newXp;
				}
			}

			api.dispatch(playerInfoCommands.updateLevelCommand({ level, xp }));
		},
	});
};

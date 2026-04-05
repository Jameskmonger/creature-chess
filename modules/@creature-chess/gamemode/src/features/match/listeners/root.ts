import { PlayerStartListening } from "../../../entities/player/dependencies";
import { setupClientFinishMatchListener } from "./clientFinishMatch";
import { setupUpdateMatchVariableListeners } from "./updateMatchVariable";

export const setupMatchListeners = (startListening: PlayerStartListening) => {
	setupUpdateMatchVariableListeners(startListening);
	setupClientFinishMatchListener(startListening);
};

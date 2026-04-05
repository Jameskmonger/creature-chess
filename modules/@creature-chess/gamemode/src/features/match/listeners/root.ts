import { PlayerStartListening } from "../../../entities/player/player";
import { setupClientFinishMatchListener } from "./clientFinishMatch";
import { setupUpdateMatchVariableListeners } from "./updateMatchVariable";

export const setupMatchListeners = (startListening: PlayerStartListening) => {
	setupUpdateMatchVariableListeners(startListening);
	setupClientFinishMatchListener(startListening);
};

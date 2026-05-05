import { PlayerStartListening } from "../../../entities/player/player";
import { setupClientFinishMatchListener } from "./clientFinishMatch";

export const setupMatchListeners = (startListening: PlayerStartListening) => {
	setupClientFinishMatchListener(startListening);
};

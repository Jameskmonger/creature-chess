import { PlayerStartListening } from "../entities/player/player";
import { setupMatchListeners } from "./match";

export const setupFeaturesListeners = (
	startListening: PlayerStartListening
) => {
	setupMatchListeners(startListening);
};

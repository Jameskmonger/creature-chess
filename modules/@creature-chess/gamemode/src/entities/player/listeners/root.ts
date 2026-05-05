import { setupFeaturesListeners } from "../../../features";
import { PlayerStartListening } from "../player";

export const setupPlayerListeners = (startListening: PlayerStartListening) => {
	setupFeaturesListeners(startListening);
};

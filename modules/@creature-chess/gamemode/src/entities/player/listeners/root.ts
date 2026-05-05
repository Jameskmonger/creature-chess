import { setupFeaturesListeners } from "../../../features";
import { PlayerStartListening } from "../player";
import { setupEvolutionListener } from "./evolution";

export const setupPlayerListeners = (startListening: PlayerStartListening) => {
	setupEvolutionListener(startListening);
	setupFeaturesListeners(startListening);
};

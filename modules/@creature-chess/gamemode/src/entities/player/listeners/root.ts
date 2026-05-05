import { setupFeaturesListeners } from "../../../features";
import { setupPlayerActionListeners } from "../../../playerActions/listeners";
import { PlayerStartListening } from "../player";
import { setupEvolutionListener } from "./evolution";
import { setupSetStatusOnQuitListener } from "./setStatusOnQuit";

export const setupPlayerListeners = (startListening: PlayerStartListening) => {
	setupPlayerActionListeners(startListening);
	setupEvolutionListener(startListening);
	setupSetStatusOnQuitListener(startListening);
	setupFeaturesListeners(startListening);
};

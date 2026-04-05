import { PlayerStartListening } from "../../dependencies";
import { setupPreparingPhaseListener } from "./preparing";
import { setupReadyPhaseListeners } from "./ready";

export const setupPlayerPhaseListeners = (startListening: PlayerStartListening) => {
	setupPreparingPhaseListener(startListening);
	setupReadyPhaseListeners(startListening);
};

import { setupFeaturesListeners } from "../../../features";
import { setupPlayerActionListeners } from "../../../playerActions/listeners";
import { PlayerStartListening } from "../player";
import { setupPlayerBattleListeners } from "./battle";
import { setupBoardApplyListeners } from "./boardApply";
import { setupEvolutionListener } from "./evolution";
import { setupFillBoardListener } from "./fillBoard";
import { setupPlayerPhaseListeners } from "./phases";
import { setupSetStatusOnQuitListener } from "./setStatusOnQuit";
import { setupXpListener } from "./xp";

export const setupPlayerListeners = (startListening: PlayerStartListening) => {
	setupPlayerPhaseListeners(startListening);
	setupPlayerActionListeners(startListening);
	setupBoardApplyListeners(startListening);
	setupEvolutionListener(startListening);
	setupXpListener(startListening);
	setupFillBoardListener(startListening);
	setupSetStatusOnQuitListener(startListening);
	setupPlayerBattleListeners(startListening);
	setupFeaturesListeners(startListening);
};

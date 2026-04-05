import { PlayerExtra, PlayerStartListening } from "../dependencies";
import { setupFeaturesListeners } from "../../../features";
import { setupPlayerActionListeners } from "../../../playerActions/listeners";
import { setupPlayerBattleListeners } from "./battle";
import { setupEvolutionListener } from "./evolution";
import { setupFillBoardListener } from "./fillBoard";
import { setupPlayerPhaseListeners } from "./phases";
import { setupSetStatusOnQuitListener } from "./setStatusOnQuit";
import { setupXpListener } from "./xp";
import { setupBoardApplyListeners } from "./boardApply";

export const setupPlayerListeners = (startListening: PlayerStartListening, extra: PlayerExtra) => {
	setupPlayerPhaseListeners(startListening);
	setupPlayerActionListeners(startListening, extra);
	setupBoardApplyListeners(startListening);
	setupEvolutionListener(startListening);
	setupXpListener(startListening);
	setupFillBoardListener(startListening);
	setupSetStatusOnQuitListener(startListening);
	setupPlayerBattleListeners(startListening);
	setupFeaturesListeners(startListening);
};

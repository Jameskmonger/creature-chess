import { PlayerStartListening } from "../entities/player/dependencies";
import {
	setupMatchListeners,
	MatchPlayerVariables,
	defaultMatchPlayerVariables,
} from "./match";

export const setupFeaturesListeners = (startListening: PlayerStartListening) => {
	setupMatchListeners(startListening);
};

export type FeaturesPlayerVariables = MatchPlayerVariables;

export const defaultFeaturesPlayerVariables = (): FeaturesPlayerVariables => ({
	...defaultMatchPlayerVariables(),
});

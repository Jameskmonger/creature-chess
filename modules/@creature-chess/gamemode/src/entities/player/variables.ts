import { PlayerProfile } from "@creature-chess/models/player";

import {
	FeaturesPlayerVariables,
	defaultFeaturesPlayerVariables,
} from "../../features";

export type PlayerVariables = {
	name: string;
	profile: PlayerProfile;
	finishPosition: number;
	finishRound: number;
} & FeaturesPlayerVariables;

export const defaultPlayerVariables = (): PlayerVariables => ({
	name: "",
	profile: { title: null, picture: 1 },
	finishPosition: -1,
	finishRound: -1,
	...defaultFeaturesPlayerVariables(),
});

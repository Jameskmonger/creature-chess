import { PlayerProfile } from "@creature-chess/models";

import {
	FeaturesPlayerVariables,
	defaultFeaturesPlayerVariables,
} from "../../features";

export type PlayerVariables = {
	name: string;
	profile: PlayerProfile;
} & FeaturesPlayerVariables;

export const defaultPlayerVariables = (): PlayerVariables => ({
	name: "",
	profile: { title: null, picture: 1 },
	...defaultFeaturesPlayerVariables(),
});

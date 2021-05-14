import { FeaturesPlayerVariables, defaultFeaturesPlayerVariables } from "../features";

export type PlayerVariables = FeaturesPlayerVariables;

export const defaultPlayerVariables = (): PlayerVariables => ({
	...defaultFeaturesPlayerVariables()
});

import { Match } from "../../game/match";

export type PlayerVariables = {
	match: Match | null;
};

export const defaultPlayerVariables = (): PlayerVariables => ({ match: null });

import { Action } from "redux";

import { ScoredInput } from "@shoki/engine";

export type BrainAction = {
	name: string;
	action: () => Action;
	/** Utility score in `[0, 1]`, as produced by `createUtilityValue`. */
	value: number;
	/**
	 * Per-input breakdown of the score.
	 */
	breakdown: ScoredInput[];
};

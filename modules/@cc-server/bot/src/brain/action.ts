import { Action } from "redux";

export type BrainAction = {
	name: string;
	action: () => Action;
	value: BrainActionValue;
};

export enum BrainActionValue {
	USELESS = Number.NEGATIVE_INFINITY,
	MEDIUM_VALUE = 0,
	HIGH_VALUE = 1_000,
	VERY_HIGH_VALUE = 1_000_000,
	EXTREMELY_HIGH_VALUE = 1_000_000_000,
	PRICELESS = Number.POSITIVE_INFINITY,
}

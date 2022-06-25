import { UtilityNumberValue } from "./types";

export const clampToUtilityNumber = (input: number) =>
	Math.min(Math.max(input, 1), 200) as UtilityNumberValue;

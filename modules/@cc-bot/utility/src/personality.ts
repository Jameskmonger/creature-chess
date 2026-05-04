import { PlayerState, PlayerStateSelectors } from "@creature-chess/gamemode";

export type PersonalityLevel = "low" | "high";

export type Personality = {
	ambition: PersonalityLevel;
	composure: PersonalityLevel;
	vision: PersonalityLevel;
};

const PANIC_HP_THRESHOLD = 30;

export const isInPanicMode = (
	state: PlayerState,
	personality: Personality
): boolean =>
	personality.composure === "low" &&
	PlayerStateSelectors.getPlayerHealth(state) <= PANIC_HP_THRESHOLD;

/** Panic mode promotes any ambition to "high". */
export const effectiveAmbition = (
	state: PlayerState,
	personality: Personality
): PersonalityLevel =>
	isInPanicMode(state, personality) ? "high" : personality.ambition;

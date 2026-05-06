import { Player } from "@creature-chess/gamemode";

export type PersonalityLevel = "low" | "high";

export type Personality = {
	ambition: PersonalityLevel;
	composure: PersonalityLevel;
	vision: PersonalityLevel;
};

const PANIC_HP_THRESHOLD = 30;

export const isInPanicMode = (
	player: Player,
	personality: Personality
): boolean =>
	personality.composure === "low" && player.health <= PANIC_HP_THRESHOLD;

/** Panic mode promotes any ambition to "high". */
export const effectiveAmbition = (
	player: Player,
	personality: Personality
): PersonalityLevel =>
	isInPanicMode(player, personality) ? "high" : personality.ambition;

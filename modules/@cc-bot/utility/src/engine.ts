import { BotEngine } from "@cc-server/bot";

import { createUtilityBot } from "./createUtilityBot";
import { Personality, PersonalityLevel } from "./personality";

const isLevel = (v: unknown): v is PersonalityLevel =>
	v === "low" || v === "high";

const parseMeta = (meta: unknown): Personality => {
	if (typeof meta !== "object" || meta === null) {
		throw new Error("utility bot meta must be an object");
	}

	const m = meta as Record<string, unknown>;

	if (!isLevel(m.ambition) || !isLevel(m.composure) || !isLevel(m.vision)) {
		throw new Error(
			'utility bot meta must have "low" | "high" for ambition, composure, vision'
		);
	}

	return {
		ambition: m.ambition,
		composure: m.composure,
		vision: m.vision,
	};
};

export const utilityBotEngine: BotEngine = {
	id: "utility",
	build: (meta) => createUtilityBot(parseMeta(meta)),
};

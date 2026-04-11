// tslint:disable: no-console
import { PrismaClient } from "@prisma/client";

import { BotPersonality, BotPersonalityValue } from "./databaseBot";

const HIGH: BotPersonalityValue = 180;
const LOW: BotPersonalityValue = 20;

type BotArchetype = {
	nickname: string;
	archetype: string;
	personality: BotPersonality;
};

const BOT_ARCHETYPES: BotArchetype[] = [
	{
		nickname: "Fox",
		archetype: "Mastermind",
		personality: { ambition: HIGH, composure: HIGH, vision: HIGH },
	},
	{
		nickname: "Conan",
		archetype: "Brawler",
		personality: { ambition: HIGH, composure: HIGH, vision: LOW },
	},
	{
		nickname: "C.J.",
		archetype: "Speculator",
		personality: { ambition: HIGH, composure: LOW, vision: HIGH },
	},
	{
		nickname: "Aggie",
		archetype: "Gambler",
		personality: { ambition: HIGH, composure: LOW, vision: LOW },
	},
	{
		nickname: "Hazuki",
		archetype: "Sage",
		personality: { ambition: LOW, composure: HIGH, vision: HIGH },
	},
	{
		nickname: "Ghost",
		archetype: "Hermit",
		personality: { ambition: LOW, composure: HIGH, vision: LOW },
	},
	{
		nickname: "Knuckle",
		archetype: "Survivor",
		personality: { ambition: LOW, composure: LOW, vision: HIGH },
	},
	{
		nickname: "Zero",
		archetype: "Bottom-Barrel",
		personality: { ambition: LOW, composure: LOW, vision: LOW },
	},
];

export const setupBotDatabase = async (
	client: PrismaClient
): Promise<boolean> => {
	const botCount = await client.bots.count();
	const shouldCreateBots = botCount < BOT_ARCHETYPES.length;

	if (shouldCreateBots) {
		for (const { nickname, archetype, personality } of BOT_ARCHETYPES) {
			await client.bots.create({
				data: {
					nickname,
					...personality,
				},
			});

			console.log(` - Created bot '${nickname}' (${archetype})`);
		}
	}

	return shouldCreateBots;
};

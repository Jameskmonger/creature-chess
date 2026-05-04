// tslint:disable: no-console
import { PrismaClient } from "@prisma/client";

type Level = "low" | "high";

type BotArchetype = {
	nickname: string;
	engine: string;
	meta: { ambition: Level; composure: Level; vision: Level };
};

const BOT_ARCHETYPES: BotArchetype[] = [
	{
		nickname: "Fox",
		engine: "utility",
		meta: { ambition: "high", composure: "high", vision: "high" },
	},
	{
		nickname: "Conan",
		engine: "utility",
		meta: { ambition: "high", composure: "high", vision: "low" },
	},
	{
		nickname: "C.J.",
		engine: "utility",
		meta: { ambition: "high", composure: "low", vision: "high" },
	},
	{
		nickname: "Aggie",
		engine: "utility",
		meta: { ambition: "high", composure: "low", vision: "low" },
	},
	{
		nickname: "Hazuki",
		engine: "utility",
		meta: { ambition: "low", composure: "high", vision: "high" },
	},
	{
		nickname: "Ghost",
		engine: "utility",
		meta: { ambition: "low", composure: "high", vision: "low" },
	},
	{
		nickname: "Knuckle",
		engine: "utility",
		meta: { ambition: "low", composure: "low", vision: "high" },
	},
	{
		nickname: "Zero",
		engine: "utility",
		meta: { ambition: "low", composure: "low", vision: "low" },
	},
];

export const setupBotDatabase = async (
	client: PrismaClient
): Promise<boolean> => {
	const botCount = await client.bots.count();
	const shouldCreateBots = botCount < BOT_ARCHETYPES.length;

	if (shouldCreateBots) {
		for (const { nickname, engine, meta } of BOT_ARCHETYPES) {
			await client.bots.create({
				data: { nickname, engine, meta },
			});

			console.log(` - Created bot '${nickname}' with engine '${engine}' and meta ${JSON.stringify(meta)}`);
		}
	}

	return shouldCreateBots;
};

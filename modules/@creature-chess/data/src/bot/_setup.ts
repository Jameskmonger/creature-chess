// tslint:disable: no-console
import { PrismaClient } from "@prisma/client";

import { BotPersonalityValue } from "./databaseBot";

const BOT_NAMES = [
	"Aggie",
	// "Bertie",
	"Conan",
	// "Dawn",
	// "Eddy",
	"Fox",
	"Ghost",
	"Hazuki",
	// "Isaac",
	"C.J.",
	"Knuckle",
	// "Lily",
	// "Madison",
	"Navi",
	// "Oscar",
	"Price",
	// "Quiet",
	"Rune",
	"Smoke",
	// "Tony",
	"U.B.",
	// "Venom",
	// "Warp",
	// "Xenon",
	"Yew",
	// "Zero"
];

const randomPersonalityValue = () =>
	(Math.floor(Math.random() * 10 + 1) * 20) as BotPersonalityValue;

export const setupBotDatabase = async (
	client: PrismaClient
): Promise<boolean> => {
	const botCount = await client.bots.count();
	// need at least 7 bots to play a game with one human
	const shouldCreateBots = botCount < 7;

	if (shouldCreateBots) {
		for (const name of BOT_NAMES) {
			await client.bots.create({
				data: {
					nickname: name,
					ambition: randomPersonalityValue(),
					composure: randomPersonalityValue(),
					vision: randomPersonalityValue(),
				},
			});

			console.log(` - Created bot '${name}'`);
		}
	}

	return shouldCreateBots;
};

import { pickRandom } from "@shoki/random";

import { LobbyPlayer, assetPicture } from "@creature-chess/models";

import { BotImplementation, createBotEngineRegistry } from "@cc-server/bot";

import { utilityBotEngine } from "@cc-bot/utility";

const botEngines = createBotEngineRegistry();
botEngines.register(utilityBotEngine);

const ROBOT_AVATAR_COUNT = 9;
const botAvatar = (index: number): string =>
	assetPicture(`bots/robot-${String((index % ROBOT_AVATAR_COUNT) + 1).padStart(3, "0")}.png`);

export type BotParticipant = {
	player: LobbyPlayer;
	implementation: BotImplementation;
};

const BOTS = [
	{
		nickname: "Conan",
		engine: "utility",
		meta: { ambition: "high", composure: "high", vision: "high" },
	},
	{
		nickname: "Hazuki",
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
		nickname: "Fox",
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

export const getBots = async (count: number) => {
	const participants: BotParticipant[] = [];
	const usedBots = new Set<string>();

	for (let i = 0; i < count; i++) {
		let botInfo: (typeof BOTS)[number] | null = null;

		while (!botInfo || usedBots.has(botInfo.nickname)) {
			botInfo = pickRandom(BOTS, Math.random);
		}

		usedBots.add(botInfo.nickname);

		const implementation = botEngines.build(botInfo.engine, botInfo.meta);

		participants.push({
			player: {
				id: "bot-" + botInfo.nickname.toLowerCase(),
				name: `[BOT] ${botInfo.nickname}`,
				profile: {
					title: null,
					picture: botAvatar(BOTS.indexOf(botInfo)),
				},
				type: "bot" as const,
			},
			implementation,
		});
	}

	return participants;
};

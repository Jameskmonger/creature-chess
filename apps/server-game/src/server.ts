import { Server } from "socket.io";

import { DatabaseConnection } from "@creature-chess/data";
import { LOBBY_WAIT_TIME, MAX_PLAYERS_IN_GAME } from "@creature-chess/models";

import { createManagementClient } from "./external/auth0";
import { getBots } from "./external/bots";
import { createDatabaseConnection } from "./external/database";
import { createDiscordApi } from "./external/discord";
import { BotGameParticipant, Game, PlayerGameParticipant } from "./game";
import { onHandshakeSuccess } from "./handshake";
import { Lobby } from "./lobby";
import { logger } from "./log";
import { AuthenticatedSocket } from "./player/socket";

const calculateElo = (aRating: number, bRating: number, aWin: boolean) => ({
	a: 0,
	b: 0,
});

const getById = (
	players: PlayerGameParticipant[],
	bots: BotGameParticipant[],
	id: string
) => {
	const player = players.find((p) => p.player.id === id);

	if (player) {
		return {
			type: "user" as const,
			id,
		};
	}

	const bot = bots.find((p) => p.player.id === id);

	if (bot) {
		return {
			type: "bot" as const,
			id,
		};
	}

	return null;
};

const startGame = async (
	database: DatabaseConnection,
	players: PlayerGameParticipant[],
	onFinish: () => void
) => {
	const botsRequired = MAX_PLAYERS_IN_GAME - players.length;

	const bots = await getBots(database, botsRequired);

	for (const {
		player: { id },
	} of players) {
		await database.player.recordGameStart("user", id);
	}

	const game = new Game(
		{ players, bots },
		{
			onFinish: async (finishOrderIds) => {
				const totalEloChanges = finishOrderIds.map((id) => ({
					id,
					type: "" as "bot" | "user",
					change: 0,
				}));

				for (
					let thisIndex = 0;
					thisIndex < finishOrderIds.length;
					thisIndex++
				) {
					for (
						let otherIndex = 0;
						otherIndex < finishOrderIds.length;
						otherIndex++
					) {
						if (thisIndex === otherIndex) {
							continue;
						}

						const aId = finishOrderIds[thisIndex];
						const bId = finishOrderIds[otherIndex];

						const a = getById(players, bots, aId);
						const b = getById(players, bots, bId);

						if (!a || !b) {
							logger.error(`Could not record matchup for ${aId} and ${bId}`);
							continue;
						}

						const aElo = await database.player.getElo(a.type, a.id);
						const bElo = await database.player.getElo(b.type, b.id);

						const eloChanges = calculateElo(
							aElo || 1600,
							bElo || 1600,
							thisIndex < otherIndex
						);

						totalEloChanges[thisIndex].type += a.type;
						totalEloChanges[thisIndex].change += eloChanges.a;
						totalEloChanges[otherIndex].type += b.type;
						totalEloChanges[otherIndex].change += eloChanges.b;
					}
				}

				for (let i = 0; i < totalEloChanges.length; i++) {
					const { type, id, change } = totalEloChanges[i];

					await database.player.recordGameFinish(type, id, {
						eloChange: change,
						win: i === 0,
					});
				}

				console.log({
					totalEloChanges,
				});

				onFinish();
			},
		}
	);

	return game;
};

export const startServer = async ({ io }: { io: Server }) => {
	logger.info("Starting server...");
	const authClient = createManagementClient();
	logger.info("Management client created");
	const database = createDatabaseConnection();
	logger.info("Database connection created");
	const discordApi = await createDiscordApi();
	logger.info("Discord client created");

	let lobbies: Lobby[] = [];
	let games: Game[] = [];

	const matchmaking = (socket: AuthenticatedSocket) => {
		logger.info(
			`[Matchmaking (${socket.data.nickname})] Beginning matchmaking`
		);

		const matchingLobby = lobbies.find((l) => l.isInLobby(socket.data.id));

		if (matchingLobby) {
			logger.info(`[Matchmaking (${socket.data.nickname})] Lobby found`);

			matchingLobby.connect(socket);
			return;
		}

		const matchingGame = games.find((l) => l.isInGame(socket.data.id));

		if (matchingGame) {
			logger.info(`[Matchmaking (${socket.data.nickname})] Game found`);

			matchingGame.connect(socket);
			return;
		}

		const lobby = new Lobby({
			waitTimeMs: LOBBY_WAIT_TIME * 1000,
			maxPlayers: MAX_PLAYERS_IN_GAME,
			onStart: async (players) => {
				lobbies = lobbies.filter((other) => other !== lobby);

				const game = await startGame(database, players, () => {
					games = games.filter((other) => other !== game);
				});

				games.push(game);
			},
		});

		lobbies.push(lobby);

		logger.info(`[Matchmaking (${socket.data.nickname})] New lobby created`);
		discordApi.startLobby();
		lobby.connect(socket);
	};

	onHandshakeSuccess({ io, authClient, database }, matchmaking);

	logger.info("Listening for successful handshakes");
};

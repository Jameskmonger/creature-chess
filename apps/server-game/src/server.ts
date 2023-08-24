import { Server } from "socket.io";

import {
	createDatabaseConnection,
	DatabaseConnection,
} from "@creature-chess/data";
import { LOBBY_WAIT_TIME, MAX_PLAYERS_IN_GAME } from "@creature-chess/models";

import { createManagementClient } from "./external/auth0";
import { getBots } from "./external/bots";
import { Game, PlayerGameParticipant } from "./game";
import { onHandshakeSuccess } from "./handshake";
import { Lobby } from "./lobby";
import { logger } from "./log";
import { AuthenticatedSocket } from "./player/socket";

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
		await database.user.addGamePlayed(id);
	}

	const game = new Game(
		{ players, bots },
		{
			onFinish: (winner) => {
				logger.info(`Game won by ${winner.getVariable((t) => t.name)}`);

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
	const database = await createDatabaseConnection(logger);
	logger.info("Database connection created");

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

		const matchingGame = games.find((l) => l.canJoinGame(socket.data.id));

		if (matchingGame) {
			logger.info(`[Matchmaking (${socket.data.nickname})] Game found`);

			matchingGame.connect(socket);
			return;
		}

		const openLobby = lobbies.find((l) => l.getFreeSlotCount() > 0);

		if (openLobby) {
			logger.info(
				`[Matchmaking (${socket.data.nickname})] Joined existing lobby`
			);

			openLobby.connect(socket);

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
		// discordApi.startLobby();
		lobby.connect(socket);
	};

	onHandshakeSuccess({ io, authClient, database }, matchmaking);

	logger.info("Listening for successful handshakes");
};

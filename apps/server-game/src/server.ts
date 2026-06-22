import { GamemodeContext } from "@creature-chess/gamemode";
import { collectDefaultMetrics, register } from "prom-client";
import { Server } from "socket.io";

import { GamemodeSettings } from "@creature-chess/models";

import {
	activeBattles,
	activeGames,
	battlesStarted,
	gamesStarted,
	socketInBytes,
	socketOutBytes,
} from "./Metrics";
import { getBots } from "./external/bots";
import { Game, PlayerGameParticipant } from "./game";
import { onHandshakeSuccess } from "./handshake";
import { Lobby } from "./lobby";
import { logger } from "./log";
import { AuthenticatedSocket } from "./player/socket";
import { loadGamemodeAndMods } from "./plugins";

register.setDefaultLabels({
	nodeId: process.env.NODE_APP_INSTANCE || "default",
});

collectDefaultMetrics({ register });

// TODO make these configurable
const MAX_PLAYERS = 8;
const LOBBY_WAIT_TIME = 60;

const startGame = async (
	context: GamemodeContext,
	settings: GamemodeSettings,
	players: PlayerGameParticipant[],
	onFinish: () => void
) => {
	const botsRequired = MAX_PLAYERS - players.length;

	const bots = await getBots(botsRequired);

	const game = new Game(
		settings,
		{ players, bots },
		{
			context,
			onFinish: () => {
				logger.info("Game finished");

				onFinish();
			},
		}
	);

	return game;
};

export const startServer = async ({ io }: { io: Server }) => {
	logger.info("Starting server...");

	const context = await loadGamemodeAndMods();

	let lobbies: Lobby[] = [];
	let games: Game[] = [];

	gamesStarted.reset();
	activeGames.reset();
	battlesStarted.reset();
	activeBattles.reset();
	socketInBytes.reset();
	socketOutBytes.reset();

	/**
	 * Rejoin an existing lobby or game for this player, if one exists.
	 * Returns whether the socket was connected to anything.
	 */
	const reconnect = (socket: AuthenticatedSocket): boolean => {
		const socketLabel = socket.data.nickname ?? socket.data.id;

		const matchingLobby = lobbies.find((l) => l.isInLobby(socket.data.id));

		if (matchingLobby) {
			logger.info(`[Matchmaking (${socketLabel})] Lobby found`);

			matchingLobby.connect(socket);
			return true;
		}

		const matchingGame = games.find((l) => l.canJoinGame(socket.data.id));

		if (matchingGame) {
			logger.info(`[Matchmaking (${socketLabel})] Game found`);

			matchingGame.connect(socket);
			return true;
		}

		return false;
	};

	const matchmaking = (socket: AuthenticatedSocket) => {
		const socketLabel = socket.data.nickname ?? socket.data.id;
		logger.info(`[Matchmaking (${socketLabel})] Beginning matchmaking`);

		if (reconnect(socket)) {
			return;
		}

		const openLobby = lobbies.find((l) => l.getFreeSlotCount() > 0);

		if (openLobby) {
			logger.info(`[Matchmaking (${socketLabel})] Joined existing lobby`);

			openLobby.connect(socket);

			return;
		}

		const lobby = new Lobby({
			waitTimeS: LOBBY_WAIT_TIME,
			maxPlayers: MAX_PLAYERS,
			onStart: async (settings, players) => {
				lobbies = lobbies.filter((other) => other !== lobby);

				const game = await startGame(
					context,
					settings,
					players,
					() => {
						games = games.filter((other) => other !== game);
					}
				);

				games.push(game);
			},
		});

		lobbies.push(lobby);

		logger.info(`[Matchmaking (${socketLabel})] New lobby created`);
		// discordApi.startLobby();
		lobby.connect(socket);
	};

	onHandshakeSuccess({ io }, context.identity, (socket) => {
		socket.on("play", () => matchmaking(socket));
		socket.on("reconnect", () => {
			if (!reconnect(socket)) {
				socket.emit("noGame");
			}
		});
	});
};

import { v4 as uuid } from "uuid";

import {
	Gamemode,
	PlayerCommands,
	Player,
} from "@creature-chess/gamemode";
import { GameFinishEvent } from "@creature-chess/gamemode";
import { PlayerStatus } from "@creature-chess/models";
import { LobbyPlayer } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models";

import { setupBotLogic } from "@cc-server/bot";
import { BotPersonality } from "@cc-server/data";

import {
	activeBattles,
	activeGames,
	battlesStarted,
	gamesStarted,
	turnDurationMs,
} from "./Metrics";
import { logger } from "./log";
import { playerNetworking } from "./player";
import { createPlayer } from "./player/entity";
import { AuthenticatedSocket, GameSocket, LobbySocket } from "./player/socket";

type GameMember = {
	type: "BOT" | "PLAYER";
	id: string;
	networkingTeardown?: () => void;
	entity: Player;
};

export type PlayerGameParticipant = {
	player: LobbyPlayer;
	socket: LobbySocket;
};

export type BotGameParticipant = {
	player: LobbyPlayer;
	personality: BotPersonality;
};

type Participants = {
	players: PlayerGameParticipant[];
	bots: BotGameParticipant[];
};

type GameOptions = {
	onFinish: (event: GameFinishEvent["payload"]) => void;
};

export class Game {
	private members: GameMember[] = [];
	private gamemode: Gamemode;
	private settings: GamemodeSettings;

	public constructor(
		_settings: GamemodeSettings,
		{ players, bots }: Participants,
		{ onFinish }: GameOptions
	) {
		this.settings = _settings;

		const gameId = uuid();
		this.gamemode = new Gamemode(gameId, logger, _settings, {
			onTurnComplete(timeMs) {
				turnDurationMs.observe(timeMs);
			},
			onMatchStart() {
				activeBattles.inc();
				battlesStarted.inc();
			},
			onMatchEnd() {
				activeBattles.dec();
			},
		});

		for (const player of players) {
			this.registerPlayer(player);
		}

		for (const bot of bots) {
			this.registerBot(bot);
		}

		this.gamemode.onFinish((event) => {
			activeGames.dec();

			onFinish(event);
		});

		const entities = this.members.map((m) => m.entity);
		this.gamemode.start(entities);

		activeGames.inc();
		gamesStarted.inc();
	}

	public canJoinGame(playerId: string) {
		const existing = this.gamemode.getPlayerById(playerId);

		if (!existing) {
			return false;
		}

		return existing.select(
			(state) =>
				state.playerInfo.health > 0 &&
				state.playerInfo.status === PlayerStatus.CONNECTED
		);
	}

	public connect(socket: AuthenticatedSocket) {
		// TODO (James) id is a string but we need a number to preserve old Faunadb id type, convert in future
		const socketIdAsString = socket.data.id.toString();
		const existing = this.members.find((m) => m.id === socketIdAsString);

		if (!existing) {
			throw Error(
				`GameMember couldn't be found when connecting to Game: ${socket.data.nickname}`
			);
		}

		const entity = this.gamemode.getPlayerById(socketIdAsString);

		if (!entity) {
			throw Error(
				`Player couldn't be found when connecting to Game: ${socket.data.nickname}`
			);
		}

		existing.networkingTeardown?.();

		const { teardown } = this.runPlayerNetworking(entity, socket as unknown as GameSocket);
		existing.networkingTeardown = teardown;
	}

	private registerPlayer(player: PlayerGameParticipant) {
		const {
			player: { id, name, profile },
			socket,
		} = player;

		// TODO (James) id is a string but we need a number to preserve old Faunadb id type, convert in future
		const playerIdAsString = id.toString();

		const entity = createPlayer(
			this.gamemode,
			playerIdAsString,
			name,
			profile,
			this.settings
		);

		this.initialisePlayer(entity);

		const { teardown } = this.runPlayerNetworking(entity, socket as unknown as GameSocket);

		this.members.push({
			type: "PLAYER",
			id: playerIdAsString,
			networkingTeardown: teardown,
			entity,
		});
	}

	private registerBot(player: BotGameParticipant) {
		const {
			player: { id, name, profile },
			personality,
		} = player;

		// TODO (James) id is a string but we need a number to preserve old Faunadb id type, convert in future
		const playerIdAsString = id.toString();

		const entity = createPlayer(
			this.gamemode,
			playerIdAsString,
			name,
			profile,
			this.settings
		);

		this.initialisePlayer(entity);

		setupBotLogic(entity, personality);

		this.members.push({
			type: "BOT",
			id: playerIdAsString,
			entity,
		});
	}

	private initialisePlayer(entity: Player) {
		const settings = this.settings;

		entity.put(
			PlayerCommands.playerInfoCommands.updateMoneyCommand(
				settings.startingMoney
			)
		);
		entity.put(
			PlayerCommands.playerInfoCommands.updateLevelCommand({
				level: settings.startingLevel,
				xp: 0,
			})
		);
	}

	private runPlayerNetworking(
		entity: Player,
		socket: GameSocket
	) {
		return playerNetworking(
			entity,
			socket,
			{
				getRoundInfo: this.gamemode.getRoundInfo,
				getPlayers: this.gamemode.getPlayerListPlayers,
			},
			this.settings
		);
	}
}

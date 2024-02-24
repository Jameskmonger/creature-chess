import { Task } from "redux-saga";
import { put } from "typed-redux-saga";
import { v4 as uuid } from "uuid";

import {
	Gamemode,
	PlayerCommands,
	PlayerEntity,
} from "@creature-chess/gamemode";
import { DEFAULT_GAME_OPTIONS } from "@creature-chess/models/config";
import { PlayerStatus } from "@creature-chess/models/game/playerList";
import { LobbyPlayer } from "@creature-chess/models/lobby";
import { GamemodeSettings } from "@creature-chess/models/settings";

import { botLogicSaga } from "@cc-server/bot";
import { BotPersonality } from "@cc-server/data";

import { logger } from "./log";
import { playerNetworking } from "./player";
import { createPlayerEntity } from "./player/entity";
import { AuthenticatedSocket } from "./player/socket";

type GameMember = {
	type: "BOT" | "PLAYER";
	id: string;
	networkingSaga?: Task;
	entity: PlayerEntity;
};

export type PlayerGameParticipant = {
	player: LobbyPlayer;
	socket: AuthenticatedSocket;
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
	onFinish: (winner: PlayerEntity) => void;
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
		this.gamemode = new Gamemode(gameId, logger, DEFAULT_GAME_OPTIONS);

		for (const player of players) {
			this.registerPlayer(player);
		}

		for (const bot of bots) {
			this.registerBot(bot);
		}

		this.gamemode.onFinish(onFinish);

		const entities = this.members.map((m) => m.entity);
		this.gamemode.start(entities);
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
				`PlayerEntity couldn't be found when connecting to Game: ${socket.data.nickname}`
			);
		}

		existing.networkingSaga?.cancel();

		existing.networkingSaga = this.runPlayerNetworking(entity, socket);
	}

	private registerPlayer(player: PlayerGameParticipant) {
		const {
			player: { id, name, profile },
			socket,
		} = player;

		// TODO (James) id is a string but we need a number to preserve old Faunadb id type, convert in future
		const playerIdAsString = id.toString();

		const entity = createPlayerEntity(
			this.gamemode,
			playerIdAsString,
			name,
			profile,
			this.settings
		);

		this.initialisePlayer(entity);

		this.members.push({
			type: "PLAYER",
			id: playerIdAsString,
			networkingSaga: this.runPlayerNetworking(entity, socket),
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

		const entity = createPlayerEntity(
			this.gamemode,
			playerIdAsString,
			name,
			profile,
			this.settings
		);

		this.initialisePlayer(entity);

		entity.runSaga(botLogicSaga, personality);

		this.members.push({
			type: "BOT",
			id: playerIdAsString,
			entity,
		});
	}

	private initialisePlayer(entity: PlayerEntity) {
		const settings = this.settings;

		entity.runSaga(function* () {
			yield put(PlayerCommands.updateMoneyCommand(settings.startingMoney));
			yield put(
				PlayerCommands.updateLevelCommand({
					level: settings.startingLevel,
					xp: 0,
				})
			);
		});
	}

	private runPlayerNetworking(
		entity: PlayerEntity,
		socket: AuthenticatedSocket
	) {
		return entity.runSaga(
			playerNetworking,
			socket,
			{
				getRoundInfo: this.gamemode.getRoundInfo,
				getPlayers: this.gamemode.getPlayerListPlayers,
			},
			this.settings
		);
	}
}

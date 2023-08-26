import { Task } from "redux-saga";
import { v4 as uuid } from "uuid";

import { botLogicSaga } from "@cc-server/bot";
import { BotPersonality } from "@cc-server/data";
import { Gamemode, PlayerEntity } from "@creature-chess/gamemode";
import { LobbyPlayer, PlayerStatus } from "@creature-chess/models";

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

	public constructor(
		{ players, bots }: Participants,
		{ onFinish }: GameOptions
	) {
		const gameId = uuid();
		this.gamemode = new Gamemode(gameId, logger);

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
			profile
		);

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
			profile
		);
		entity.runSaga(botLogicSaga, personality);

		this.members.push({
			type: "BOT",
			id: playerIdAsString,
			entity,
		});
	}

	private runPlayerNetworking(
		entity: PlayerEntity,
		socket: AuthenticatedSocket
	) {
		return entity.runSaga(playerNetworking, socket, {
			getRoundInfo: this.gamemode.getRoundInfo,
			getPlayers: this.gamemode.getPlayerListPlayers,
		});
	}
}

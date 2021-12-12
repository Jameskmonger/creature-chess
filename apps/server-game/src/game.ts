import { v4 as uuid } from "uuid";
import { Gamemode, PlayerEntity } from "@creature-chess/gamemode";
import { logger } from "./log";
import { AuthenticatedSocket } from "./player/socket";
import { Task } from "redux-saga";
import { playerNetworking, reconnectPlayerSocket } from "./player";
import { BotPersonality } from "@creature-chess/data";
import { LobbyPlayer } from "@creature-chess/models";
import { createPlayerEntity } from "./player/entity";
import { botLogicSaga } from "@creature-chess/bot";

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

		const entities = this.members.map(m => m.entity);
		this.gamemode.start(entities);
	}

	public isInGame(playerId: string) {
		return this.gamemode.getPlayerById(playerId) !== null;
	}

	public connect(socket: AuthenticatedSocket) {
		const existing = this.members.find(m => m.id === socket.data.id);

		if (!existing) {
			throw Error(`GameMember couldn't be found when connecting to Game: ${socket.data.nickname}`);
		}

		const entity = this.gamemode.getPlayerById(socket.data.id);

		if (!entity) {
			throw Error(`PlayerEntity couldn't be found when connecting to Game: ${socket.data.nickname}`);
		}

		existing.networkingSaga?.cancel();

		existing.networkingSaga = entity.runSaga(playerNetworking, socket);

		// todo reconsider this
		entity.runSaga(
			reconnectPlayerSocket,
			socket,
			this.gamemode.getRoundInfo(),
			this.gamemode.getPlayerListPlayers()
		);
	}

	private registerPlayer(player: PlayerGameParticipant) {
		const {
			player: {
				id, name, profile
			},
			socket
		} = player;

		const entity = createPlayerEntity(this.gamemode, id, name, profile);

		this.members.push({
			type: "PLAYER",
			id: player.player.id,
			networkingSaga: entity.runSaga(playerNetworking, socket),
			entity
		});
	}

	private registerBot(player: BotGameParticipant) {
		const {
			player: {
				id, name, profile
			},
			personality
		} = player;

		const entity = createPlayerEntity(this.gamemode, id, name, profile);
		entity.runSaga(botLogicSaga, personality);

		this.members.push({
			type: "BOT",
			id: player.player.id,
			entity
		});
	}
}

// tslint:disable: no-console
import { Socket } from "socket.io";
import { EventEmitter } from "events";
import { Task } from "redux-saga";
import { OutgoingRegistry } from "@shoki/networking";
import { LOBBY_WAIT_TIME as LOBBY_WAIT_TIME_SECONDS, LobbyPlayer, MAX_PLAYERS_IN_GAME, PieceModel, PlayerProfile } from "@creature-chess/models";
import { LobbyServerToClient } from "@creature-chess/networking";
import { DatabaseConnection } from "@creature-chess/data";
import { Game, PlayerEntity, playerEntity, PlayerStateSelectors } from "@creature-chess/gamemode";
import { botLogicSaga } from "@creature-chess/bot";
import { createWinstonLogger } from "../log";
import { playerNetworking, reconnectPlayerSocket } from "../player";
import { v4 as uuid } from "uuid";
import { createBoardSlice } from "@shoki/board";
import { Logger } from "winston";

type PlayerConnections = {
	[playerId: string]: {
		socket: Socket;
		networkingSaga: Task | null;
		lobbyRegistry: OutgoingRegistry<LobbyServerToClient.PacketSet> | null;
	};
};

const createPlayer = (logger: Logger, game: Game, playerId: string, name: string, profile: PlayerProfile) => {
	const boardSlices = {
		boardSlice: createBoardSlice<PieceModel>(`player-${playerId}-board`, { width: 7, height: 3 }),
		benchSlice: createBoardSlice<PieceModel>(`player-${playerId}-bench`, { width: 7, height: 1 })
	};

	return playerEntity(
		playerId,
		{
			logger,
			game,
			boardSlices
		},
		{
			match: null,
			name,
			profile
		}
	);
};

export class Lobby {
	public readonly gameStartTime: number | null = null;

	private members: LobbyPlayer[] = [];
	private events: EventEmitter = new EventEmitter();

	private gameStarting: boolean = false;
	private game: Game | null = null;

	private playerConnections: PlayerConnections = {};

	public constructor(
		public readonly id: string,
		private database: DatabaseConnection
	) {
		const waitTimeMs = LOBBY_WAIT_TIME_SECONDS * 1000;
		this.gameStartTime = Date.now() + waitTimeMs;
		setTimeout(this.startGame, waitTimeMs);
	}

	public onFinish(fn: () => void) {
		this.events.on("finish", fn);
	}

	public addConnection(socket: Socket, member: LobbyPlayer) {
		if (this.getFreeSlotCount() === 0) {
			throw Error(`Player ${member.id} tried to join game ${this.id} that was not joinable`);
		}

		const index = this.members.push(member);

		this.connectLobbyPlayer(member, socket);

		for (const other of this.members) {
			if (other.id === member.id) {
				continue;
			}

			this.sendMemberLobbyUpdateEvent(other, index, member);
		}

		if (this.members.length === MAX_PLAYERS_IN_GAME) {
			this.startGame();
		}
	}

	public reconnect(id: string, socket: Socket) {
		const member = this.members.find(p => p.id === id);

		if (!member) {
			console.error("No matching player");
			return;
		}

		this.playerConnections[member.id]?.socket.disconnect();

		if (this.game) {
			const player = this.game.getPlayerById(member.id);

			if (!player) {
				console.error("unable to find player in game to reconnect");
				return;
			}

			this.connectGamePlayer(player, this.game, socket);
		} else {
			this.connectLobbyPlayer(member, socket);
		}
	}

	public getMemberById(id: string) {
		const game = this.game;

		if (game) {
			return this.members.find(m => m.id && game.getPlayerById(id)?.select(PlayerStateSelectors.isPlayerAlive));
		}

		return this.members.find(m => m.id === id);
	}

	public getFreeSlotCount() {
		return (
			(this.gameStarting || this.game !== null)
				? 0
				: MAX_PLAYERS_IN_GAME - this.members.length
		);
	}

	private connectLobbyPlayer(player: LobbyPlayer, socket: Socket) {
		const registry = LobbyServerToClient.outgoing(
			(opcode, payload, ack) => socket.emit(opcode, payload, ack)
		);

		registry.send("connected", {
			lobbyId: this.id,
			players: [...this.members],
			startTimestamp: this.gameStartTime!
		});

		this.playerConnections[player.id] = {
			socket,
			lobbyRegistry: registry,
			networkingSaga: null
		};
	}

	private connectGamePlayer(player: PlayerEntity, game: Game, socket: Socket) {
		this.playerConnections[player.id]?.networkingSaga?.cancel();

		this.playerConnections[player.id] = {
			socket,
			lobbyRegistry: null,
			networkingSaga: player.runSaga(playerNetworking, socket)
		};

		player.runSaga(
			reconnectPlayerSocket,
			socket,
			game.getRoundInfo(),
			game.getPlayerListPlayers()
		);
	}

	private startGame = async () => {
		if (this.gameStarting || this.game !== null) {
			throw Error("Tried to start already-started game");
		}

		const botsRequired = this.getFreeSlotCount();

		this.members
			.forEach(player => {
				this.playerConnections[player.id]?.lobbyRegistry?.send("gameStarted", { empty: true });
			});

		Object.keys(this.playerConnections)
			.forEach(playerId => {
				this.playerConnections[playerId].lobbyRegistry = null;
			});

		this.gameStarting = true;

		const gameId = uuid();
		const logger = createWinstonLogger(`match-${gameId}`);
		this.game = new Game(gameId, logger);

		const userPlayers: PlayerEntity[] = [];
		const botPlayers: PlayerEntity[] = [];

		for (const member of this.members) {
			const player = createPlayer(logger, this.game, member.id, member.name, member.profile);

			await this.database.user.addGamePlayed(player.id);

			const socket = this.playerConnections[player.id]?.socket;

			this.playerConnections[player.id].networkingSaga = player.runSaga(playerNetworking, socket);

			userPlayers.push(player);
		}

		const bots = await this.database.bot.getLeastPlayedBots(botsRequired);
		for (const { ref: { id }, data: { nickname, personality } } of bots!) {
			// get a random picture from one to 20 - temporary
			const picture = Math.floor(Math.random() * 20) + 1;

			const player = createPlayer(logger, this.game, id, `[BOT] ${nickname}`, { title: null, picture });

			await this.database.bot.addGamePlayed(player.id);

			player.runSaga(botLogicSaga, personality);

			botPlayers.push(player);
		}

		this.game.onFinish((winner) => {
			if (userPlayers.includes(winner)) {
				this.database.user.addWin(winner.id);
			}

			if (botPlayers.includes(winner)) {
				this.database.bot.addWin(winner.id);
			}

			this.events.emit("finish");
		});

		this.game.start([
			...userPlayers,
			...botPlayers
		]);
	};

	private sendMemberLobbyUpdateEvent(member: LobbyPlayer, index: number, other: LobbyPlayer) {
		this.playerConnections[member.id]?.lobbyRegistry?.send(
			"lobbyPlayerUpdate",
			{ index, player: other }
		);
	}
}

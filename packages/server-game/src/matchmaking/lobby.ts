// tslint:disable: no-console
import { Socket } from "socket.io";
import { EventEmitter } from "events";
import { LOBBY_WAIT_TIME as LOBBY_WAIT_TIME_SECONDS, LobbyPlayer, PlayerProfile, MAX_PLAYERS_IN_GAME } from "@creature-chess/models";
import { ServerToClient, OutgoingPacketRegistry } from "@creature-chess/networking";
import { DatabaseConnection } from "@creature-chess/data";
import { Game, Player, PlayerType } from "../../../gamemode/lib";
import { incomingNetworking } from "../player/socket/net/incoming";
import { outgoingNetworking } from "../player/socket/net/outgoing";
import { put } from "redux-saga/effects";
import { newPlayerSocketEvent } from "../player/socket/events";
import { botLogicSaga } from "../player/bot/saga";
import { createWinstonLogger } from "../log";
import { reconnectPlayerSocket } from "../player/socket/net/reconnect";

type OutgoingRegistry = OutgoingPacketRegistry<
	ServerToClient.Lobby.PacketDefinitions,
	ServerToClient.Lobby.PacketAcknowledgements
>;

export class Lobby {
	public readonly gameStartTime: number | null = null;

	private members: LobbyPlayer[] = [];
	private events: EventEmitter = new EventEmitter();

	private gameStarting: boolean = false;
	private game: Game | null = null;
	private playerSockets: { [playerId: string]: Socket } = {};
	private playerRegistries: { [playerId: string]: OutgoingRegistry } = {};

	constructor(
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

		this.createOutgoingLobbyRegistry(member, socket);

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

		this.playerSockets[member.id]?.disconnect();

		if (this.game) {
			const player = this.game.getPlayerById(member.id);

			if (!player) {
				console.error("unable to find player in game to reconnect");
				return;
			}

			// todo tidy this up
			player.runSaga(incomingNetworking);
			player.runSaga(outgoingNetworking);

			player.runSaga(
				reconnectPlayerSocket,
				socket,
				this.game.getRoundInfo(),
				this.game.getPlayerListPlayers()
			);
		} else {
			this.createOutgoingLobbyRegistry(member, socket);
		}
	}

	public getMemberById(id: string) {
		const game = this.game;

		if (game) {
			return this.members.find(m => m.id && game.getPlayerById(id)?.isAlive());
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

	private startGame = async () => {
		if (this.gameStarting || this.game !== null) {
			throw Error("Tried to start already-started game");
		}

		const botsRequired = this.getFreeSlotCount();

		this.members
			.forEach(player => {
				this.playerRegistries[player.id]?.emit(ServerToClient.Lobby.PacketOpcodes.LOBBY_GAME_STARTED, { empty: true });
			});

		this.gameStarting = true;

		const players: Player[] = [];

		for (const member of this.members) {
			const player = new Player(PlayerType.USER, member.id, member.name, member.profile);

			await this.database.user.addGamePlayed(player.id);

			player.runSaga(incomingNetworking);
			player.runSaga(outgoingNetworking);

			const socket = this.playerSockets[member.id];

			player.runSaga(function*() {
				yield put(newPlayerSocketEvent(socket));
			});

			players.push(player);
		}

		const bots = await this.database.bot.getLeastPlayedBots(botsRequired);
		for (const { id, name } of bots!) {
			// get a random picture from one to 20 - temporary
			const picture = Math.floor(Math.random() * 20) + 1;

			const player = new Player(PlayerType.BOT, id, `[BOT] ${name}`, { title: null, picture });

			await this.database.bot.addGamePlayed(player.id);

			player.runSaga(botLogicSaga);

			players.push(player);
		}

		this.game = new Game(gameId => createWinstonLogger(`match-${gameId}`), players);

		this.game.onFinish((winner) => {
			if (winner.type === PlayerType.USER) {
				this.database.user.addWin(winner.id);
			}

			if (winner.type === PlayerType.BOT) {
				this.database.bot.addWin(winner.id);
			}

			this.events.emit("finish");
		});
	}

	private createOutgoingLobbyRegistry(player: LobbyPlayer, socket: Socket) {
		const registry = new OutgoingPacketRegistry<
			ServerToClient.Lobby.PacketDefinitions,
			ServerToClient.Lobby.PacketAcknowledgements
		>(
			(opcode, payload, ack) => socket.emit(opcode, payload, ack)
		);

		socket.emit(ServerToClient.Menu.PacketOpcodes.LOBBY_CONNECTED, {
			lobbyId: this.id,
			players: [...this.members],
			startTimestamp: this.gameStartTime
		});

		this.playerSockets[player.id] = socket;
		this.playerRegistries[player.id] = registry;
	}

	private sendMemberLobbyUpdateEvent(member: LobbyPlayer, index: number, other: LobbyPlayer) {
		this.playerRegistries[member.id]?.emit(ServerToClient.Lobby.PacketOpcodes.LOBBY_PLAYER_UPDATE, {
			index, player: other
		});
	}
}

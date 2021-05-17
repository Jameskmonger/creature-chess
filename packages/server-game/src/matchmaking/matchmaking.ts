import { Logger } from "winston";
import delay from "delay";
import io = require("socket.io");
import { DatabaseConnection } from "@creature-chess/data";
import { UserModel } from "@creature-chess/auth-server";
import { LobbyPlayer } from "@creature-chess/models";
import { DiscordApi } from "../discord";
import { createMetricLogger } from "../metrics";
import { IdGenerator } from "./id-generator";
import { Lobby } from "./lobby";

export class Matchmaking {
	private lobbies = new Map<string, Lobby>();
	private lobbyIdGenerator = new IdGenerator();
	private metrics = createMetricLogger();
	private searchingForGame: boolean = false;

	public constructor(private logger: Logger, private database: DatabaseConnection, private discordApi: DiscordApi) {
		setInterval(this.sendMetrics, 60 * 1000);
	}

	public async findGame(socket: io.Socket, user: UserModel) {
		while (this.searchingForGame) {
			await delay(250);
		}

		this.searchingForGame = true;

		const { id, nickname, profile } = user;

		const lobby = this.getLobbyContainingPlayer(id);

		if (lobby) {
			lobby.reconnect(id, socket);

			this.searchingForGame = false;

			return;
		}

		const player: LobbyPlayer = {
			id,
			name: nickname!,
			profile: profile!
		};

		const { lobby: newLobby, created } = await this.findOrCreateLobby();
		newLobby.addConnection(socket, player);

		if (created) {
			this.discordApi.startLobby(nickname!);
		}

		this.searchingForGame = false;
	}

	private getLobbyContainingPlayer(id: string) {
		const lobbies = Array.from<Lobby>(this.lobbies.values());

		return lobbies.find(g => g.getMemberById(id)) || null;
	}

	private async findOrCreateLobby(): Promise<{ lobby: Lobby; created: boolean }> {
		const lobbies = Array.from(this.lobbies.values())
			.filter(lobby => lobby.getFreeSlotCount() > 0);

		if (lobbies.length === 0) {
			return {
				lobby: await this.createLobby(),
				created: true
			};
		}

		lobbies.sort((a, b) => a.getFreeSlotCount() - b.getFreeSlotCount());

		return {
			lobby: lobbies[0],
			created: false
		};
	}

	private async createLobby() {
		const lobby = new Lobby(this.lobbyIdGenerator.generateId(), this.database);

		this.lobbies.set(lobby.id, lobby);

		lobby.onFinish(() => {
			this.lobbies.delete(lobby.id);

			this.sendMetrics();
		});

		this.logger.info(`[Lobby ${lobby.id}] created`);

		return lobby;
	}

	private sendMetrics = () => {
		this.metrics.sendGameCount(this.lobbies.size);
	};
}

import delay from "delay";
import { DatabaseConnection } from "@creature-chess/data";
import { LobbyPlayer } from "@creature-chess/models";
import { DiscordApi } from "../external/discord";
import { IdGenerator } from "./id-generator";
import { Lobby } from "./lobby";
import { AuthenticatedSocket } from "../socket";
import { logger } from "../log";

export class Matchmaking {
	private lobbies = new Map<string, Lobby>();
	private lobbyIdGenerator = new IdGenerator();
	private searchingForGame: boolean = false;

	public constructor(private database: DatabaseConnection, private discordApi: DiscordApi) {
	}

	public async findGame(socket: AuthenticatedSocket) {
		while (this.searchingForGame) {
			await delay(250);
		}

		this.searchingForGame = true;

		const { id, nickname, profile } = socket.data as Required<typeof socket.data>;

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
		});

		logger.info(`[Lobby ${lobby.id}] created`);

		return lobby;
	}
}

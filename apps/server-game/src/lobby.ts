import { OutgoingRegistry } from "@shoki/networking";

import { LobbyPlayer } from "@creature-chess/models/lobby";
import { PlayerProfile } from "@creature-chess/models/player";
import { LobbyServerToClient } from "@creature-chess/networking";

import { AuthenticatedSocket } from "./player/socket";

type LobbyMember = {
	player: LobbyPlayer;
	socket: AuthenticatedSocket;
	registry: OutgoingRegistry<LobbyServerToClient.PacketSet> | null;
};

const createRegistry = (socket: AuthenticatedSocket) =>
	LobbyServerToClient.outgoing((opcode, payload, ack) =>
		socket.emit(opcode, payload, ack)
	);

type LobbyOptions = {
	waitTimeS: number;
	maxPlayers: number;
	onStart: (
		members: { player: LobbyPlayer; socket: AuthenticatedSocket }[]
	) => void;
};

export class Lobby {
	private members: LobbyMember[] = [];
	private gameStartTime: number;

	private autoStart: NodeJS.Timeout;

	public constructor(private options: LobbyOptions) {
		this.gameStartTime = Date.now() + this.options.waitTimeS * 1000;

		this.autoStart = setTimeout(this.start, this.options.waitTimeS * 1000);
	}

	public getFreeSlotCount() {
		return this.options.maxPlayers - this.members.length;
	}

	public isInLobby(playerId: string) {
		return this.members.some((m) => m.player.id === playerId);
	}

	public connect(socket: AuthenticatedSocket) {
		const registry = createRegistry(socket);

		const existing = this.members.find((m) => m.player.id === socket.data.id);
		if (existing) {
			existing.socket?.disconnect(true);

			existing.socket = socket;
			existing.registry = registry;
		} else {
			const defaultProfile: PlayerProfile = {
				picture: 1,
				title: null,
			};

			const newMember = {
				player: {
					id: socket.data.id,
					name: socket.data.nickname!,
					profile: socket.data.profile ?? defaultProfile,
				},
				socket,
				registry,
			};

			this.members.push(newMember);
			this.notifyOthers(newMember);
		}

		setTimeout(() => {
			this.sendConnected(registry);

			if (this.members.length === this.options.maxPlayers) {
				this.start();
			}
		}, 500);
	}

	private start = () => {
		clearTimeout(this.autoStart);

		const members = this.members.map((m) => ({
			player: m.player,
			socket: m.socket,
		}));

		this.options.onStart(members);

		this.members = [];
	};

	private notifyOthers(member: LobbyMember) {
		for (const other of this.members) {
			if (!other || other === member) {
				continue;
			}

			other.registry?.send("lobbyUpdate", {
				players: this.getLobbyPlayers(),
			});
		}
	}

	private sendConnected(
		registry: OutgoingRegistry<LobbyServerToClient.PacketSet>
	) {
		registry.send("connected", {
			players: this.getLobbyPlayers(),
			startTimestamp: this.gameStartTime!,

			maxPlayers: this.options.maxPlayers,
			lobbyWaitTimeSeconds: this.options.waitTimeS,
		});
	}

	private getLobbyPlayers(): LobbyPlayer[] {
		return this.members.map(
			({
				socket: {
					data: { id, nickname, profile },
				},
			}) => ({
				id,
				name: nickname as string,
				profile: profile as PlayerProfile,
			})
		);
	}
}

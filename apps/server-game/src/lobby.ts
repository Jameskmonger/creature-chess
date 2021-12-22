import { LobbyPlayer, PlayerProfile } from "@creature-chess/models";
import { LobbyServerToClient } from "@creature-chess/networking";
import { OutgoingRegistry } from "@shoki/networking";
import { logger } from "./log";
import { AuthenticatedSocket } from "./player/socket";

type LobbyMember = {
	player: LobbyPlayer;
	socket: AuthenticatedSocket;
	registry: OutgoingRegistry<LobbyServerToClient.PacketSet> | null;
};

const createRegistry = (socket: AuthenticatedSocket) =>
	LobbyServerToClient.outgoing(
		(opcode, payload, ack) => socket.emit(opcode, payload, ack)
	);

type LobbyOptions = {
	waitTimeMs: number;
	maxPlayers: number;
	onStart: (members: ({ player: LobbyPlayer; socket: AuthenticatedSocket })[]) => void;
};

export class Lobby {
	private members: LobbyMember[] = [];
	private gameStartTime: number;

	private autoStart: NodeJS.Timeout;

	public constructor(private options: LobbyOptions) {
		this.gameStartTime = Date.now() + this.options.waitTimeMs;

		this.autoStart = setTimeout(this.start, this.options.waitTimeMs);
	}

	public getFreeSlotCount() {
		return this.options.maxPlayers - this.members.length;
	}

	public isInLobby(playerId: string) {
		return this.members.some(m => m.player.id === playerId);
	}

	public connect(socket: AuthenticatedSocket) {
		const registry = createRegistry(socket);

		const existing = this.members.find(m => m.player.id === socket.data.id);
		if (existing) {
			existing.socket?.disconnect(true);
		} else {
			const index = this.members.push({
				player: {
					id: socket.data.id,
					name: socket.data.nickname!,
					profile: socket.data.profile!,
				},
				socket,
				registry
			}) - 1;

			this.notifyOthers(index);
		}

		this.sendConnected(registry);

		if (this.members.length === this.options.maxPlayers) {
			this.start();
		}
	}

	private start = () => {
		clearTimeout(this.autoStart);

		const members = this.members.map(
			m => ({
				player: m.player,
				socket: m.socket
			})
		);

		this.options.onStart(members);
		this.notifyStart();

		this.members = [];
	};

	private notifyOthers(memberIndex: number) {
		const member = this.members[memberIndex];

		if (!member) {
			logger.warn("No member found", { memberIndex });
			return;
		}

		for (const other of this.members) {
			if (!other) {
				continue;
			}

			if (other.player.id === member.player.id) {
				continue;
			}

			this.sendOtherMemberUpdate(other, memberIndex, member);
		}
	}

	/**
	 * Send an event to notify all LobbyMembers of game start
	 */
	private notifyStart() {
		this.members.forEach(m =>
			m.registry?.send("gameStarted", { empty: true })
		);
	}

	private sendConnected(registry: OutgoingRegistry<LobbyServerToClient.PacketSet>) {
		registry.send("connected", {
			players: this.getLobbyPlayers(),
			startTimestamp: this.gameStartTime!
		});
	}

	private getLobbyPlayers(): LobbyPlayer[] {
		return this.members.map(
			({
				socket: {
					data: { id, nickname, profile }
				}
			}) => ({
				id,
				name: nickname as string,
				profile: profile as PlayerProfile
			})
		);
	}

	private sendOtherMemberUpdate(member: LobbyMember, index: number, other: LobbyMember) {
		member.registry?.send(
			"lobbyPlayerUpdate",
			{ index, player: other.player }
		);
	}
}

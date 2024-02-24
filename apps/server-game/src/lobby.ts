import { IncomingRegistry, OutgoingRegistry } from "@shoki/networking";

import { LobbyPlayer } from "@creature-chess/models/lobby";
import { PlayerProfile } from "@creature-chess/models/player";
import {
	GamemodeSettings,
	GamemodeSettingsPresets,
} from "@creature-chess/models/settings";
import {
	LobbyClientToServer,
	LobbyServerToClient,
} from "@creature-chess/networking";

import { logger } from "./log";
import { AuthenticatedSocket } from "./player/socket";

type LobbyMember = {
	player: LobbyPlayer;
	socket: AuthenticatedSocket;
	incomingRegistry: IncomingRegistry<LobbyClientToServer.PacketSet> | null;
	outgoingRegistry: OutgoingRegistry<LobbyServerToClient.PacketSet> | null;
};

const createRegistry = (socket: AuthenticatedSocket) => ({
	outgoing: LobbyServerToClient.outgoing((opcode, payload, ack) =>
		socket.emit(opcode, payload, ack)
	),
	incoming: LobbyClientToServer.incoming(
		(opcode, handler) => socket.on(opcode, handler as any),
		(opcode, handler) => socket.off(opcode, handler as any)
	),
});

type LobbyOptions = {
	waitTimeS: number;
	maxPlayers: number;
	onStart: (
		settings: GamemodeSettings,
		members: { player: LobbyPlayer; socket: AuthenticatedSocket }[]
	) => void;
};

export class Lobby {
	private members: LobbyMember[] = [];
	private gameStartTime: number;

	private gamemodeSettings: GamemodeSettings = {
		...GamemodeSettingsPresets["default"],
	};

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
		const { incoming, outgoing } = createRegistry(socket);

		let member: LobbyMember;

		const existing = this.members.find((m) => m.player.id === socket.data.id);
		if (existing) {
			existing.socket?.disconnect(true);

			existing.socket = socket;
			existing.outgoingRegistry = outgoing;
			existing.incomingRegistry = incoming;

			member = existing;
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
				incomingRegistry: incoming,
				outgoingRegistry: outgoing,
			};

			this.members.push(newMember);
			this.notifyOthers(newMember);

			member = newMember;
		}

		// delay the connected event to allow the client to set up the registry
		setTimeout(() => {
			this.sendConnected(outgoing);

			if (this.members.length === this.options.maxPlayers) {
				this.start();
			}

			incoming.on("startNow", () => {
				logger.info("Lobby start requested by player");
				this.start();
			});

			incoming.on("updateSetting", ({ key, value }) => {
				this.updateSetting(key, value);
			});
		}, 500);
	}

	private start = () => {
		clearTimeout(this.autoStart);

		const members = this.members.map((m) => ({
			player: m.player,
			socket: m.socket,
		}));

		this.options.onStart(this.gamemodeSettings, members);

		this.members = [];
	};

	private notifyOthers(member: LobbyMember) {
		for (const other of this.members) {
			if (!other || other === member) {
				continue;
			}

			other.outgoingRegistry?.send("lobbyUpdate", {
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
			settings: this.gamemodeSettings,
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

	private updateSetting(key: keyof GamemodeSettings, value: string) {
		if (Object.keys(this.gamemodeSettings).includes(key) === false) {
			logger.error("Invalid gamemode setting key", { key });
			return;
		}

		if (typeof this.gamemodeSettings[key] === "number") {
			const parsed = parseInt(value, 10);

			if (isNaN(parsed)) {
				logger.error("Invalid gamemode setting value", { key, value });
				return;
			}

			this.gamemodeSettings[key] = parsed;
		} else {
			// TODO (jkm) validate other types
			// @ts-ignore
			this.gamemodeSettings[key] = value;
		}

		for (const member of this.members) {
			member.outgoingRegistry?.send("settingsUpdate", {
				settings: this.gamemodeSettings,
			});
		}
	}
}

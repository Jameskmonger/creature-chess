import { LobbyPlayer } from "@creature-chess/models";
import { PlayerProfile, creaturePicture } from "@creature-chess/models";
import {
	GamemodeSettings,
	GamemodeSettingsPresets,
} from "@creature-chess/models";

import { logger } from "./log";
import { AuthenticatedSocket, LobbySocket } from "./player/socket";

type LobbyMember = {
	player: LobbyPlayer;
	socket: LobbySocket;
};

type LobbyOptions = {
	waitTimeS: number;
	maxPlayers: number;
	onStart: (
		settings: GamemodeSettings,
		members: { player: LobbyPlayer; socket: LobbySocket }[]
	) => void;
};

export class Lobby {
	private members: LobbyMember[] = [];
	private gameStartTime: number;

	private gamemodeSettings: GamemodeSettings = {
		...GamemodeSettingsPresets["default"],
	};

	private autoStart: NodeJS.Timeout;

	private availableGuestNames = [
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
	];

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
		const lobbySocket = socket as unknown as LobbySocket;
		let member: LobbyMember;

		const existing = this.members.find(
			(m) => m.player.id === lobbySocket.data.id
		);
		if (existing) {
			existing.socket?.disconnect(true);

			existing.socket = lobbySocket;

			member = existing;
		} else {
			const defaultProfile: PlayerProfile = {
				picture: creaturePicture(1),
				title: null,
			};

			const name =
				lobbySocket.data.nickname ?? `Guest ${this.getGuestName()}`;

			const newMember = {
				player: {
					id: lobbySocket.data.id,
					name,
					profile: lobbySocket.data.profile ?? defaultProfile,
					type: lobbySocket.data.type,
				},
				socket: lobbySocket,
			};

			this.members.push(newMember);
			this.notifyOthers(newMember);

			member = newMember;
		}

		// delay the connected event to allow the client to set up
		setTimeout(() => {
			this.sendConnected(lobbySocket);

			if (this.members.length === this.options.maxPlayers) {
				this.start();
			}

			lobbySocket.on("startNow", () => {
				logger.info("Lobby start requested by player");
				this.start();
			});

			lobbySocket.on("updateSetting", ({ key, value }) => {
				this.updateSetting(key, value);
			});
		}, 500);
	}

	private getGuestName() {
		return this.availableGuestNames.shift();
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

			other.socket.emit("lobbyUpdate", {
				players: this.getLobbyPlayers(),
			});
		}
	}

	private sendConnected(socket: LobbySocket) {
		socket.emit("connected", {
			players: this.getLobbyPlayers(),
			startTimestamp: this.gameStartTime!,

			maxPlayers: this.options.maxPlayers,
			lobbyWaitTimeSeconds: this.options.waitTimeS,
			settings: this.gamemodeSettings,
		});
	}

	private getLobbyPlayers(): LobbyPlayer[] {
		return this.members.map(({ player }) => ({ ...player }));
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
			member.socket.emit("settingsUpdate", {
				settings: this.gamemodeSettings,
			});
		}
	}
}

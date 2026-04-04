import { Socket } from "socket.io-client";

import { LobbyServerToClient } from "@creature-chess/networking";

import { LobbyCommands } from "~/store/lobby/state";

import type { Dispatch } from "./types";

export class LobbyConnection {
	private cleanupFns: (() => void)[] = [];

	constructor(
		private socket: Socket,
		private dispatch: Dispatch,
	) {
		this.setupListeners();
	}

	handleConnected(payload: LobbyServerToClient.LobbyConnectionPacket) {
		this.dispatch(LobbyCommands.connectToLobby(payload));
	}

	sendStartNow() {
		this.socket.emit("startNow", { empty: true });
	}

	sendUpdateSetting(key: string, value: string) {
		this.socket.emit("updateSetting", { key, value });
	}

	destroy() {
		for (const cleanup of this.cleanupFns) {
			cleanup();
		}
		this.cleanupFns = [];
	}

	private setupListeners() {
		const onLobbyUpdate = (payload: LobbyServerToClient.LobbyUpdatePacket) => {
			this.dispatch(LobbyCommands.updatePlayers(payload));
		};

		const onSettingsUpdate = (payload: LobbyServerToClient.LobbySettingsUpdatePacket) => {
			this.dispatch(LobbyCommands.updateSettings(payload));
		};

		this.socket.on("lobbyUpdate", onLobbyUpdate);
		this.socket.on("settingsUpdate", onSettingsUpdate);

		this.cleanupFns.push(
			() => this.socket.off("lobbyUpdate", onLobbyUpdate),
			() => this.socket.off("settingsUpdate", onSettingsUpdate),
		);
	}
}

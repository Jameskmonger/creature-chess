import { ClientUi } from "@creature-chess/models";
import { io, Socket } from "socket.io-client";
import { MenuCommands } from "~/store/menu/state";
import { Holder } from "~/utils/Holder";

import {
	GameServerToClient,
	LobbyServerToClient,
} from "@creature-chess/networking";
import { HandshakeRequest } from "@creature-chess/networking";

import { GameConnection } from "./GameConnection";
import { LobbyConnection } from "./LobbyConnection";
import { resolveHandshake } from "./sessionSources";
import type { Dispatch } from "./types";

// How long to wait for the server's reconnect verdict before giving up and
// falling through to the menu.
const RECONNECT_TIMEOUT_MS = 5000;

export class SocketManager {
	private socket: Socket | null = null;
	private cleanupConnectionListeners: (() => void) | null = null;

	public constructor(
		private dispatch: Dispatch,
		private gameConnectionHolder: Holder<GameConnection>,
		private lobbyConnectionHolder: Holder<LobbyConnection>,
		private accountIdHolder: Holder<string>
	) {}

	public async connect(): Promise<void> {
		this.dispatch(MenuCommands.setLoadingMessage("Connecting..."));

		const request = await resolveHandshake();

		if (!request) {
			this.dispatch(
				MenuCommands.setLoadingMessage("ERROR: Failed to open session!")
			);
			return;
		}

		try {
			await this.connectSocket(request);
		} catch (error) {
			console.error("error getting socket", error);
			return;
		}

		this.listenForConnection();
		this.socket?.emit("play");
	}

	/**
	 * Silently authenticate and rejoin an existing game/lobby if the player has
	 * one. Resolves true once reconnected, or false (tearing the socket down) if
	 * the server reports no game, the handshake fails, or the check times out.
	 */
	public async reconnectToExistingGame(): Promise<boolean> {
		const request = await resolveHandshake();

		if (!request) {
			return false;
		}

		try {
			await this.connectSocket(request);
		} catch (error) {
			console.error("error getting socket", error);
			return false;
		}

		this.listenForConnection();

		const socket = this.socket;
		if (!socket) {
			return false;
		}

		return new Promise<boolean>((resolve) => {
			let settled = false;

			const finish = (found: boolean) => {
				if (settled) {
					return;
				}
				settled = true;
				socket.off("connected", onFound);
				socket.off("gameConnected", onFound);
				socket.off("noGame", onNone);
				clearTimeout(timer);
				if (!found) {
					this.disconnect();
				}
				resolve(found);
			};

			const onFound = () => finish(true);
			const onNone = () => finish(false);
			const timer = setTimeout(() => finish(false), RECONNECT_TIMEOUT_MS);

			socket.on("connected", onFound);
			socket.on("gameConnected", onFound);
			socket.on("noGame", onNone);
			socket.emit("reconnect");
		});
	}

	public disconnect(): void {
		this.cleanupConnectionListeners?.();
		this.cleanupConnectionListeners = null;
		this.destroyConnections();
		this.socket?.disconnect();
		this.socket = null;
		this.accountIdHolder.clear();
	}

	/**
	 * Close the socket once a game has ended.
	 */
	public endSession(): void {
		this.cleanupConnectionListeners?.();
		this.cleanupConnectionListeners = null;
		this.destroyConnections();
		this.socket?.disconnect();
		this.socket = null;
	}

	private async connectSocket(request: HandshakeRequest): Promise<void> {
		const socket = (io as any)(
			{ path: "/game/socket.io" },
			{ transports: ["websocket"] }
		);

		await new Promise<void>((resolve, reject) => {
			socket.on("connect", () => {
				socket.emit("authenticate", request);
			});

			const onAuthenticated = ({
				error,
				id,
			}: GameServerToClient.AuthenticateResponse) => {
				if (!error) {
					if (id) {
						this.accountIdHolder.set(id);
					}
					socket.off("authenticate_response", onAuthenticated);
					resolve();
					return;
				}

				socket.disconnect();
				reject(error);
			};

			socket.on("authenticate_response", onAuthenticated);
		});

		this.socket = socket;
	}

	private listenForConnection() {
		const socket = this.socket;
		if (!socket) {
			return;
		}

		const onLobbyConnected = (
			payload: LobbyServerToClient.LobbyConnectionPacket
		) => {
			this.destroyLobbyConnection();
			const lobbyConnection = new LobbyConnection(socket, this.dispatch);
			lobbyConnection.handleConnected(payload);
			this.lobbyConnectionHolder.set(lobbyConnection);
		};

		const onGameConnected = (
			payload: GameServerToClient.GameConnectionPacket
		) => {
			this.destroyLobbyConnection();
			this.destroyGameConnection();
			const gameConnection = new GameConnection(socket, this.dispatch);
			gameConnection.handleConnected(payload);
			this.gameConnectionHolder.set(gameConnection);
			this.dispatch(ClientUi.gameStartedCommand());
		};

		socket.on("connected", onLobbyConnected);
		socket.on("gameConnected", onGameConnected);

		this.cleanupConnectionListeners = () => {
			socket.off("connected", onLobbyConnected);
			socket.off("gameConnected", onGameConnected);
		};
	}

	private destroyConnections() {
		this.destroyLobbyConnection();
		this.destroyGameConnection();
	}

	private destroyLobbyConnection() {
		const existing = this.lobbyConnectionHolder.peek();
		if (existing) {
			existing.destroy();
			this.lobbyConnectionHolder.clear();
		}
	}

	private destroyGameConnection() {
		const existing = this.gameConnectionHolder.peek();
		if (existing) {
			existing.destroy();
			this.gameConnectionHolder.clear();
		}
	}
}

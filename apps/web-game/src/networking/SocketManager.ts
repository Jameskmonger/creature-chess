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
import type { Dispatch } from "./types";

export class SocketManager {
	private socket: Socket | null = null;
	private cleanupConnectionListeners: (() => void) | null = null;

	public constructor(
		private dispatch: Dispatch,
		private gameConnectionHolder: Holder<GameConnection>,
		private lobbyConnectionHolder: Holder<LobbyConnection>
	) {}

	public async connect(): Promise<void> {
		this.dispatch(MenuCommands.setLoadingMessage("Connecting..."));

		const session = await this.getGuestSession();

		if (!session) {
			this.dispatch(
				MenuCommands.setLoadingMessage("ERROR: Failed to open session!")
			);
			return;
		}

		const request: HandshakeRequest = {
			type: "guest",
			data: { accessToken: session.token },
		};

		try {
			await this.connectSocket(request);
		} catch (error) {
			console.error("error getting socket", error);
			return;
		}

		this.listenForConnection();
	}

	public disconnect(): void {
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
			}: GameServerToClient.AuthenticateResponse) => {
				if (!error) {
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

	private async getGuestSession(): Promise<{
		id: string;
		token: string;
	} | null> {
		const response = await fetch(APP_API_URL + "/guest/session", {
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) {
			return null;
		}

		const { id, token } = await response.json();
		return { id, token } as { id: string; token: string };
	}
}

import { Logger } from "winston";
import io = require("socket.io");
import { ManagementClient } from "auth0";
import { EventEmitter } from "events";
import { ServerToClient } from "@creature-chess/networking";
import { DatabaseConnection } from "@creature-chess/data";
import { authenticate, UserAppMetadata, UserModel } from "@creature-chess/auth-server";

/**
 * Listens for new connections to the server,
 * performs authentication on the socket,
 * and emits successfully authenticated sockets.
 */
export class SocketAuthenticator {
	private eventEmitter = new EventEmitter();
	private EVENT_KEYS = {
		SOCKET_AUTHENTICATED: "socketAuthenticated"
	};

	public constructor(
		private logger: Logger,
		private authClient: ManagementClient<UserAppMetadata>,
		private database: DatabaseConnection,
		server: io.Server
	) {
		this.authClient = authClient;
		this.database = database;
		server.on("connection", this.receiveConnection);
	}

	public onSocketAuthenticated(fn: (socket: io.Socket, user: UserModel) => void) {
		this.eventEmitter.on(this.EVENT_KEYS.SOCKET_AUTHENTICATED, fn);
	}

	private broadcastSocketAuthenticated(socket: io.Socket, user: UserModel) {
		this.logger.info(`[socket ${socket.id}] Authentication successful for '${user.nickname}'`);
		this.eventEmitter.emit(this.EVENT_KEYS.SOCKET_AUTHENTICATED, socket, user);
	}

	private receiveConnection = (socket: io.Socket) => {
		this.logger.info(`[socket ${socket.id}] New connection received`);

		socket.on("authenticate", ({ idToken }: { idToken: string }) => {
			this.logger.info(`[socket ${socket.id}] Authentication request recieved`);

			this.authenticateSocket(socket, idToken);
		});
	};

	private failAuthentication(socket: io.Socket, response: ServerToClient.Game.AuthenticateResponse) {

		socket.emit("authenticate_response", response);
		socket.removeAllListeners();
		socket.disconnect();
	}

	private async authenticateSocket(socket: io.Socket, idToken: string) {
		try {
			const user = await authenticate(this.authClient, this.database, idToken);

			// if user doesnt have a nickname we need to ask for it
			if (!user.registered) {
				this.failAuthentication(socket, { error: { type: "not_registered" } });

				return;
			}

			this.logger.info(`[socket ${socket.id}] Authentication successful as '${user.nickname}'`);

			socket.removeAllListeners("authenticate");
			socket.emit("authenticate_response", { error: null });

			this.broadcastSocketAuthenticated(socket, user);
		} catch (e) {
			console.error("onAuthenticate err", e);
			this.logger.error(`[socket ${socket.id}] Authentication failed ${e}`);
			this.failAuthentication(socket, { error: { type: "authentication" } });
		}
	}
}

import io = require("socket.io");
import { ManagementClient } from "auth0";
import { EventEmitter } from "events";
import { AuthenticateResponse } from "@creature-chess/shared";
import { DatabaseConnection } from "@creature-chess/data";
import { authenticate, UserAppMetadata, UserModel } from "@creature-chess/auth-server";
import { logger } from "../log";

/**
 * Listens for new connections to the server,
 * performs authentication on the socket,
 * and emits successfully authenticated sockets.
 */
export class SocketAuthenticator {
    private authClient: ManagementClient<UserAppMetadata>;
    private database: DatabaseConnection;

    private eventEmitter = new EventEmitter();
    private EVENT_KEYS = {
        SOCKET_AUTHENTICATED: "socketAuthenticated"
    };

    constructor(authClient: ManagementClient<UserAppMetadata>, database: DatabaseConnection, server: io.Server) {
        this.authClient = authClient;
        this.database = database;
        server.on("connection", this.receiveConnection);
    }

    public onSocketAuthenticated(fn: (socket: io.Socket, user: UserModel) => void) {
        this.eventEmitter.on(this.EVENT_KEYS.SOCKET_AUTHENTICATED, fn);
    }

    private broadcastSocketAuthenticated(socket: io.Socket, user: UserModel) {
        this.eventEmitter.emit(this.EVENT_KEYS.SOCKET_AUTHENTICATED, socket, user);
    }

    private receiveConnection = (socket: io.Socket) => {
        logger.info("New connection received");

        socket.on("authenticate", ({ idToken }: { idToken: string }) => {
            this.authenticateSocket(socket, idToken);
        });
    }

    private failAuthentication(socket: io.Socket, response: AuthenticateResponse) {
        logger.error(`Authentication failed for socket ${socket.id}, reason: '${response.error?.type}'`);

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

            socket.removeAllListeners("authenticate");
            socket.emit("authenticate_response", { error: null });

            this.broadcastSocketAuthenticated(socket, user);
        } catch (e) {
            console.error("onAuthenticate err", e);
            this.failAuthentication(socket, { error: { type: "authentication" } });
        }
    }
}
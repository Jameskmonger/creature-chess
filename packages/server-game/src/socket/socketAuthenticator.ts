import io = require("socket.io");
import Filter = require("bad-words");
import { ManagementClient } from "auth0";
import { EventEmitter } from "events";
import { log, validateNickname, AuthenticateResponse } from "@creature-chess/shared";
import { DatabaseConnection } from "@creature-chess/data";
import { authenticate, UserAppMetadata, UserModel } from "@creature-chess/auth-server";

/**
 * Listens for new connections to the server,
 * performs authentication on the socket,
 * and emits successfully authenticated sockets.
 */
export class SocketAuthenticator {
    private filter = new Filter();
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
        log("Connection received");

        socket.on("authenticate", ({ idToken, nickname }: { idToken: string, nickname: string }) => {
            this.authenticateSocket(socket, idToken, nickname);
        });
    }

    private failAuthentication(socket: io.Socket, response: AuthenticateResponse) {
        socket.emit("authenticate_response", response);
        socket.removeAllListeners();
        socket.disconnect();
    }

    private async authenticateSocket(socket: io.Socket, idToken: string, nickname: string) {
        try {
            const user = await authenticate(this.authClient, this.database, idToken);

            // if user doesnt have a nickname we need to ask for it
            if (!user.nickname) {
                if (!nickname) {
                    this.failAuthentication(socket, { error: { type: "nickname_required" } });
                    return;
                }

                const trimmedNickname = nickname.trim();

                const nicknameError = validateNickname(trimmedNickname);

                if (nicknameError) {
                    this.failAuthentication(socket, { error: { type: "invalid_nickname", error: nicknameError } });
                    return;
                }

                if (this.filter.isProfane(trimmedNickname)) {
                    this.failAuthentication(socket, { error: { type: "invalid_nickname", error: "Profanity filter" } });
                    return;
                }

                const isUnique = (await this.database.user.getByNickname(trimmedNickname)) === null;

                if (!isUnique) {
                    this.failAuthentication(socket, { error: { type: "invalid_nickname", error: "Nickname already in use" } });
                    return;
                }

                await this.database.user.setNickname(user.id, trimmedNickname);

                user.nickname = trimmedNickname;

                log(`User ${user.id} set nickname to '${trimmedNickname}'`);
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

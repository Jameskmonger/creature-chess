import io = require("socket.io");
import Filter = require("bad-words");
import { ManagementClient } from "auth0";
import { EventEmitter } from "events";
import { log } from "@creature-chess/shared/log";
import { DatabaseConnection } from "@creature-chess/data";
import { AuthenticateResponse } from "@creature-chess/shared/networking/server-to-client";
import { authenticate } from "./user/authenticate";
import { UserAppMetadata, UserModel } from "./user/userModel";
import { validateNickname } from "@creature-chess/shared/validation/nickname";

/**
 * Listens for new connections to the server,
 * performs authentication on the socket,
 * and emits successfully authenticated sockets.
 */
export class SocketReceiver {
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

    public onReceiveSocket(fn: (socket: io.Socket, user: UserModel) => void) {
        this.eventEmitter.on(this.EVENT_KEYS.SOCKET_AUTHENTICATED, fn);
    }

    private broadcastSocketAuthenticated(socket: io.Socket, user: UserModel) {
        this.eventEmitter.emit(this.EVENT_KEYS.SOCKET_AUTHENTICATED, socket, user);
    }

    private receiveConnection = (socket: io.Socket) => {
        log("Connection received");

        const failAuthentication = (response: AuthenticateResponse) => {
            socket.emit("authenticate_response", response);
            socket.removeAllListeners();
            socket.disconnect();
        };

        const onAuthenticate = async ({ idToken, nickname }: { idToken: string, nickname: string }) => {
            try {
                const user = await authenticate(this.authClient, this.database, idToken);

                // if user doesnt have a nickname we need to ask for it
                if (!user.nickname) {
                    if (!nickname) {
                        failAuthentication({ error: { type: "nickname_required" } });
                        return;
                    }

                    const trimmedNickname = nickname.trim();

                    const nicknameError = validateNickname(trimmedNickname);

                    if (nicknameError) {
                        failAuthentication({ error: { type: "invalid_nickname", error: nicknameError } });
                        return;
                    }

                    if (this.filter.isProfane(trimmedNickname)) {
                        failAuthentication({ error: { type: "invalid_nickname", error: "Profanity filter" } });
                        return;
                    }

                    const isUnique = (await this.database.user.getByNickname(trimmedNickname)) === null;

                    if (!isUnique) {
                        failAuthentication({ error: { type: "invalid_nickname", error: "Nickname already in use" } });
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
                failAuthentication({ error: { type: "authentication" } });
            }
        };

        socket.on("authenticate", onAuthenticate);
    }
}
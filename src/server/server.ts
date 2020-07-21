import io = require("socket.io");
import Filter = require("bad-words");
import { ManagementClient } from "auth0";
import { log } from "@common/log";
import { Game } from "@common/game/game";
import { Connection } from "./connection";
import { Lobby } from "./lobby";
import { Player } from "@common/game";
import { IdGenerator } from "./id-generator";
import { LobbyPlayer } from "@common/models";
import { ClientToServerPacketOpcodes, ReconnectAuthenticatePacket } from "@common/networking/client-to-server";
import { ServerToClientPacketOpcodes, ReconnectAuthenticateSuccessPacket, AuthenticateResponse, FindGameResponse, PlayerGameState } from "@common/networking/server-to-client";
import { Metrics } from "./metrics";
import { authenticate } from "./user/authenticate";
import { validateNickname } from "@common/validation/nickname";
import { updateUser } from "./user/updateUser";
import { UserAppMetadata } from "./user/userModel";
import { checkNicknameUnique } from "./user/checkNicknameUnique";
import { PlayerSessionRegistry } from "./playerSessionRegistry";

process.on("unhandledRejection", (error, p) => {
    log("unhandled rejection:");
    log((error as any).stack);
});

const AUTH0_CONFIG = {
    domain: "creaturechess.eu.auth0.com",
    clientId: "gWNTtsTNepgyyqE7QAEC4e7nt5A3ZZ4k",
    clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET
};

export class Server {
    private lobbies = new Map<string, Lobby>();
    private games = new Map<string, Game>();
    private lobbyIdGenerator = new IdGenerator();
    private metrics = new Metrics();
    private filter = new Filter();
    private playerSessionRegistry = new PlayerSessionRegistry();

    private client = new ManagementClient<UserAppMetadata>({
        domain: AUTH0_CONFIG.domain,
        clientId: AUTH0_CONFIG.clientId,
        clientSecret: AUTH0_CONFIG.clientSecret
    });

    public listen(port: number) {
        // TODO create UnauthenticatedPlayerFactory and AuthenticatedPlayerFactory or something that takes in `server` and:
        // - listens for authentication event, handles authentication
        // - only sends completely authenticated players back up to the server
        const server = io.listen(port, { transports: ["websocket", "xhr-polling"] });

        log("Server listening on port " + port);

        server.on("connection", this.receiveConnection);
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
                let user = await authenticate(this.client, idToken);

                // if user doesnt have a nickname we need to ask for it
                if (!user.metadata.nickname) {
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

                    const isUnique = await checkNicknameUnique(this.client, trimmedNickname);

                    if (!isUnique) {
                        failAuthentication({ error: { type: "invalid_nickname", error: "Nickname already in use" } });
                        return;
                    }

                    const newMetadata = {
                        ...user.metadata,
                        nickname: {
                            value: trimmedNickname,
                            uppercase: trimmedNickname.toUpperCase()
                        }
                    };

                    user = await updateUser(this.client, user.authId, newMetadata);

                    console.log(`User ${user.id} set nickname to '${user.metadata.nickname.value}'`);
                }

                socket.on(ClientToServerPacketOpcodes.RECONNECT_AUTHENTICATE, this.onSocketReconnectAuthenticate(socket));
                socket.on(ClientToServerPacketOpcodes.FIND_GAME, this.onSocketFindGame(socket, user.id, user.metadata.nickname.value));
                socket.removeAllListeners("authenticate");

                socket.emit("authenticate_response", { error: null });
            } catch (e) {
                console.error("onAuthenticate err", e);
                failAuthentication({ error: { type: "authentication" } });
            }
        };

        socket.on("authenticate", onAuthenticate);
    }

    private getLobbyPlayers(lobby: Lobby): LobbyPlayer[] {
        return lobby.getPlayers().map((p, index) => ({
            id: p.id,
            name: p.name,
            isBot: p.isBot,
            // first player is always host, but no host in public lobby
            isHost: lobby.isPublic ? false : (index === 0)
        }));
    }

    private findOrCreatePublicLobby(player: Player) {
        const lobbies = Array.from(this.lobbies.values())
            .filter(lobby => lobby.isPublic && lobby.canJoin());

        if (lobbies.length === 0) {
            return this.createLobby(player, true);
        }

        lobbies.sort((a, b) => b.getRealPlayerCount() - a.getRealPlayerCount());

        const mostFullLobby = lobbies[0];

        if (!mostFullLobby.getPlayers().some(p => p.id === player.id)) {
            mostFullLobby.addPlayer(player);
        }

        return mostFullLobby;
    }

    private createLobby(player: Player, isPublic: boolean) {
        const lobby = new Lobby(this.lobbyIdGenerator, player, isPublic);

        lobby.onStartGame(this.startGame(lobby));

        this.lobbies.set(lobby.id, lobby);

        log(`Lobby '${lobby.id}' created`);

        return lobby;
    }

    private startGame(lobby: Lobby) {
        return () => {
            const players = lobby.getPlayers();

            log(`Lobby '${lobby.id}' has started with the following players:`);
            log(`    ${players.map(p => p.name).join(", ")}`);

            const game = new Game(players.length);

            players.forEach(p => {
                game.addPlayer(p);

                if ((p as Connection).isConnection) {
                    this.playerSessionRegistry.registerPlayer(p.id, p, "game", game.id);
                }
            });

            game.onFinish((rounds, winner, startTimeMs, gamePlayers, durationMs) => {
                this.metrics.addGame({
                    startTimeMs,
                    players: gamePlayers,
                    round: rounds,
                    winner: winner.name,
                    isPublic: lobby.isPublic,
                    durationMs
                });

                gamePlayers.forEach(p => {
                    if ((p as Connection).isConnection) {
                        this.playerSessionRegistry.deregisterPlayer(p.id);
                    }
                });
            });

            this.games.set(game.id, game);
            this.lobbies.delete(lobby.id);
        };
    }

    private onSocketFindGame(socket: io.Socket, id: string, name: string) {
        return (
            junk: any,
            response: (response: FindGameResponse) => void
        ) => {
            const existingPlayer = this.playerSessionRegistry.getPlayer(id);

            if (existingPlayer && existingPlayer.location.type === "game") {
                const existingGame = this.games.get(existingPlayer.location.id);

                if (existingGame) {
                    const playerInGame = existingGame.getPlayers().some(p => p.id === id);

                    if (!playerInGame) {
                        return;
                    }

                    const player: Connection = (existingPlayer.player as Connection);

                    player.replaceSocket(socket);

                    const fullGameState: PlayerGameState = {
                        gameId: existingGame.id,
                        reconnectionSecret: player.getReconnectionSecret(),
                        localPlayerId: player.id,
                        name: player.name,

                        fullState: {
                            players: existingGame.getPlayerList(),
                            phase: existingGame.getCurrentGamePhaseUpdateForPlayer(player),
                            ...player.getGameState()
                        }
                    };

                    response({
                        error: null,
                        response: {
                            type: "game",
                            payload: fullGameState
                        }
                    });

                    return;
                }
            }

            const playerToRegister: Connection =
                existingPlayer && existingPlayer.location.type === "lobby"
                    ? existingPlayer.player as Connection
                    : new Connection(socket, id, name);

            const lobby = this.findOrCreatePublicLobby(playerToRegister);

            if (!existingPlayer) {
                this.playerSessionRegistry.registerPlayer(playerToRegister.id, playerToRegister, "lobby", lobby.id);
            } else {
                playerToRegister.replaceSocket(socket);
            }

            response({
                error: null,
                response: {
                    type: "lobby",
                    payload: {
                        playerId: playerToRegister.id,
                        lobbyId: lobby.id,
                        players: this.getLobbyPlayers(lobby),
                        startTimestamp: lobby.gameStartTime
                    }
                }
            });
        };
    }

    private onSocketReconnectAuthenticate(socket: io.Socket) {
        const disconnect = () => {
            socket.emit(ServerToClientPacketOpcodes.RECONNECT_AUTHENTICATE_FAILURE);

            socket.disconnect();
        };

        return (packet: ReconnectAuthenticatePacket) => {
            const game = this.games.get(packet.gameId);

            if (!game) {
                log(`Tried to reauthenticate for game ${packet.gameId}, but game not found`);
                disconnect();
                return;
            }

            const player = game.getPlayerById(packet.playerId);

            if (!player) {
                log(`Tried to reauthenticate as ${packet.playerId}, but player not found`);
                disconnect();
                return;
            }

            const connectionPlayer = player as Connection;

            if (!connectionPlayer.isConnection) {
                log(`Tried to reauthenticate as ${connectionPlayer.id}, but player is not a connection`);
                disconnect();
                return;
            }

            const newReconnectionSecret = connectionPlayer.reauthenticate(socket, packet.reconnectSecret);

            if (newReconnectionSecret === null) {
                log(`Reauthentication unsuccessful`);
                disconnect();
                return;
            }

            log(`Successfully reauthenticated`);

            const successPacket: ReconnectAuthenticateSuccessPacket = {
                reconnectSecret: newReconnectionSecret
            };
            socket.emit(ServerToClientPacketOpcodes.RECONNECT_AUTHENTICATE_SUCCESS, successPacket);
        };
    }
}

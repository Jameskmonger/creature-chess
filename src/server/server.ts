import io = require("socket.io");
import uuid = require("uuid/v4");
import { log } from "@common/log";
import { Game } from "@common/game/game";
import { Connection } from "./connection";
import { Lobby } from "./lobby";
import { Player } from "@common/game";
import { IdGenerator } from "./id-generator";
import { LobbyPlayer } from "@common/models";
import { nameValidator } from "./name-validator";
import { ClientToServerPacketOpcodes, ReconnectAuthenticatePacket } from "@common/networking/client-to-server";
import { ServerToClientPacketOpcodes, JoinLobbyResponse, ReconnectAuthenticateSuccessPacket } from "@common/networking/server-to-client";
import { Metrics } from "./metrics";
import { verify } from "./jwt";

process.on("unhandledRejection", (error, p) => {
    log("unhandled rejection:");
    log((error as any).stack);
});

export class Server {
    private lobbies = new Map<string, Lobby>();
    private games = new Map<string, Game>();
    private lobbyIdGenerator = new IdGenerator();
    private metrics = new Metrics();

    public listen(port: number) {
        const server = io.listen(port, { transports: ["websocket", "xhr-polling"] });

        log("Server listening on port " + port);

        server.on("connection", this.receiveConnection);
    }

    private receiveConnection = (socket: io.Socket) => {
        log("Connection received");

        socket.on("authenticate", async ({ idToken }: { idToken: string }) => {
            const decoded = await verify(idToken);

            if (decoded === null) {
                socket.emit("authenticate_response", { success: false });
                socket.disconnect();
                return;
            }

            socket.on(ClientToServerPacketOpcodes.RECONNECT_AUTHENTICATE, this.onSocketReconnectAuthenticate(socket));
            socket.on(ClientToServerPacketOpcodes.FIND_GAME, this.onSocketFindGame(socket));
            socket.removeAllListeners("authenticate");

            socket.emit("authenticate_response", { success: true });
        });
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

    private findPublicLobby() {
        const lobbies = Array.from(this.lobbies.values())
            .filter(lobby => lobby.isPublic && lobby.canJoin());

        lobbies.sort((a, b) => b.getRealPlayerCount() - a.getRealPlayerCount());

        return lobbies[0];
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
            });

            this.games.set(game.id, game);
            this.lobbies.delete(lobby.id);
        };
    }

    private onSocketFindGame(socket: io.Socket) {
        return (
            name: string,
            response: (response: JoinLobbyResponse) => void
        ) => {
            const validationError = nameValidator(name);

            if (validationError) {
                response({
                    error: validationError,
                    response: null
                });
                return;
            }

            const player = new Connection(socket, name);

            let lobby = this.findPublicLobby();

            if (lobby) {
                lobby.addPlayer(player);
            } else {
                lobby = this.createLobby(player, true);
            }

            response({
                error: null,
                response: {
                    playerId: player.id,
                    lobbyId: lobby.id,
                    players: this.getLobbyPlayers(lobby),
                    startTimestamp: lobby.gameStartTime,
                    isHost: player.id === lobby.hostId
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

import io = require("socket.io");
import { ManagementClient } from "auth0";
import { log } from "@creature-chess/shared/log";
import { Game } from "@creature-chess/shared/game/game";
import { Connection } from "./connection";
import { Lobby } from "./lobby";
import { Player } from "@creature-chess/shared/game";
import { IdGenerator } from "./id-generator";
import { LobbyPlayer } from "@creature-chess/models";
import { PlayerGameState } from "@creature-chess/shared/networking/server-to-client";
import { Metrics } from "./metrics";
import { UserAppMetadata, UserModel } from "./user/userModel";
import { PlayerSessionRegistry } from "./playerSessionRegistry";
import { SocketReceiver } from "./socketAuthenticator";
import { createDatabaseConnection } from "@creature-chess/data";

process.on("unhandledRejection", (error) => {
    log("unhandled rejection:");
    log((error as any).stack);
});

const AUTH0_CONFIG = {
    domain: "creaturechess.eu.auth0.com",
    clientId: "gWNTtsTNepgyyqE7QAEC4e7nt5A3ZZ4k",
    clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET
};

const getLobbyPlayers = (lobby: Lobby): LobbyPlayer[] => {
    return lobby.getPlayers().map(p => ({
        id: p.id,
        name: p.name,
        isBot: p.isBot
    }));
};

export class Server {
    private lobbies = new Map<string, Lobby>();
    private games = new Map<string, Game>();
    private lobbyIdGenerator = new IdGenerator();
    private metrics = new Metrics();
    private playerSessionRegistry = new PlayerSessionRegistry();

    private client = new ManagementClient<UserAppMetadata>({
        domain: AUTH0_CONFIG.domain,
        clientId: AUTH0_CONFIG.clientId,
        clientSecret: AUTH0_CONFIG.clientSecret
    });

    private database = createDatabaseConnection(process.env.CREATURE_CHESS_FAUNA_KEY);

    public listen(port: number) {
        const server = io.listen(port, { transports: ["websocket", "polling"] });

        log("Server listening on port " + port);

        const socketReceiver = new SocketReceiver(this.client, this.database, server);

        socketReceiver.onReceiveSocket(this.onReceiveSocket);
    }

    private findOrCreateLobby(player: Player) {
        const lobbies = Array.from(this.lobbies.values())
            .filter(lobby => lobby.canJoin());

        if (lobbies.length === 0) {
            return this.createLobby(player);
        }

        lobbies.sort((a, b) => b.getRealPlayerCount() - a.getRealPlayerCount());

        const mostFullLobby = lobbies[0];

        if (!mostFullLobby.getPlayers().some(p => p.id === player.id)) {
            mostFullLobby.addPlayer(player);
        }

        return mostFullLobby;
    }

    private createLobby(player: Player) {
        const lobby = new Lobby(this.lobbyIdGenerator, player);

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
                    // todo do this in 1 call
                    this.database.user.addGamePlayed(p.id);

                    this.playerSessionRegistry.registerPlayer(p.id, p, "game", game.id);
                }
            });

            game.onFinish((rounds, winner, startTimeMs, gamePlayers, durationMs) => {
                this.metrics.addGame({
                    startTimeMs,
                    players: gamePlayers,
                    round: rounds,
                    winner: winner.name,
                    durationMs
                });

                if ((winner as Connection).isConnection) {
                    this.database.user.addWin(winner.id);
                }

                gamePlayers.forEach(p => {
                    if (!p.isBot) {
                        this.playerSessionRegistry.deregisterPlayer(p.id);
                    }
                });
            });

            game.onPlayerDeath(p => {
                if (!p.isBot) {
                    this.playerSessionRegistry.deregisterPlayer(p.id);
                }
            });

            this.games.set(game.id, game);
            this.lobbies.delete(lobby.id);
        };
    }

    private onReceiveSocket = (socket: io.Socket, user: UserModel) => {
        const { id, nickname } = user;

        const existingPlayer = this.playerSessionRegistry.getPlayer(id);

        if (existingPlayer && existingPlayer.location.type === "game") {
            const existingGame = this.games.get(existingPlayer.location.id);

            if (existingGame) {
                const playerInGame = existingGame.getPlayers().some(p => p.id === id);

                if (!playerInGame) {
                    return;
                }

                const player: Connection = (existingPlayer.player as Connection);

                player.setSocket(socket);

                const fullGameState: PlayerGameState = {
                    gameId: existingGame.id,
                    localPlayerId: player.id,
                    name: player.name,

                    fullState: {
                        players: existingGame.getPlayerList(),
                        phase: existingGame.getCurrentGamePhaseUpdateForPlayer(player),
                        ...player.getGameState()
                    }
                };

                player.sendJoinGamePacket({ type: "game", payload: fullGameState });

                return;
            }
        }

        const playerToRegister: Connection =
            existingPlayer && existingPlayer.location.type === "lobby"
                ? existingPlayer.player as Connection
                : new Connection(socket, id, nickname);

        const lobby = this.findOrCreateLobby(playerToRegister);

        if (!existingPlayer) {
            this.playerSessionRegistry.registerPlayer(playerToRegister.id, playerToRegister, "lobby", lobby.id);
        } else {
            playerToRegister.setSocket(socket);
        }

        playerToRegister.sendJoinGamePacket({
            type: "lobby",
            payload: {
                playerId: playerToRegister.id,
                lobbyId: lobby.id,
                players: getLobbyPlayers(lobby),
                startTimestamp: lobby.gameStartTime
            }
        });
    }
}

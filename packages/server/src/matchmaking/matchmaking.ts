import io = require("socket.io");
import { Game } from "@creature-chess/shared/game";
import { IdGenerator } from "./id-generator";
import { Lobby, LobbyStartEvent } from "./lobby";
import { PlayerSessionRegistry } from "./playerSessionRegistry";
import { SocketPlayer } from "../player/socketPlayer";
import { PlayerGameState } from "@creature-chess/shared/networking/server-to-client";
import { LobbyPlayer } from "@creature-chess/models";
import { log } from "@creature-chess/shared";
import { DatabaseConnection } from "@creature-chess/data";
import { UserModel } from "@creature-chess/auth-server";

const getLobbyPlayers = (lobby: Lobby): LobbyPlayer[] => {
    return lobby.getPlayers().map(p => ({
        id: p.id,
        name: p.name,
        isBot: p.isBot
    }));
};

export class Matchmaking {
    private lobbies = new Map<string, Lobby>();
    private games = new Map<string, Game>();
    private lobbyIdGenerator = new IdGenerator();
    private playerSessionRegistry = new PlayerSessionRegistry();

    constructor(private database: DatabaseConnection) {

    }

    public findGame(socket: io.Socket, user: UserModel) {
        const { id, nickname } = user;

        const playerInGame = this.getPlayerInGame(id);

        if (playerInGame) {
            const { game, player } = playerInGame;

            this.addPlayerToGame(game, socket, player);

            return;
        }

        const playerInLobby = this.getPlayerInLobby(id);

        if (playerInLobby) {
            const { lobby, player } = playerInLobby;

            this.addPlayerToLobby(lobby, socket, player);

            return;
        }

        this.newConnectionJoin(socket, id, nickname);
    }

    private getPlayerInGame(id: string) {
        const existingPlayer = this.playerSessionRegistry.getPlayer(id);

        if (existingPlayer && existingPlayer.location.type === "game") {
            const existingGame = this.games.get(existingPlayer.location.id);

            if (existingGame) {
                const playerInGame = existingGame.getPlayers().find(p => p.id === id);

                if (playerInGame) {
                    return {
                        game: existingGame,
                        player: playerInGame as SocketPlayer
                    };
                }
            }
        }

        // if we found a valid player we would have returned, so this clears any invalid players
        this.playerSessionRegistry.deregisterPlayer(id, "game");

        return null;
    }

    private addPlayerToGame(game: Game, socket: io.Socket, player: SocketPlayer) {
        player.setSocket(socket);

        const fullGameState: PlayerGameState = {
            localPlayerId: player.id,

            fullState: {
                players: game.getPlayerList(),
                phase: game.getCurrentGamePhaseUpdateForPlayer(player),
                ...player.getGameState()
            }
        };

        player.sendJoinGamePacket({ type: "game", payload: fullGameState });
    }

    private getPlayerInLobby(id: string) {
        const existingPlayer = this.playerSessionRegistry.getPlayer(id);

        if (existingPlayer && existingPlayer.location.type === "lobby") {
            const existingLobby = this.lobbies.get(existingPlayer.location.id);

            if (existingLobby) {
                const playerInLobby = existingLobby.getPlayers().find(p => p.id === id);

                if (playerInLobby) {
                    return {
                        lobby: existingLobby,
                        player: playerInLobby as SocketPlayer
                    };
                }
            }
        }

        // if we found a valid player we would have returned, so this clears any invalid players
        this.playerSessionRegistry.deregisterPlayer(id, "lobby");

        return null;
    }

    private addPlayerToLobby(lobby: Lobby, socket: io.Socket, player: SocketPlayer) {
        player.setSocket(socket);

        player.sendJoinGamePacket({
            type: "lobby",
            payload: {
                playerId: player.id,
                lobbyId: lobby.id,
                players: getLobbyPlayers(lobby),
                startTimestamp: lobby.gameStartTime
            }
        });
    }

    private newConnectionJoin(socket: io.Socket, id: string, nickname: string) {
        const connection: SocketPlayer = new SocketPlayer(socket, id, nickname);

        const lobby = this.findOrCreateLobby();
        lobby.addPlayer(connection);

        this.playerSessionRegistry.registerPlayer(connection.id, connection, "lobby", lobby.id);

        connection.sendJoinGamePacket({
            type: "lobby",
            payload: {
                playerId: connection.id,
                lobbyId: lobby.id,
                players: getLobbyPlayers(lobby),
                startTimestamp: lobby.gameStartTime
            }
        });
    }

    private onLobbyStart = ({ id, players }: LobbyStartEvent) => {
        log(`Lobby '${id}' has started with the following players:`);
        log(`    ${players.map(p => p.name).join(", ")}`);

        const game = new Game(players);

        players
            .forEach(p => {
                if ((p as SocketPlayer).isConnection) {
                    // todo do this in 1 call
                    this.database.user.addGamePlayed(p.id);
                }
            });

        game.onFinish((winner, gamePlayers) => {
            if ((winner as SocketPlayer).isConnection) {
                this.database.user.addWin(winner.id);
            }
        });

        this.playerSessionRegistry.registerGame(game);

        this.games.set(game.id, game);
        this.lobbies.delete(id);
    }

    private findOrCreateLobby() {
        const lobbies = Array.from(this.lobbies.values())
            .filter(lobby => lobby.canJoin());

        if (lobbies.length === 0) {
            return this.createLobby();
        }

        lobbies.sort((a, b) => b.getRealPlayerCount() - a.getRealPlayerCount());

        return lobbies[0];
    }

    private createLobby() {
        const lobby = new Lobby(this.lobbyIdGenerator);

        lobby.onStartGame(this.onLobbyStart);

        this.lobbies.set(lobby.id, lobby);

        log(`Lobby '${lobby.id}' created`);

        return lobby;
    }
}

import io = require("socket.io");
import { Game } from "@creature-chess/shared/game";
import { IdGenerator } from "./id-generator";
import { Lobby, LobbyStartEvent } from "./lobby";
import { SocketPlayer } from "../player/socketPlayer";
import { PlayerGameState } from "@creature-chess/shared/networking/server-to-client";
import { LobbyPlayer } from "@creature-chess/models";
import { log } from "@creature-chess/shared";
import { DatabaseConnection } from "@creature-chess/data";
import { UserModel } from "@creature-chess/auth-server";
import { createMetricLogger } from "../metrics";

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
    private metrics = createMetricLogger();

    constructor(private database: DatabaseConnection) {
        setInterval(this.sendMetrics, 60 * 1000);
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
        const games = Array.from<Game>(this.games.values());

        const matchingGame = games.find(g => g.getPlayers().find(p => p.id === id));

        if (!matchingGame) {
            return null;
        }

        const playerInGame = matchingGame.getPlayers().find(p => p.id === id);

        return {
            game: matchingGame,
            player: playerInGame as SocketPlayer
        };
    }

    private addPlayerToGame(game: Game, socket: io.Socket, player: SocketPlayer) {
        player.setSocket(socket);

        const fullGameState: PlayerGameState = {
            id: game.id,

            fullState: {
                players: game.getPlayerList(),
                phase: game.getCurrentGamePhaseUpdateForPlayer(player),
                ...player.getGameState()
            }
        };

        player.sendJoinGamePacket({ type: "game", payload: fullGameState });
    }

    private getPlayerInLobby(id: string) {
        const lobbies = Array.from<Lobby>(this.lobbies.values());

        const matchingLobby = lobbies.find(g => g.getPlayers().find(p => p.id === id));

        if (!matchingLobby) {
            return null;
        }

        const playerInLobby = matchingLobby.getPlayers().find(p => p.id === id);

        return {
            lobby: matchingLobby,
            player: playerInLobby as SocketPlayer
        };
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
                this.database.user.addWin(winner
                    .id);
            }
            this.games.delete(game.id);
            this.sendMetrics();
        });

        this.games.set(game.id, game);
        this.lobbies.delete(id);

        this.sendMetrics();
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

    private sendMetrics = () => {
        this.metrics.sendGameCount(this.games.size);
    }
}

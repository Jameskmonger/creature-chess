import io = require("socket.io");
import { Game } from "@creature-chess/shared/game";
import { IdGenerator } from "./id-generator";
import { Lobby, LobbyStartEvent } from "./lobby/lobby";
import { SocketPlayer } from "../player/socketPlayer";
import { PlayerGameState } from "@creature-chess/shared/networking/server-to-client";
import { log } from "@creature-chess/shared";
import { DatabaseConnection } from "@creature-chess/data";
import { UserModel } from "@creature-chess/auth-server";
import { createMetricLogger } from "../metrics";
import { LobbyMemberType } from "./lobby/lobbyMember";
import { BotPlayer } from "../player/botPlayer";

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

            this.reconnectGamePlayer(game, socket, player);

            return;
        }

        const lobby = this.getLobbyContainingPlayer(id);

        if (lobby) {
            lobby.reconnect(id, socket);

            return;
        }

        const newLobby = this.findOrCreateLobby();
        newLobby.addConnection(socket, id, nickname);
    }

    private getPlayerInGame(id: string) {
        const games = Array.from<Game>(this.games.values());

        const matchingGame = games.find(g => g.getPlayerById(id));

        if (!matchingGame) {
            return null;
        }

        const playerInGame = matchingGame.getPlayerById(id);

        return {
            game: matchingGame,
            player: playerInGame as SocketPlayer
        };
    }

    private reconnectGamePlayer(game: Game, socket: io.Socket, player: SocketPlayer) {
        player.reconnectSocket(socket);

        const fullGameState: PlayerGameState = {
            id: game.id,

            fullState: {
                players: game.getPlayerList(),
                phase: game.getCurrentGamePhaseUpdateForPlayer(player),
                ...player.getGameState()
            }
        };

        player.sendJoinGamePacket(fullGameState);
    }

    private getLobbyContainingPlayer(id: string) {
        const lobbies = Array.from<Lobby>(this.lobbies.values());

        return lobbies.find(g => g.getMemberById(id)) || null;
    }

    private onLobbyStart = ({ id, members }: LobbyStartEvent) => {
        log(`Lobby '${id}' has started with the following players:`);
        log(`    ${members.map(p => p.name).join(", ")}`);

        const players = members.map(m => {
            if (m.type === LobbyMemberType.BOT) {
                return new BotPlayer(m.name);
            }

            if (m.type === LobbyMemberType.PLAYER) {
                return new SocketPlayer(m.net.socket, m.id, m.name);
            }
        });

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

        lobbies.sort((a, b) => a.getFreeSlotCount() - b.getFreeSlotCount());

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

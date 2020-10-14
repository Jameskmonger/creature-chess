import io = require("socket.io");
import { IdGenerator } from "./id-generator";
import { Lobby, LobbyStartEvent } from "./lobby/lobby";
import { SocketPlayer, BotPlayer } from "../player";
import { log, Game } from "@creature-chess/shared";
import { DatabaseConnection } from "@creature-chess/data";
import { UserModel } from "@creature-chess/auth-server";
import { createMetricLogger } from "../metrics";
import { LobbyMemberType } from "./lobby/lobbyMember";
import { logger } from "../log";
import { MAX_PLAYERS_IN_GAME } from "@creature-chess/models";

export class Matchmaking {
    private lobbies = new Map<string, Lobby>();
    private games = new Map<string, Game>();
    private lobbyIdGenerator = new IdGenerator();
    private metrics = createMetricLogger();

    constructor(private database: DatabaseConnection) {
        setInterval(this.sendMetrics, 60 * 1000);
    }

    public async findGame(socket: io.Socket, user: UserModel) {
        const { id, nickname } = user;

        const playerInGame = this.getPlayerInGame(id);

        if (playerInGame) {
            const { game, player } = playerInGame;

            player.reconnectSocket(socket);

            return;
        }

        const lobby = this.getLobbyContainingPlayer(id);

        if (lobby) {
            lobby.reconnect(id, socket);

            return;
        }

        const newLobby = await this.findOrCreateLobby();
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

    private getLobbyContainingPlayer(id: string) {
        const lobbies = Array.from<Lobby>(this.lobbies.values());

        return lobbies.find(g => g.getMemberById(id)) || null;
    }

    private onLobbyStart = ({ id, members }: LobbyStartEvent) => {
        const players = members.map(m => {
            if (m.type === LobbyMemberType.BOT) {
                return new BotPlayer(m.id, m.name);
            }

            if (m.type === LobbyMemberType.PLAYER) {
                return new SocketPlayer(m.net.socket, m.id, m.name);
            }
        });

        const game = new Game(players);

        logger.info(`[Game ${game.id}] started from lobby ${id}`);

        const realPlayers = players
            .filter(p => (p as SocketPlayer).isConnection)
            .map(p => ({
                id: p.id,
                name: p.name
            }));
        logger.info(`[Game ${game.id}] started with ${realPlayers.length} real players: ${realPlayers.map(p => p.name).join(", ")}`);

        players
            .forEach(p => {
                if ((p as SocketPlayer).isConnection) {
                    // todo do this in 1 call
                    this.database.user.addGamePlayed(p.id);
                }

                if ((p as BotPlayer).isBot) {
                    // todo do this in 1 call
                    this.database.bot.addGamePlayed(p.id);
                    logger.info(`[Game ${game.id}] game played added to bot '${p.name}'`);
                }
            });

        game.onFinish((winner) => {
            logger.info(`[Game ${game.id}] finished`);

            if ((winner as SocketPlayer).isConnection) {
                this.database.user.addWin(winner.id);
                logger.info(`[Game ${game.id}] won by player ${winner.name}`);
            }

            if ((winner as BotPlayer).isBot) {
                this.database.bot.addWin(winner.id);
                logger.info(`[Game ${game.id}] won by bot '${winner.name}'`);
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

    private async createLobby() {
        const bots = await this.database.bot.getLeastPlayedBots(MAX_PLAYERS_IN_GAME);
        const lobby = new Lobby(this.lobbyIdGenerator, bots);

        lobby.onStartGame(this.onLobbyStart);

        this.lobbies.set(lobby.id, lobby);

        logger.info(`[Lobby ${lobby.id}] created`);

        return lobby;
    }

    private sendMetrics = () => {
        this.metrics.sendGameCount(this.games.size);
    }
}

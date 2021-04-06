import io = require("socket.io");
import shuffle = require("lodash.shuffle");
import { IdGenerator } from "./id-generator";
import { Lobby, LobbyStartEvent } from "./lobby/lobby";
import { SocketPlayer, BotPlayer } from "../player";
import { Game } from "@creature-chess/shared";
import { DatabaseConnection } from "@creature-chess/data";
import { UserModel } from "@creature-chess/auth-server";
import { createMetricLogger } from "../metrics";
import { LobbyMemberType } from "./lobby/lobbyMember";
import { logger } from "../log";
import { MAX_PLAYERS_IN_GAME } from "@creature-chess/models";
import { DiscordApi } from "../discord";

export class Matchmaking {
    private lobbies = new Map<string, Lobby>();
    private games = new Map<string, Game>();
    private lobbyIdGenerator = new IdGenerator();
    private metrics = createMetricLogger();

    constructor(private database: DatabaseConnection, private discordApi: DiscordApi) {
        setInterval(this.sendMetrics, 60 * 1000);
    }

    public async findGame(socket: io.Socket, user: UserModel) {
        const { id, nickname } = user;

        const playerInGame = this.getPlayerInGame(id);

        if (playerInGame) {
            playerInGame.reconnectSocket(socket);

            return;
        }

        const lobby = this.getLobbyContainingPlayer(id);

        if (lobby) {
            lobby.reconnect(id, socket);

            return;
        }

        const { lobby: newLobby, created } = await this.findOrCreateLobby();
        newLobby.addConnection(socket, id, nickname);

        if (created) {
            this.discordApi.startLobby(nickname);
        }
    }

    private getPlayerInGame(id: string) {
        const games = Array.from<Game>(this.games.values());

        const matchingGame = games.find(g => g.getPlayerById(id));

        if (!matchingGame) {
            return null;
        }

        const playerInGame = matchingGame.getPlayerById(id);

        if (playerInGame.isDead()) {
            return null;
        }

        return playerInGame as SocketPlayer;
    }

    private getLobbyContainingPlayer(id: string) {
        const lobbies = Array.from<Lobby>(this.lobbies.values());

        return lobbies.find(g => g.getMemberById(id)) || null;
    }

    private getPictures(): number[] {
        const pictures: number[] = [];

        // todo tie this into definition provider
        for (let i = 1; i <= 46; i++) {
            pictures.push(i);
        }

        return shuffle(pictures);
    }

    private onLobbyStart = ({ id, members }: LobbyStartEvent) => {
        const pictures = this.getPictures();

        const game = new Game();

        const players = members.map(m => {
            if (m.type === LobbyMemberType.BOT) {
                const picture = pictures.pop();

                return new BotPlayer(m.id, m.name, picture);
            }

            if (m.type === LobbyMemberType.PLAYER) {
                // todo put this into db
                const picture = m.id === "276389458988761607"
                    ? 47
                    : pictures.pop();

                return new SocketPlayer(m.net.socket, m.id, m.name, picture);
            }
        });

        game.start(players);

        logger.info(`Game ${game.id} started from lobby ${id}`);

        const realPlayers = players
            .filter(p => (p as SocketPlayer).isConnection)
            .map(p => ({
                id: p.id,
                name: p.name
            }));
        logger.info(`Game started with ${realPlayers.length} real players: ${realPlayers.map(p => p.name).join(", ")}`, game.id);

        players
            .forEach(p => {
                if ((p as SocketPlayer).isConnection) {
                    // todo do this in 1 call
                    this.database.user.addGamePlayed(p.id);
                }

                if ((p as BotPlayer).isBot) {
                    // todo do this in 1 call
                    this.database.bot.addGamePlayed(p.id);
                }
            });

        game.onFinish((winner) => {
            logger.info(`Game finished`, game.id);

            if ((winner as SocketPlayer).isConnection) {
                this.database.user.addWin(winner.id);
                logger.info(`Game won by player ${winner.name}`, game.id);
            }

            if ((winner as BotPlayer).isBot) {
                this.database.bot.addWin(winner.id);
                logger.info(`Game won by bot '${winner.name}'`, game.id);
            }

            this.games.delete(game.id);
            this.sendMetrics();
        });

        this.games.set(game.id, game);
        this.lobbies.delete(id);

        this.sendMetrics();
    }

    private async findOrCreateLobby(): Promise<{ lobby: Lobby, created: boolean }> {
        const lobbies = Array.from(this.lobbies.values())
            .filter(lobby => lobby.canJoin());

        if (lobbies.length === 0) {
            return {
                lobby: await this.createLobby(),
                created: true
            };
        }

        lobbies.sort((a, b) => a.getFreeSlotCount() - b.getFreeSlotCount());

        return {
            lobby: lobbies[0],
            created: false
        };
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

import { Logger } from "winston";
import delay from "delay";
import io = require("socket.io");
import shuffle = require("lodash.shuffle");
import { Game, PlayerType } from "@creature-chess/gamemode";
import { DatabaseConnection } from "@creature-chess/data";
import { UserModel } from "@creature-chess/auth-server";
import { MAX_PLAYERS_IN_GAME } from "@creature-chess/models";
import { createWinstonLogger } from "../log";
import { DiscordApi } from "../discord";
import { createMetricLogger } from "../metrics";
import { SocketPlayer, BotPlayer } from "../player";
import { IdGenerator } from "./id-generator";
import { Lobby, LobbyStartEvent } from "./lobby/lobby";
import { LobbyMemberType } from "./lobby/lobbyMember";
import { sortMembersByPlayerType } from "./utils/sortMembersByPlayerType"

export class Matchmaking {
    private lobbies = new Map<string, Lobby>();
    private games = new Map<string, Game>();
    private lobbyIdGenerator = new IdGenerator();
    private metrics = createMetricLogger();
    private searchingForGame: boolean = false;

    constructor(private logger: Logger, private database: DatabaseConnection, private discordApi: DiscordApi) {
        setInterval(this.sendMetrics, 60 * 1000);
    }

    public async findGame(socket: io.Socket, user: UserModel) {
        while (this.searchingForGame) {
            await delay(250);
        }

        this.searchingForGame = true;

        const { id, nickname, profile } = user;

        const playerInGame = this.getPlayerInGame(id);

        if (playerInGame) {
            playerInGame.reconnectSocket(socket);

            this.searchingForGame = false;

            return;
        }

        const lobby = this.getLobbyContainingPlayer(id);

        if (lobby) {
            lobby.reconnect(id, socket);

            this.searchingForGame = false;

            return;
        }

        const { lobby: newLobby, created } = await this.findOrCreateLobby();
        newLobby.addConnection(socket, id, nickname, profile);

        if (created) {
            this.discordApi.startLobby(nickname);
        }

        this.searchingForGame = false;
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

    private generateProfile = (player, picture) => {
        return({
            picture,
            title: player.profile?.title ? player.profile.title : null
        });
    }


    private onLobbyStart = ({ id, members }: LobbyStartEvent) => {
        const pictures = this.getPictures();

        const removePictureFromArray = (picture) => {
            if (pictures.includes(picture)) {
                const index = pictures.indexOf(picture);
                pictures.splice(index, index);
        }};

        const assignPicture = (player) => player.profile?.picture || pictures.pop();

        const membersOrderedByType = members.sort(sortMembersByPlayerType);

        const players = membersOrderedByType.map(m => {
            const profilePicture = assignPicture(m)

            const profile = this.generateProfile(m, profilePicture);

            if (m.type === LobbyMemberType.BOT) {
                return new BotPlayer(m.id, m.name, profile);
            }
            removePictureFromArray(profilePicture);
            return new SocketPlayer(m.net.socket, m.id, m.name, profile);
        });

        const game = new Game(gameId => createWinstonLogger(`match-${gameId}`), players);

        this.logger.info(`Game ${game.id} started from lobby ${id}`);

        players
            .forEach(p => {
                if (p.type === PlayerType.USER) {
                    // todo do this in 1 call
                    this.database.user.addGamePlayed(p.id);
                }

                if (p.type === PlayerType.BOT) {
                    // todo do this in 1 call
                    this.database.bot.addGamePlayed(p.id);
                }
            });

        game.onFinish((winner) => {
            if (winner.type === PlayerType.USER) {
                this.database.user.addWin(winner.id);
            }

            if (winner.type === PlayerType.BOT) {
                this.database.bot.addWin(winner.id);
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

        this.logger.info(`[Lobby ${lobby.id}] created`);

        return lobby;
    }

    private sendMetrics = () => {
        this.metrics.sendGameCount(this.games.size);
    }
}

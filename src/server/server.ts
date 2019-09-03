import io = require("socket.io");
import uuid = require("uuid/v4");
import { log } from "@common/log";
import { ClientToServerPacketOpcodes, JoinGameResponse } from "@common/packet-opcodes";
import { Game } from "@common/game/game";
import { Connection } from "./connection";
import { Bot } from "@common/game/player/bot";
import { randomFromArray } from "@common/random-from-array";
import { MAX_NAME_LENGTH, MAX_PLAYERS_IN_GAME } from "@common/constants";

const BOT_NAMES = [
    "Duke Horacio",
    "Father Aereck",
    "Prince Ali",
    "Fred the Farmer",
    "King Roald",
    "Wise Old Man",
    "Thessalia",
    "Johnny the Beard",
    "Delrith",
    "Cap'n Izzy No-Beard",
    "Sir Amik Varze",
    "Party Pete",
    "Make-over mage",
    "Aggie",
    "Evil Dave"
];

const NAME_REGEX = /^[a-zA-Z0-9_\ ]*$/;

export class Server {
    private games = new Map<string, Game>();

    public listen(port: number) {
        const server = io.listen(port);

        log("Server listening on port " + port);

        server.on("connection", this.receiveConnection);
    }

    private receiveConnection = (socket: io.Socket) => {
        log("Connection received");

        let inGame = false;

        const onPlaySolo = (
            name: string,
            response: (response: JoinGameResponse) => void
        ) => {
            console.log("play solo received");
            if (inGame) {
                return;
            }
            
            if (name.match(NAME_REGEX) === null) {
                response({
                    error: "Invalid characters in name",
                    response: null
                });
                return;
            }

            const { game, gameId } = this.createGame(8);

            const player = new Connection(socket, name);
            game.addPlayer(player);
            game.onFinish(() => socket.disconnect());

            inGame = true;

            this.addBots(game, 7);

            response({
                error: null,
                response: {
                    playerId: player.id,
                    gameId
                }
            });
        }

        const onJoinGame = (
            name: string,
            gameId: string,
            response: (response: JoinGameResponse) => void
        ) => {
            if (inGame) {
                return;
            }

            if (name.match(NAME_REGEX) === null) {
                response({
                    error: "Invalid characters in name",
                    response: null
                });
                return;
            }

            const game = this.getGameForId(gameId);

            if (game === null) {
                response({
                    error: "Game not found",
                    response: null
                });
                return;
            }

            if (game.canAddPlayer() === false) {
                response({
                    error: "Game is not joinable",
                    response: null
                });
                return;
            }

            const player = new Connection(socket, name);

            game.addPlayer(player);
            game.onFinish(() => socket.disconnect());

            inGame = true;

            response({
                error: null,
                response: {
                    playerId: player.id,
                    gameId
                }
            });
        };

        const onCreateGame = (
            name: string,
            playerCount: number,
            botCount: number,
            response: (response: JoinGameResponse) => void
        ) => {
            if (inGame) {
                return;
            }

            if (name.match(NAME_REGEX) === null) {
                response({
                    error: "Invalid characters in name",
                    response: null
                });
                return;
            }

            if (name.length > MAX_NAME_LENGTH) {
                response({
                    error: "Name too long",
                    response: null
                });
                return;
            }

            if (playerCount > MAX_PLAYERS_IN_GAME) {
                response({
                    error: "Player count too high",
                    response: null
                });
                return;
            }

            if (playerCount < 2) {
                response({
                    error: "Player count too low",
                    response: null
                });
                return;
            }

            if (botCount > (playerCount - 1)) {
                response({
                    error: "Bot count too high",
                    response: null
                });
                return;
            }

            const { game, gameId } = this.createGame(playerCount);

            const player = new Connection(socket, name);
            game.addPlayer(player);
            game.onFinish(() => socket.disconnect());

            inGame = true;

            this.addBots(game, botCount);

            response({
                error: null,
                response: {
                    playerId: player.id,
                    gameId
                }
            });
        };

        socket.on(ClientToServerPacketOpcodes.PLAY_SOLO, onPlaySolo);
        socket.on(ClientToServerPacketOpcodes.JOIN_GAME, onJoinGame);
        socket.on(ClientToServerPacketOpcodes.CREATE_GAME, onCreateGame);
    }

    private createGame(playerCount: number) {
        const gameId = uuid().substring(0, 6);

        const game = new Game(playerCount);
        game.onFinish(() => this.games.delete(gameId));

        this.games.set(gameId, game);
        log(`Game '${gameId}' created for ${playerCount} players`);

        return {
            game,
            gameId
        };
    }

    private getGameForId(gameId: string) {
        return this.games.get(gameId) || null;
    }

    private addBots(game: Game, botCount: number) {
        for (let i = 0; i < botCount; i++) {
            this.addBot(game);
        }
    }

    private addBot(game: Game) {
        const playerNames = game.getPlayers().map(p => p.name);
        const availableNames = BOT_NAMES.filter(n => playerNames.includes(`[BOT] ${n}`) === false);

        const name = availableNames.length === 0
            ? `Bot Player #${playerNames.length}`
            : randomFromArray(availableNames);

        game.addPlayer(new Bot(`[BOT] ${name}`));
    }
}

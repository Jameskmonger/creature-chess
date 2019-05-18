import io = require("socket.io");
import uuid = require("uuid/v4");
import { log } from "@common/log";
import { ClientToServerPacketOpcodes, JoinGameResponse } from "@common/packet-opcodes";
import { Game } from "@common/game/game";
import { Connection } from "./connection";
import { Bot } from "@common/game/bot";
import { randomFromArray } from "@common/random-from-array";

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

        socket.on(
            ClientToServerPacketOpcodes.JOIN_GAME,
            (
                name: string,
                gameId: string,
                response: (response: JoinGameResponse) => void
            ) => {
                console.log("Join game received");
                if (inGame) {
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
                inGame = true;

                response({
                    error: null,
                    response: {
                        playerId: player.id,
                        gameId
                    }
                });
            }
        );

        socket.on(
            ClientToServerPacketOpcodes.CREATE_GAME,
            (
                name: string,
                playerCount: number,
                botCount: number,
                response: (response: JoinGameResponse) => void
            ) => {
                console.log("Create game received");
                if (inGame) {
                    return;
                }

                if (playerCount < 2) {
                    console.log(`Player count ${playerCount} too low`);
                    response({
                        error: "Player count too low",
                        response: null
                    });
                    return;
                }

                if (botCount > (playerCount - 1)) {
                    console.log(`Bot count ${botCount} too high (player count is ${playerCount})`);
                    response({
                        error: "Bot count too high",
                        response: null
                    });
                    return;
                }

                const gameId = uuid().split("-")[0];
                const game = new Game(playerCount);
                this.games.set(gameId, game);
                log(`Game '${gameId}' created for ${playerCount} players`);

                const player = new Connection(socket, name);

                game.addPlayer(player);
                inGame = true;

                for (let i = 0; i < botCount; i++) {
                    this.addBot(game);
                }

                response({
                    error: null,
                    response: {
                        playerId: player.id,
                        gameId
                    }
                });
            }
        );
    }

    private getGameForId(gameId: string) {
        return this.games.get(gameId) || null;
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

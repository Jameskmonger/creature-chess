import io = require("socket.io");
import { log } from "./log";
import { ClientToServerPacketOpcodes } from "../shared/packet-opcodes";
import { Game } from "./game";
import { Connection } from "./players/connection";
import { Bot } from "./players/bot";
import { randomFromArray } from "./random-from-array";

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
    private game: Game;

    constructor(gameSize: number, botCount: number) {
        this.game = new Game(gameSize);

        for (let i = 0; i < botCount; i++) {
            this.addBot();
        }
    }

    public listen(port: number) {
        const server = io.listen(port);

        log("Server listening on port " + port);

        server.on("connection", (socket: io.Socket) => {
            log("Connection received");

            socket.on(ClientToServerPacketOpcodes.JOIN_GAME, (name: string, response: (id: string) => void) => {
                const player = this.game.addPlayer((gamePhaseObservable, opponentProvider, deck) => {
                    return new Connection(socket, gamePhaseObservable, opponentProvider, deck, name);
                });

                response(player.id);
            });
        });
    }

    private addBot() {
        const playerNames = this.game.getPlayers().map(p => p.name);
        const availableNames = BOT_NAMES.filter(n => playerNames.includes(`[BOT] ${n}`) === false);

        const name = availableNames.length === 0
            ? `Bot Player #${playerNames.length}`
            : randomFromArray(availableNames);

        this.game.addPlayer((gamePhaseObservable, opponentProvider, deck) => {
            return new Bot(gamePhaseObservable, opponentProvider, deck, `[BOT] ${name}`);
        });
    }
}

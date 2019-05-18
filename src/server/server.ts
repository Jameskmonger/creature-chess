import io = require("socket.io");
import { log } from "@common/log";
import { ClientToServerPacketOpcodes } from "@common/packet-opcodes";
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
                const player = new Connection(socket, name);

                this.game.addPlayer(player);

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

        this.game.addPlayer(new Bot(`[BOT] ${name}`));
    }
}

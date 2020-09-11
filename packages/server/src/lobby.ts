import { Socket } from "socket.io";
import { EventEmitter } from "events";
import { Player, Bot } from "@creature-chess/shared/game";
import { randomFromArray } from "@creature-chess/shared/utils";
import { MAX_PLAYERS_IN_GAME, LOBBY_WAIT_TIME as LOBBY_WAIT_TIME_SECONDS } from "@creature-chess/models/constants";
import { IdGenerator } from "./id-generator";
import { Connection } from "./connection";

const BOT_NAMES = [
    "Aggie",
    "Bertie",
    "Conan",
    "Dawn",
    "Eddy",
    "Fox",
    "Ghost",
    "Hazuki",
    "Isaac",
    "C.J.",
    "Knuckle",
    "Lily",
    "Madison",
    "Navi",
    "Oscar",
    "Price",
    "Quiet",
    "Rune",
    "Smoke",
    "Tony",
    "U.B.",
    "Venom",
    "Warp",
    "Xenon",
    "Yew",
    "Zero"
];

enum LobbyEvents {
    START_GAME = "START_GAME"
}

export class Lobby {
    public readonly id: string;
    public readonly isPublic: boolean;
    public readonly gameStartTime: number = null;
    public readonly hostId: string;

    private players: Player[];
    private events = new EventEmitter();
    private gameStarted: boolean = false;

    constructor(idGenerator: IdGenerator, initialPlayer: Player, isPublic: boolean) {
        this.id = idGenerator.generateId();

        this.players = [initialPlayer];
        this.hostId = initialPlayer.id;
        initialPlayer.onStartLobbyGame(this.startGame);

        for (let i = 0; i < MAX_PLAYERS_IN_GAME - 1; i++) {
            this.addBot();
        }

        this.isPublic = isPublic;

        // start public games automatically
        if (this.isPublic) {
            const waitTimeMs = LOBBY_WAIT_TIME_SECONDS * 1000;
            this.gameStartTime = Date.now() + waitTimeMs;
            setTimeout(this.startGame, waitTimeMs);
        }
    }

    public onStartGame(fn: () => void) {
        this.events.on(LobbyEvents.START_GAME, fn);
    }

    public canJoin() {
        return this.gameStarted === false && this.getRealPlayerCount() < MAX_PLAYERS_IN_GAME;
    }

    public replaceConnectedPlayer(player: Player, socket: Socket) {
        const matchingPlayer = this.players.find(p => p.id === player.id);

        if (!matchingPlayer) {
            console.error("No matching player");
            return;
        }

        if (!(player as Connection).isConnection) {
            console.error("Tried to replace non-connection player");
            return;
        }

        (player as Connection).setSocket(socket);
    }

    public addPlayer(player: Player) {
        if (this.getRealPlayerCount() >= MAX_PLAYERS_IN_GAME) {
            throw Error("Too many players in lobby");
        }

        let playerChangedIndex = null;

        // add the player
        for (let i = 0; i < this.players.length; i++) {
            // skip real players
            if (this.players[i].isBot === false) {
                continue;
            }

            playerChangedIndex = i;
            this.players[i] = player;
            break;
        }

        // notify other players
        for (const otherPlayer of this.players) {
            // skip the player we just added
            if (player.id === otherPlayer.id) {
                continue;
            }

            const lobbyPlayer = ({
                id: player.id,
                name: player.name,
                isBot: player.isBot,

                // only first player can be host so no point trying to calculate it for a just-added player
                isHost: false
            });
            otherPlayer.onLobbyPlayerUpdate(playerChangedIndex, lobbyPlayer);
        }

        if (this.getRealPlayerCount() === MAX_PLAYERS_IN_GAME) {
            this.startGame();
        }
    }

    public getPlayers() {
        return this.players.slice(0);
    }

    public getRealPlayerCount() {
        return this.players.filter(p => p.isBot === false).length;
    }

    private startGame = () => {
        if (this.gameStarted) {
            throw Error("Tried to start already-started game");
        }

        this.gameStarted = true;
        this.events.emit(LobbyEvents.START_GAME);
    }

    private addBot() {
        const playerNames = this.players.map(p => p.name);
        const availableNames = BOT_NAMES.filter(n => playerNames.includes(`[BOT] ${n}`) === false);

        const name = availableNames.length === 0
            ? `Bot Player #${playerNames.length}`
            : randomFromArray(availableNames);

        this.players.push(new Bot(`[BOT] ${name}`));
    }
}

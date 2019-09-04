import { EventEmitter } from "events";
import { Player, Bot } from "@common/game";
import { randomFromArray } from "@common/random-from-array";
import { IdGenerator } from './id-generator';
import { MAX_PLAYERS_IN_GAME, LOBBY_WAIT_TIME_MS } from '@common/constants';

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

enum LobbyEvents {
    START_GAME = "START_GAME"
}

export class Lobby {
    public readonly id: string;
    public readonly isPublic: boolean;
    private players: Player[];
    private events = new EventEmitter();
    private gameStarted: boolean = false;

    constructor(idGenerator: IdGenerator, initialPlayer: Player, isPublic: boolean) {
        this.id = idGenerator.generateId();

        this.players = [ initialPlayer ];
        for (let i = 0; i < MAX_PLAYERS_IN_GAME - 1; i++) {
            this.addBot();
        }

        this.isPublic = isPublic;

        // start public games automatically
        if (this.isPublic) {
            setTimeout(() => this.startGame(), LOBBY_WAIT_TIME_MS);
        }
    }

    public onStartGame(fn: (players: Player[]) => void) {
        this.events.on(LobbyEvents.START_GAME, fn);
    }

    public canJoin() {
        return this.gameStarted === false && this.getRealPlayerCount() < MAX_PLAYERS_IN_GAME;
    }

    public addPlayer(player: Player) {
        if (this.getRealPlayerCount() >= MAX_PLAYERS_IN_GAME) {
            throw Error("Too many players in lobby");
        }

        for (let i = 0; i < this.players.length; i++) {
            // skip real players
            if (this.players[i].isBot === false) {
                continue;
            }

            this.players[i] = player;
        }

        if (this.getRealPlayerCount() === MAX_PLAYERS_IN_GAME) {
            this.startGame();
        }
    }

    public getPlayers() {
        return this.players.slice(0);
    }

    private getRealPlayerCount() {
        return this.players.filter(p => p.isBot === false).length;
    }

    private startGame() {
        if (this.gameStarted) {
            throw Error("Tried to start already-started game");
        }

        this.gameStarted = true;
        this.events.emit(LobbyEvents.START_GAME, this.players);
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
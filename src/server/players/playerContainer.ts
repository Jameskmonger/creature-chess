import io = require("socket.io");
import { Connection } from "./connection";
import { ClientToServerPacketOpcodes } from "../../shared/packet-opcodes";
import { log } from "../log";
import { Player } from "./player";
import { CardDeck } from "../cardDeck";

const randomFromArray = <T>(array: T[]) => {
    return array[Math.floor(Math.random() * array.length)];
};

export class PlayerContainer {
    private GAME_SIZE: number;
    private deck: CardDeck;

    private players: Player[] = [];
    private acceptingPlayers: boolean = true;
    private onLobbyFullListeners: (() => void)[] = [];

    constructor(gameSize: number, deck: CardDeck) {
        this.GAME_SIZE = gameSize;
        this.deck = deck;
    }

    public receiveConnection = (socket: io.Socket) => {
        log("Connection received");

        const connection = new Connection(socket);

        connection.onJoinGame(this.onJoinGame(connection));
    }

    public onLobbyFull(fn: () => void) {
        this.onLobbyFullListeners.push(fn);

        if (this.players.length === this.GAME_SIZE) {
            fn();
        }
    }

    public updatePlayerLists = () => {
        this.players.forEach(p => p.sendPlayerListUpdate(this.players));
    }

    public startPreparingPhase() {
        this.players
            .filter(p => p.isAlive())
            .forEach(p => {
                p.rerollCards();

                p.sendPreparingPhaseUpdate();
            });
    }

    public startReadyPhase() {
        this.players
            .filter(p => p.isAlive())
            .forEach(p => {
                const others = this.players.filter(other => other.isAlive() && other.id !== p.id);
                const opponent = randomFromArray(others);

                p.sendReadyPhaseUpdate(opponent);
            });
    }

    public async startPlayingPhase(seed: number) {
        const promises = this.players.filter(p => p.isAlive()).map(p => p.runPlayingPhase(seed));

        await Promise.all(promises);
    }

    public playersAlive() {
        return this.players.some(p => p.isAlive());
    }

    private onJoinGame(connection: Connection) {
        return (name: string, response: (id: string) => void) => {
            if (!name
                || this.acceptingPlayers === false
                || this.players.length === this.GAME_SIZE) {
                // can't join game
                // todo: don't just hang the connection here, disconnect properly
                return;
            }

            log(`${name} has joined the game`);

            const player = new Player(connection, name, this.deck);

            response(player.id);

            player.onHealthUpdate(this.updatePlayerLists);

            this.players.push(player);

            this.updatePlayerLists();

            if (this.players.length === this.GAME_SIZE) {
                this.acceptingPlayers = false;
                this.onLobbyFullListeners.forEach(fn => fn());
            }
        };
    }
}

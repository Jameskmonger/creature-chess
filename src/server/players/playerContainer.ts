import io = require("socket.io");
import { Connection } from "./connection";
import { log } from "../log";
import { Player } from "./player";
import { CardDeck } from "../cardDeck";
import uuid = require("uuid");
import { FeedMessage } from "@common/feed-message";
import { Constants, GamePhase } from "../../shared";
import delay from "delay";
import { ClientToServerPacketOpcodes } from "../../shared/packet-opcodes";
import { Bot } from "./bot";

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

        socket.on(ClientToServerPacketOpcodes.JOIN_GAME, this.onJoinGame(socket));
    }

    public onLobbyFull(fn: () => void) {
        this.onLobbyFullListeners.push(fn);

        if (this.players.length === this.GAME_SIZE) {
            fn();
        }
    }

    public updatePlayerLists = () => {
        this.players.forEach(p => p.onPlayerListUpdate(this.players));
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
        const maxTimeMs = Constants.PHASE_LENGTHS[GamePhase.PLAYING] * 1000;
        const battleTimeout = delay(maxTimeMs);

        const promises = this.players.filter(p => p.isAlive()).map(p => p.runPlayingPhase(seed, battleTimeout));

        const results = await Promise.all(promises);

        results.forEach(({player, opponent, win, damage}) => {
            const resultMessageText = `${player.name} ${win ? "beat" : "lost to"} ${opponent.name}`;
            this.sendFeedMessageToAllPlayers({ text: resultMessageText, id: uuid() });
            if (damage) {
                const damageMessageText = `${player.name} was hit for ${damage}`;
                this.sendFeedMessageToAllPlayers({ text: damageMessageText, id: uuid() });
            }
        });
    }

    public playersAlive() {
        return this.players.some(p => p.isAlive());
    }

    public addBot(index: number) {
        this.players.push(new Bot(`[BOT] Bot #${index}`, this.deck));
    }

    private onJoinGame(socket: io.Socket) {
        return (name: string, response: (id: string) => void) => {
            if (!name
                || this.acceptingPlayers === false
                || this.players.length === this.GAME_SIZE) {
                // can't join game
                // todo: don't just hang the connection here, disconnect properly
                return;
            }

            log(`${name} has joined the game`);

            const player = new Connection(socket, name, this.deck);

            response(player.id);

            player.onHealthUpdate(this.updatePlayerLists);
            player.onSendChatMessage(message => this.sendChatMessage(player, message));

            this.players.push(player);

            this.updatePlayerLists();

            if (this.players.length === this.GAME_SIZE) {
                this.acceptingPlayers = false;
                this.onLobbyFullListeners.forEach(fn => fn());
            }
        };
    }

    private sendChatMessage = (sender: Player, message: string) => {
        this.sendFeedMessageToAllPlayers({ id: uuid(), fromId: sender.id, text: message }, [sender.id]);
    }

    private sendFeedMessageToAllPlayers(message: FeedMessage, exceptPlayerIds: string[] = []) {
        this.players.filter(p => exceptPlayerIds.indexOf(p.id) === -1).forEach(p => p.onNewFeedMessage(message));
    }
}

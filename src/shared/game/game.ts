import uuid = require("uuid");
import delay from "delay";
import { GamePhase } from "../game-phase";
import { FeedMessage, FeedMessageType } from "../feed-message";
import { Player } from "./player";
import { OpponentProvider } from "./opponentProvider";
import { CardDeck } from "../cardShop/cardDeck";
import { log } from "../log";
import { getAllDefinitions } from "../models/creatureDefinition";
import { PHASE_LENGTHS, CELEBRATION_TIME } from "../constants";

const startStopwatch = () => process.hrtime();
const stopwatch = (start: [number, number]) => {
    const end = process.hrtime(start);
    return Math.round((end[0] * 1000) + (end[1] / 1000000));
};

export class Game {
    private GAME_SIZE: number;
    private round = 0;
    private phase = GamePhase.WAITING;
    private opponentProvider = new OpponentProvider();
    private deck = new CardDeck(getAllDefinitions());
    private players: Player[] = [];

    constructor(gameSize: number) {
        this.GAME_SIZE = gameSize;
        this.opponentProvider.setPlayers(this.players);
    }

    public getPlayers() {
        return this.players;
    }

    public canAddPlayer() {
        return this.players.length < this.GAME_SIZE && this.phase === GamePhase.WAITING;
    }

    public addPlayer(player: Player) {
        if (this.canAddPlayer() === false) {
            return;
        }

        player.onHealthUpdate(this.updatePlayerLists);

        player.onSendChatMessage(message => {
            this.sendFeedMessageToAllPlayers({
                id: uuid(),
                type: FeedMessageType.CHAT,
                payload: {
                    text: message,
                    fromId: player.id
                }
            });
        });

        player.onFinishMatch(results => {
            this.sendFeedMessageToAllPlayers({
                id: uuid(),
                type: FeedMessageType.BATTLE,
                payload: results
            });
        });

        this.players.push(player);
        player.setDeck(this.deck);
        this.updatePlayerLists();

        if (this.players.length === this.GAME_SIZE) {
            setTimeout(() => {
                this.startGame();
            });
        }

        return player;
    }

    private startGame = async () => {
        if (this.phase !== GamePhase.WAITING) {
            return;
        }

        const startTime = startStopwatch();

        while (this.players.filter(p => p.isAlive()).length >= 2) {
            await this.runPreparingPhase();

            await this.runReadyPhase();

            await this.runPlayingPhase();
        }

        const duration = stopwatch(startTime);

        log(`Match complete in ${(duration)} ms (${this.round} rounds)`);

        this.updatePlayerLists();
    }

    private async runPreparingPhase() {
        this.round++;

        log(`Entering phase ${GamePhase[GamePhase.PREPARING]} (round ${this.round})`);

        this.phase = GamePhase.PREPARING;

        this.players.forEach(p => p.enterPreparingPhase());

        await delay(PHASE_LENGTHS[GamePhase.PREPARING] * 1000);
    }

    private async runReadyPhase() {
        log(`Entering phase ${GamePhase[GamePhase.READY]}`);

        this.phase = GamePhase.READY;

        this.players.forEach(p => p.enterReadyPhase(this.opponentProvider));

        await delay(PHASE_LENGTHS[GamePhase.READY] * 1000);
    }

    private async runPlayingPhase() {
        log(`Entering phase ${GamePhase[GamePhase.PLAYING]}`);

        this.phase = GamePhase.PLAYING;

        await this.fightBattles();
    }

    private async fightBattles() {
        const maxTimeMs = PHASE_LENGTHS[GamePhase.PLAYING] * 1000;
        const battleTimeout = delay(maxTimeMs);

        const promises = this.players.filter(p => p.isAlive()).map(p => p.fightMatch(battleTimeout));

        await Promise.all(promises);

        await delay(CELEBRATION_TIME); // celebration time
    }

    private sendFeedMessageToAllPlayers(message: FeedMessage) {
        this.players.forEach(p => p.onNewFeedMessage(message));
    }

    private updatePlayerLists = () => {
        this.players.forEach(p => p.onPlayerListUpdate(this.players));
    }
}

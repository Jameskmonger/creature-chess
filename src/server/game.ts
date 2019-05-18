import uuid = require("uuid");
import delay from "delay";
import { GamePhase, Constants } from "@common";
import { FeedMessage, FeedMessageType } from "@common/feed-message";
import { Player } from "./players/player";
import { OpponentProvider } from "./players/opponentProvider";
import { CardDeck } from "./cardDeck";
import { log } from "./log";
import { getAllDefinitions } from "@common/models/creatureDefinition";

export class Game {
    private GAME_SIZE: number;
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

        setTimeout(() => {
            if (this.players.length === this.GAME_SIZE) {
                this.startGame();
            }
        }, 100);

        return player;
    }

    private startGame = async () => {
        while (this.players.filter(p => p.isAlive()).length >= 2) {
            await this.runPreparingPhase();

            await this.runReadyPhase();

            await this.runPlayingPhase();
        }

        this.updatePlayerLists();
    }

    private async runPreparingPhase() {
        log(`Entering phase ${GamePhase[GamePhase.PREPARING]}`);

        this.phase = GamePhase.PREPARING;

        this.players.forEach(p => p.enterPreparingPhase());

        await delay(Constants.PHASE_LENGTHS[GamePhase.PREPARING] * 1000);
    }

    private async runReadyPhase() {
        log(`Entering phase ${GamePhase[GamePhase.READY]}`);

        this.phase = GamePhase.READY;

        this.players.forEach(p => p.enterReadyPhase(this.opponentProvider));

        await delay(Constants.PHASE_LENGTHS[GamePhase.READY] * 1000);
    }

    private async runPlayingPhase() {
        log(`Entering phase ${GamePhase[GamePhase.PLAYING]}`);

        this.phase = GamePhase.PLAYING;

        await this.fightBattles();
    }

    private async fightBattles() {
        const maxTimeMs = Constants.PHASE_LENGTHS[GamePhase.PLAYING] * 1000;
        const battleTimeout = delay(maxTimeMs);

        const promises = this.players.filter(p => p.isAlive()).map(p => p.fightMatch(battleTimeout));

        await Promise.all(promises);
    }

    private sendFeedMessageToAllPlayers(message: FeedMessage) {
        this.players.forEach(p => p.onNewFeedMessage(message));
    }

    private updatePlayerLists = () => {
        this.players.forEach(p => p.onPlayerListUpdate(this.players));
    }
}

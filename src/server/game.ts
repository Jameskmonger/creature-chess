import uuid = require("uuid");
import delay from "delay";
import { Observable } from "./observable/observable";
import { GamePhase, Constants, getAllDefinitions } from "../shared";
import { Player } from "./players/player";
import { OpponentProvider } from "./players/opponentProvider";
import { CardDeck } from "./cardDeck";
import { log } from "./log";
import { FeedMessage } from "../shared/feed-message";

export class Game {
    private GAME_SIZE: number;
    private phase = new Observable(GamePhase.WAITING);
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
        return this.players.length < this.GAME_SIZE && this.phase.getValue() === GamePhase.WAITING;
    }

    public addPlayer(factory: (phase: Observable<GamePhase>, opponentProvider: OpponentProvider, deck: CardDeck) => Player) {
        if (this.canAddPlayer() === false) {
            return;
        }

        const player = factory(this.phase, this.opponentProvider, this.deck);

        player.onHealthUpdate(this.updatePlayerLists);

        this.players.push(player);
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

        this.phase.setValue(GamePhase.PREPARING);

        await delay(Constants.PHASE_LENGTHS[GamePhase.PREPARING] * 1000);
    }

    private async runReadyPhase() {
        log(`Entering phase ${GamePhase[GamePhase.READY]}`);

        this.phase.setValue(GamePhase.READY);

        await delay(Constants.PHASE_LENGTHS[GamePhase.READY] * 1000);
    }

    private async runPlayingPhase() {
        log(`Entering phase ${GamePhase[GamePhase.PLAYING]}`);

        this.phase.setValue(GamePhase.PLAYING);

        await this.fightBattles();
    }

    private async fightBattles() {
        const maxTimeMs = Constants.PHASE_LENGTHS[GamePhase.PLAYING] * 1000;
        const battleTimeout = delay(maxTimeMs);

        const promises = this.players.filter(p => p.isAlive()).map(p => p.fightMatch(battleTimeout));

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

    private sendFeedMessageToAllPlayers(message: FeedMessage, exceptPlayerIds: string[] = []) {
        this.players.filter(p => exceptPlayerIds.indexOf(p.id) === -1).forEach(p => p.onNewFeedMessage(message));
    }

    private updatePlayerLists = () => {
        this.players.forEach(p => p.onPlayerListUpdate(this.players));
    }
}

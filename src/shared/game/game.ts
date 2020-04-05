import uuid = require("uuid");
import delay from "delay";
import { GamePhase } from "../models/game-phase";
import { FeedMessage } from "../models/feed-message";
import { Player, PlayerMatchResults } from "./player/player";
import { OpponentProvider } from "./opponentProvider";
import { CardDeck } from "../cardShop/cardDeck";
import { log } from "../log";
import { PHASE_LENGTHS, CELEBRATION_TIME, DEFAULT_TURN_COUNT, DEFAULT_TURN_DURATION, RESURRECT_HEALTH } from "../models/constants";
import { EventEmitter } from "events";
import { PlayerList } from "./playerList";
import { TurnSimulator } from "../match/combat/turnSimulator";
import { DefinitionProvider } from "./definitionProvider";
import { EventManager } from "./events/eventManager";
import { matchRewards } from "./plugins/matchRewards";
import { resetPlayer } from "./plugins/resetPlayer";

const startStopwatch = () => process.hrtime();
const stopwatch = (start: [number, number]) => {
    const end = process.hrtime(start);
    return Math.round((end[0] * 1000) + (end[1] / 1000000));
};

enum GameEvents {
    FINISH_GAME = "FINISH_GAME"
}

interface PhaseLengths {
    [GamePhase.PREPARING]?: number;
    [GamePhase.READY]?: number;
    [GamePhase.PLAYING]?: number;
}

const defaultPhaseLengths: PhaseLengths = PHASE_LENGTHS;

export class Game {
    public readonly id: string;
    private phaseLengths: PhaseLengths;
    private turnCount: number;
    private turnDuration: number;
    private GAME_SIZE: number;
    private round = 0;
    private lastLivingPlayerCount: number;
    private phase = GamePhase.WAITING;
    private opponentProvider = new OpponentProvider();
    private playerList = new PlayerList();
    private turnSimulator: TurnSimulator;
    private definitionProvider = new DefinitionProvider();
    private players: Player[] = [];
    private events = new EventEmitter();
    private deck: CardDeck;
    private eventManager = new EventManager();

    constructor(gameSize: number, phaseLengths?: PhaseLengths, turnCount?: number, turnDuration?: number) {
        this.id = uuid();

        this.GAME_SIZE = gameSize;
        this.phaseLengths = { ...defaultPhaseLengths, ...phaseLengths };
        this.turnCount = turnCount >= 0 ? turnCount : DEFAULT_TURN_COUNT;
        this.turnDuration = turnDuration >= 0 ? turnDuration : DEFAULT_TURN_DURATION;

        const livingPlayers = this.players.filter(p => p.isAlive());
        this.opponentProvider.setPlayers(livingPlayers);
        this.lastLivingPlayerCount = livingPlayers.length;

        this.deck = new CardDeck(this.definitionProvider.getAll());
        this.turnSimulator = new TurnSimulator(this.definitionProvider);

        this.playerList.onUpdate(playerList => this.players.forEach(p => p.onPlayerListUpdate(playerList)));

        this.registerPlugins();
    }

    public onFinish(fn: (rounds: number, winner: Player, startTimeMs: number, players: { name: string }[], durationMs: number) => void) {
        this.events.on(GameEvents.FINISH_GAME, fn);
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

        player.onSendChatMessage(message => {
            this.sendChatMessageToAllPlayers(player.id, message);
        });

        this.players.push(player);
        this.playerList.addPlayer(player);
        player.setDeck(this.deck);
        player.setDefinitionProvider(this.definitionProvider);
        player.setTurnCount(this.turnCount);
        player.setTurnDuration(this.turnDuration);

        if (this.players.length === this.GAME_SIZE) {
            // execute at the end of the execution queue
            setTimeout(() => {
                this.startGame();
            });
        }

        return player;
    }

    public getPlayerById(playerId: string) {
        return this.players.find(p => p.id === playerId);
    }

    private startGame = async () => {
        if (this.phase !== GamePhase.WAITING) {
            return;
        }

        const startTime = startStopwatch();
        const startTimeMs = Date.now();

        this.players.forEach(p => p.onStartGame(this.id));

        while (true) {
            await this.runPreparingPhase();

            await this.runReadyPhase();

            await this.runPlayingPhase();

            const livingPlayers = this.players.filter(p => p.isAlive());

            if (livingPlayers.length === 1) {
                break;
            }
        }

        const duration = stopwatch(startTime);

        log(`Match complete in ${(duration)} ms (${this.round} rounds)`);

        const winner = this.players.find(p => p.isAlive());

        this.players.forEach(p => p.onFinishGame(winner));

        const metricPlayers = this.players.map(p => ({
            name: p.name,
            isBot: p.isBot
        }));

        this.events.emit(GameEvents.FINISH_GAME, this.round, winner, startTimeMs, metricPlayers, duration);
    }

    private async runPreparingPhase() {
        this.round++;

        this.updateLivingPlayers();

        this.phase = GamePhase.PREPARING;

        this.eventManager.getTriggers().enterPreparingPhase(this.players);

        const promises = this.players.map(p => p.enterPreparingPhase(this.round));

        await Promise.race([
            Promise.all(promises),
            delay(this.phaseLengths[GamePhase.PREPARING] * 1000)
        ]);
    }

    private updateLivingPlayers() {
        const livingPlayers = this.players.filter(p => p.isAlive());
        const livingPlayerCount = livingPlayers.length;

        if (livingPlayerCount !== this.lastLivingPlayerCount) {
            this.opponentProvider.setPlayers(livingPlayers);
            this.lastLivingPlayerCount = livingPlayerCount;
        }
    }

    private async runReadyPhase() {
        this.phase = GamePhase.READY;

        this.players.forEach(p => p.enterReadyPhase(this.turnSimulator, this.opponentProvider));

        await delay(this.phaseLengths[GamePhase.READY] * 1000);
    }

    private async runPlayingPhase() {
        this.phase = GamePhase.PLAYING;

        this.opponentProvider.updateRotation();

        await this.fightBattles();
    }

    private async fightBattles() {
        const maxTimeMs = this.phaseLengths[GamePhase.PLAYING] * 1000;
        const battleTimeout = delay(maxTimeMs);

        const livingPlayers = this.players.filter(p => p.isAlive());

        const onPlayerFinishBattle = (results: PlayerMatchResults) => {
            const damage = results.awayScore * 3;

            results.homePlayer.subtractHealth(damage);
        };
        const promises = livingPlayers.map(p => p.fightMatch(battleTimeout).then(onPlayerFinishBattle));

        await Promise.all(promises);

        const newLivingPlayers = this.players.filter(p => p.isAlive());

        if (newLivingPlayers.length === 0) {
            const justDiedPlayers = this.players.filter(p => p.getRoundDiedAt() === this.round);

            for (const player of justDiedPlayers) {
                player.resurrect(RESURRECT_HEALTH);
            }

            const justDiedPlayerIds = justDiedPlayers.map(p => p.id);
            for (const player of this.players) {
                player.broadcastResurrections(justDiedPlayerIds);
            }
        }

        for (const player of this.players.filter(p => p.getRoundDiedAt() === this.round)) {
            player.kill();
        }

        await delay(CELEBRATION_TIME); // celebration time

        this.eventManager.getTriggers().finishRound(this.players);
    }

    private sendChatMessageToAllPlayers(playerId: string, text: string) {
        const message: FeedMessage = {
            id: uuid(),
            fromId: playerId,
            text
        };

        this.players.forEach(p => p.onNewFeedMessage(message));
    }

    private registerPlugins() {
        matchRewards(this.eventManager);
        resetPlayer(this.eventManager);
    }
}

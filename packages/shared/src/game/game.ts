import { v4 as uuid } from "uuid";
import { EventEmitter } from "events";
import delay from "delay";
import pDefer = require("p-defer");
import { GamePhase, PlayerStatus, RESURRECT_HEALTH } from "@creature-chess/models";

import { log } from "../log";

import { DefinitionProvider } from "./definitions/definitionProvider";
import { Player } from "./player";
import { OpponentProvider } from "./opponentProvider";
import { PlayerList } from "./playerList";
import { createGameStore, GameActions } from "./store";
import { GameOptions, getOptions } from "./options";
import { readyNotifier } from "./readyNotifier";
import { Match, TurnSimulator } from "./match";
import { CardDeck } from "./cardDeck";

const startStopwatch = () => process.hrtime();
const stopwatch = (start: [number, number]) => {
    const end = process.hrtime(start);
    return Math.round((end[0] * 1000) + (end[1] / 1000000));
};

enum GameEvents {
    FINISH_GAME = "FINISH_GAME"
}

export class Game {
    public readonly id: string;

    private options: GameOptions;

    private lastLivingPlayerCount: number = 0;
    private opponentProvider = new OpponentProvider();
    private playerList = new PlayerList();
    private turnSimulator: TurnSimulator;
    private definitionProvider = new DefinitionProvider();
    private players: Player[] = [];
    private events = new EventEmitter();
    private deck: CardDeck;

    private store = createGameStore();

    constructor(players: Player[], options?: Partial<GameOptions>) {
        this.id = uuid();

        this.options = getOptions(options);

        this.deck = new CardDeck(this.definitionProvider.getAll());
        this.turnSimulator = new TurnSimulator();

        this.playerList.onUpdate(playerList =>
            this.players
                .filter(p => p.getStatus() === PlayerStatus.CONNECTED)
                .forEach(p => p.onPlayerListUpdate(playerList))
        );

        players.forEach(this.addPlayer);

        this.updateOpponentProvider();

        // execute at the end of the execution queue
        setTimeout(this.startGame);
    }

    public onFinish(fn: (winner: Player) => void) {
        this.events.on(GameEvents.FINISH_GAME, fn);
    }

    public getPlayerById(playerId: string) {
        return this.players.find(p => p.getStatus() !== PlayerStatus.QUIT && p.id === playerId);
    }

    public getPlayerList() {
        return this.playerList.getValue();
    }

    public addPlayer = (player: Player) => {
        this.players.push(player);
        this.playerList.addPlayer(player);

        player.setDeck(this.deck);
        player.setGetGameState(this.store.getState);
        player.setGetPlayerListPlayers(this.playerList.getValue);
        player.setDefinitionProvider(this.definitionProvider);
    }

    private startGame = async () => {
        if (this.store.getState().phase !== null) {
            return;
        }

        const startTime = startStopwatch();
        const startTimeMs = Date.now();

        this.players.forEach(p => p.onStartGame(this.id));

        while (true) {
            await this.runPreparingPhase();

            await this.runReadyPhase();

            await this.runPlayingPhase();

            if (this.getLivingPlayers().length === 1) {
                break;
            }
        }

        const duration = stopwatch(startTime);

        log(`Match complete in ${(duration)} ms (${this.store.getState().round} rounds)`);

        // teardown
        this.opponentProvider = null;
        this.deck = null;
        this.turnSimulator = null;
        this.playerList.deconstructor();
        this.playerList = null;
        this.definitionProvider = null;

        const winner = this.getLivingPlayers()[0];

        this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT).forEach(p => p.onFinishGame(winner));

        const gamePlayers = this.players.map(p => ({
            id: p.id,
            name: p.name
        }));

        this.events.emit(GameEvents.FINISH_GAME, winner, gamePlayers);

        // more teardown
        this.events.removeAllListeners();
        this.events = null;
    }

    private async runPreparingPhase() {
        const { round } = this.store.getState();
        this.store.dispatch(GameActions.startPreparingPhaseCommand(round + 1, Date.now() / 1000));

        const livingPlayers = this.getLivingPlayers();

        const notifier = readyNotifier(livingPlayers);
        livingPlayers.forEach(p => p.enterPreparingPhase());

        await Promise.race([
            notifier.promise,
            this.delayPhaseLength(GamePhase.PREPARING)
        ]);

        notifier.dispose();

        this.getLivingPlayers().forEach(p => p.fillBoard());
    }

    private async runReadyPhase() {
        this.store.dispatch(GameActions.startGamePhaseCommand(GamePhase.READY, Date.now() / 1000));

        this.updateOpponentProvider();

        this.getLivingPlayers().forEach(player => {
            const opponent = this.opponentProvider.getOpponent(player.id);

            const match = new Match(this.turnSimulator, this.options.turnCount, this.options.turnDuration, player, opponent);

            player.enterReadyPhase(match);
        });

        this.opponentProvider.updateRotation();

        await this.delayPhaseLength(GamePhase.READY);
    }

    private async runPlayingPhase() {
        this.store.dispatch(GameActions.startGamePhaseCommand(GamePhase.PLAYING, Date.now() / 1000));

        const battleTimeoutDeferred = pDefer<void>();
        this.delayPhaseLength(GamePhase.PLAYING).then(() => battleTimeoutDeferred.resolve());

        const { round, phaseStartedAtSeconds: newPhaseStartedAt } = this.store.getState();
        const promises = this.getLivingPlayers().map(p => p.fightMatch(newPhaseStartedAt, battleTimeoutDeferred));

        await Promise.all(promises);

        if (this.getLivingPlayers().length === 0) {
            const justDiedPlayers = this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.getRoundDiedAt() === round);

            for (const player of justDiedPlayers) {
                player.resurrect(RESURRECT_HEALTH);
            }

            const justDiedPlayerIds = justDiedPlayers.map(p => p.id);
            for (const player of this.players) {
                player.onPlayersResurrected(justDiedPlayerIds);
            }
        }

        for (const player of this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.getRoundDiedAt() === round)) {
            player.kill();
        }

        // some battles go right up to the end, so it's nice to have a delay
        // rather than jumping straight into the next phase
        await delay(3000);
    }

    private updateOpponentProvider() {
        const livingPlayers = this.getLivingPlayers();
        const livingPlayerCount = livingPlayers.length;

        if (livingPlayerCount !== this.lastLivingPlayerCount) {
            this.opponentProvider.setPlayers(livingPlayers);
            this.lastLivingPlayerCount = livingPlayerCount;
        }
    }

    private getLivingPlayers = () => this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.isAlive());
    private delayPhaseLength = (phase: GamePhase) => delay(this.options.phaseLengths[phase] * 1000);
}

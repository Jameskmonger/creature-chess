import { Logger } from "winston";
import { v4 as uuid } from "uuid";
import { EventEmitter } from "events";
import delay from "delay";
import pDefer = require("p-defer");
import { combineReducers, createStore } from "redux";
import { GamePhase, PlayerListPlayer, PlayerStatus, GameOptions, getOptions } from "@creature-chess/models";

import { log } from "./log";

import { Player } from "./player";
import { HeadToHeadOpponentProvider, IOpponentProvider } from "./opponentProvider";
import { PlayerList } from "./playerList";
import { GameInfoCommands, gameInfoReducer, GameInfoState } from "./gameInfo";
import { readyNotifier } from "./readyNotifier";
import { Match } from "./match";
import { CardDeck } from "./cardDeck";
import { GameEvent, gameFinishEvent, gamePhaseStartedEvent, playerListChangedEvent } from "./events";
import { getAllDefinitions } from "./definitions";

const startStopwatch = () => process.hrtime();
const stopwatch = (start: [number, number]) => {
    const end = process.hrtime(start);
    return Math.round((end[0] * 1000) + (end[1] / 1000000));
};

const finishGameEventKey = "FINISH_GAME";

type GameState = {
    gameInfo: GameInfoState
};

const createGameStore = () => {
    const store = createStore(combineReducers<GameState>({
        gameInfo: gameInfoReducer,
    }));

    return store;
};

export class Game {
    public readonly id: string;

    private options: GameOptions;

    private lastLivingPlayerCount: number = 0;
    private opponentProvider: IOpponentProvider = new HeadToHeadOpponentProvider();
    private playerList = new PlayerList();
    private players: Player[] = [];
    private events = new EventEmitter();
    private deck: CardDeck;

    private store = createGameStore();

    // todo set a sensible default
    private logger: Logger;

    constructor(options?: Partial<GameOptions>) {
        this.id = uuid();

        this.options = getOptions(options);

        this.deck = new CardDeck(getAllDefinitions());

        this.playerList.onUpdate(this.onPlayerListUpdate);
    }

    public setLogger(logger: Logger) {
        this.logger = logger;

        this.deck.setLogger(this.logger);
    }

    public onFinish(fn: (winner: Player) => void) {
        this.events.on(finishGameEventKey, fn);
    }

    public getPlayerById(playerId: string) {
        return this.players.find(p => p.getStatus() !== PlayerStatus.QUIT && p.id === playerId);
    }

    public getPlayerList() {
        return this.playerList.getValue();
    }

    public start = async (players: Player[]) => {
        players.forEach(this.addPlayer);

        this.updateOpponentProvider();

        if (this.store.getState().gameInfo.phase !== null) {
            return;
        }

        const startTime = startStopwatch();

        while (true) {
            await this.runPreparingPhase();

            await this.runReadyPhase();

            await this.runPlayingPhase();

            if (this.getLivingPlayers().length < 2) {
                break;
            }
        }

        const winnerId = this.getPlayerList()[0].id;

        const duration = stopwatch(startTime);

        log(`Match complete in ${(duration)} ms (${this.store.getState().gameInfo.round} rounds)`);

        // teardown
        this.opponentProvider = null;
        this.deck = null;
        this.playerList.deconstructor();
        this.playerList = null;

        const winner = this.players.find(p => p.id === winnerId);

        const event = gameFinishEvent({ winnerName: winner.name });
        this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT).forEach(p => p.receiveGameEvent(event));

        const gamePlayers = this.players.map(p => ({
            id: p.id,
            name: p.name
        }));

        this.events.emit(finishGameEventKey, winner, gamePlayers);

        // more teardown
        this.events.removeAllListeners();
        this.events = null;
    }

    private addPlayer = (player: Player) => {
        player.setLogger(this.logger);

        this.players.push(player);
        this.playerList.addPlayer(player);

        player.setDeck(this.deck);
        player.setGetGameInfoState(() => this.store.getState().gameInfo);
        player.setGetPlayerListPlayers(this.playerList.getValue);
    }

    private dispatchPublicGameEvent(event: GameEvent) {
        this.store.dispatch(event);

        this.players.filter(p => p.getStatus() === PlayerStatus.CONNECTED)
            .forEach(p => p.receiveGameEvent(event));
    }

    private onPlayerListUpdate = (players: PlayerListPlayer[]) => {
        this.dispatchPublicGameEvent(playerListChangedEvent({ players }));
    }

    private async runPreparingPhase() {
        const livingPlayers = this.getLivingPlayers();
        livingPlayers.forEach(p => p.enterPreparingPhase());

        const notifier = readyNotifier(livingPlayers);

        const { gameInfo: { round } } = this.store.getState();

        const phase = GamePhase.PREPARING;
        const startedAt = Date.now() / 1000;
        const update = { phase, startedAt, round: round + 1 };
        this.dispatchPublicGameEvent(gamePhaseStartedEvent(update));
        this.store.dispatch(GameInfoCommands.setGameInfoCommand(update));

        await Promise.race([
            notifier.promise,
            this.delayPhaseLength(GamePhase.PREPARING)
        ]);

        notifier.dispose();

        this.getLivingPlayers().forEach(p => p.fillBoard());
    }

    private async runReadyPhase() {
        this.updateOpponentProvider();

        const matchups = this.opponentProvider.getMatchups();

        matchups.forEach(({ homeId, awayId, awayIsClone }) => {
            const homePlayer = this.players.find(p => p.id === homeId);
            const awayPlayer = this.players.find(p => p.id === awayId);

            const match = new Match(homePlayer, awayPlayer, this.options);

            homePlayer.enterReadyPhase(match);

            if (!awayIsClone) {
                awayPlayer.enterReadyPhase(match);
            }
        });

        const phase = GamePhase.READY;
        const startedAt = Date.now() / 1000;
        const update = { phase, startedAt };
        this.dispatchPublicGameEvent(gamePhaseStartedEvent(update));
        this.store.dispatch(GameInfoCommands.setGameInfoCommand(update));

        await this.delayPhaseLength(GamePhase.READY);
    }

    private async runPlayingPhase() {
        const battleTimeoutDeferred = pDefer<void>();
        this.delayPhaseLength(GamePhase.PLAYING).then(() => battleTimeoutDeferred.resolve());

        const { gameInfo: { round, phaseStartedAtSeconds: newPhaseStartedAt } } = this.store.getState();
        const promises = this.getLivingPlayers().map(p => p.fightMatch(newPhaseStartedAt, battleTimeoutDeferred));

        const phase = GamePhase.PLAYING;
        const startedAt = Date.now() / 1000;
        const update = { phase, startedAt };
        this.dispatchPublicGameEvent(gamePhaseStartedEvent(update));
        this.store.dispatch(GameInfoCommands.setGameInfoCommand(update));

        await Promise.all(promises);

        for (const player of this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.getRoundDiedAt() === round)) {
            player.kill();
        }

        // some battles go right up to the end, so it's nice to have a delay
        // rather than jumping straight into the next phase
        await delay(5000);
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

import { Logger } from "winston";
import { v4 as uuid } from "uuid";
import { EventEmitter } from "events";
import delay from "delay";
import pDefer = require("p-defer");
import { GamePhase, PlayerListPlayer, PlayerStatus, RESURRECT_HEALTH, GameOptions, getOptions } from "@creature-chess/models";

import { log } from "../log";

import { DefinitionProvider } from "./definitions/definitionProvider";
import { Player } from "./player";
import { HeadToHeadOpponentProvider, IOpponentProvider } from "./opponentProvider";
import { PlayerList } from "./playerList";
import { createGameStore, GameEvents } from "./store";
import { readyNotifier } from "./readyNotifier";
import { Match } from "./match";
import { CardDeck } from "./cardDeck";
import { GameEvent, gameFinishEvent, playerListChangedEvent, playersResurrectedEvent } from "./store/events";

const startStopwatch = () => process.hrtime();
const stopwatch = (start: [number, number]) => {
    const end = process.hrtime(start);
    return Math.round((end[0] * 1000) + (end[1] / 1000000));
};

const finishGameEventKey = "FINISH_GAME";

export class Game {
    public readonly id: string;

    private options: GameOptions;

    private lastLivingPlayerCount: number = 0;
    private opponentProvider: IOpponentProvider = new HeadToHeadOpponentProvider();
    private playerList = new PlayerList();
    private definitionProvider = new DefinitionProvider();
    private players: Player[] = [];
    private events = new EventEmitter();
    private deck: CardDeck;

    private store = createGameStore();

    // todo set a sensible default
    private logger: Logger;

    constructor(options?: Partial<GameOptions>) {
        this.id = uuid();

        this.options = getOptions(options);

        this.deck = new CardDeck(this.definitionProvider.getAll());

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

        if (this.store.getState().phase !== null) {
            return;
        }

        const startTime = startStopwatch();

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
        this.playerList.deconstructor();
        this.playerList = null;
        this.definitionProvider = null;

        const winner = this.getLivingPlayers()[0];

        const event = gameFinishEvent(winner.name);
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
        player.setGetGameState(this.store.getState);
        player.setGetPlayerListPlayers(this.playerList.getValue);
        player.setDefinitionProvider(this.definitionProvider);
    }

    private dispatchPublicGameEvent(event: GameEvent) {
        this.store.dispatch(event);

        this.players.filter(p => p.getStatus() === PlayerStatus.CONNECTED)
            .forEach(p => p.receiveGameEvent(event));
    }

    private onPlayerListUpdate = (playerList: PlayerListPlayer[]) => {
        this.dispatchPublicGameEvent(playerListChangedEvent(playerList));
    }

    private async runPreparingPhase() {
        const livingPlayers = this.getLivingPlayers();
        livingPlayers.forEach(p => p.enterPreparingPhase());

        const notifier = readyNotifier(livingPlayers);

        const { round } = this.store.getState();
        this.dispatchPublicGameEvent(GameEvents.gamePhaseStartedEvent(GamePhase.PREPARING, Date.now() / 1000, round + 1));

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

        this.dispatchPublicGameEvent(GameEvents.gamePhaseStartedEvent(GamePhase.READY, Date.now() / 1000));

        await this.delayPhaseLength(GamePhase.READY);
    }

    private async runPlayingPhase() {
        const battleTimeoutDeferred = pDefer<void>();
        this.delayPhaseLength(GamePhase.PLAYING).then(() => battleTimeoutDeferred.resolve());

        const { round, phaseStartedAtSeconds: newPhaseStartedAt } = this.store.getState();
        const promises = this.getLivingPlayers().map(p => p.fightMatch(newPhaseStartedAt, battleTimeoutDeferred));

        this.dispatchPublicGameEvent(GameEvents.gamePhaseStartedEvent(GamePhase.PLAYING, Date.now() / 1000));

        await Promise.all(promises);

        if (this.getLivingPlayers().length === 0) {
            const justDiedPlayers = this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.getRoundDiedAt() === round);

            for (const player of justDiedPlayers) {
                player.resurrect(RESURRECT_HEALTH);
            }

            const justDiedPlayerIds = justDiedPlayers.map(p => p.id);
            const event = playersResurrectedEvent(justDiedPlayerIds);

            for (const player of this.players) {
                player.receiveGameEvent(event);
            }
        }

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

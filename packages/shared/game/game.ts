import uuid = require("uuid");
import delay from "delay";
import { GamePhase } from "@creature-chess/models/src/game-phase";
import { Player, PlayerMatchResults } from "./player/player";
import { OpponentProvider } from "./opponentProvider";
import { CardDeck } from "../cardShop/cardDeck";
import { log } from "../log";
import { PHASE_LENGTHS, DEFAULT_TURN_COUNT, DEFAULT_TURN_DURATION, RESURRECT_HEALTH } from "@creature-chess/models/src/constants";
import { EventEmitter } from "events";
import { PlayerList } from "./playerList";
import { TurnSimulator } from "../match/combat/turnSimulator";
import { DefinitionProvider } from "./definitionProvider";
import { PlayerStatus } from "@creature-chess/models";
import pDefer = require("p-defer");
import { createGameStore } from "./store/store";
import { gamePhaseStarted, preparingPhaseStarted } from "./store/actions";

const startStopwatch = () => process.hrtime();
const stopwatch = (start: [number, number]) => {
    const end = process.hrtime(start);
    return Math.round((end[0] * 1000) + (end[1] / 1000000));
};

enum GameEvents {
    FINISH_GAME = "FINISH_GAME",
    PLAYER_DEATH = "PLAYER_DEATH",
    PLAYER_QUIT = "PLAYER_QUIT"
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
    private lastLivingPlayerCount: number;
    private opponentProvider = new OpponentProvider();
    private playerList = new PlayerList();
    private turnSimulator: TurnSimulator;
    private definitionProvider = new DefinitionProvider();
    private players: Player[] = [];
    private events = new EventEmitter();
    private deck: CardDeck;

    private store = createGameStore();

    constructor(players: Player[], phaseLengths?: PhaseLengths, turnCount?: number, turnDuration?: number) {
        this.id = uuid();

        this.phaseLengths = { ...defaultPhaseLengths, ...phaseLengths };
        this.turnCount = turnCount >= 0 ? turnCount : DEFAULT_TURN_COUNT;
        this.turnDuration = turnDuration >= 0 ? turnDuration : DEFAULT_TURN_DURATION;

        const livingPlayers = this.players.filter(p => p.isAlive());
        this.opponentProvider.setPlayers(livingPlayers);
        this.lastLivingPlayerCount = livingPlayers.length;

        this.deck = new CardDeck(this.definitionProvider.getAll());
        this.turnSimulator = new TurnSimulator();

        this.playerList.onUpdate(playerList =>
            this.players
                .filter(p => p.getStatus() === PlayerStatus.CONNECTED)
                .forEach(p => p.onPlayerListUpdate(playerList))
        );

        players.forEach(p => {
            this.addPlayer(p);
        })

        // execute at the end of the execution queue
        setTimeout(() => {
            this.startGame();
        });
    }

    // todo use this everywhere
    public getCurrentGamePhaseUpdateForPlayer(player: Player) {
        const { round, phase, phaseStartedAtSeconds } = this.store.getState();

        switch (phase) {
            case GamePhase.DEAD:
                return {
                    startedAtSeconds: phaseStartedAtSeconds,
                    phase: phase
                };
            case GamePhase.PREPARING:
                return {
                    startedAtSeconds: phaseStartedAtSeconds,
                    phase: phase,
                    payload: {
                        round: round,
                        pieces: {
                            board: player.getBoard(),
                            bench: player.getBench()
                        },
                        cards: player.getCards()
                    }
                };
            case GamePhase.READY:
                // todo figure out why match can be null at this point
                const match = player.getMatch();
                const board = match ? match.getBoard() : null;

                return {
                    startedAtSeconds: phaseStartedAtSeconds,
                    phase: phase,
                    payload: {
                        board,
                        bench: player.getBench(),
                        opponentId: player.getMatch().away.id
                    }
                };
            case GamePhase.PLAYING:
            default:
                return null;
        }
    }

    public onFinish(
        fn: (winner: Player, players: {
            id: string, name: string, isBot: boolean
        }[]) => void
    ) {
        this.events.on(GameEvents.FINISH_GAME, fn);
    }

    public onPlayerDeath(fn: (player: Player) => void) {
        this.events.on(GameEvents.PLAYER_DEATH, fn);
    }

    public onPlayerQuit(fn: (player: Player) => void) {
        this.events.on(GameEvents.PLAYER_QUIT, fn);
    }

    public getPlayerById(playerId: string) {
        return this.players.find(p => p.id === playerId);
    }

    public getPlayerList() {
        return this.playerList.getValue();
    }

    public addPlayer(player: Player) {
        this.players.push(player);
        this.playerList.addPlayer(player);
        player.setDeck(this.deck);
        player.setDefinitionProvider(this.definitionProvider);
        player.setTurnCount(this.turnCount);
        player.setTurnDuration(this.turnDuration);

        if (!player.isBot) {
            player.onQuitGame(this.playerQuitGame);
        }
    }

    private playerQuitGame = (player: Player) => {
        this.events.emit(GameEvents.PLAYER_QUIT, player);
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

            const livingPlayers = this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.isAlive());

            if (livingPlayers.length === 1) {
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

        const winner = this.players.find(p => p.isAlive());

        this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT).forEach(p => p.onFinishGame(winner));

        const gamePlayers = this.players.map(p => ({
            id: p.id,
            name: p.name,
            isBot: p.isBot
        }));

        this.events.emit(GameEvents.FINISH_GAME, winner, gamePlayers);

        // more teardown
        this.events.removeAllListeners();
        this.events = null;
    }

    private async runPreparingPhase() {
        const { round } = this.store.getState();

        this.store.dispatch(preparingPhaseStarted(round + 1, Date.now() / 1000));

        this.players.forEach(p => p.reset());

        const { phaseStartedAtSeconds: newPhaseStartedAt, round: newRound } = this.store.getState();

        const promises = this.players
            .filter(p => p.getStatus() !== PlayerStatus.QUIT)
            .map(p => p.enterPreparingPhase(newPhaseStartedAt, newRound));

        await Promise.race([
            Promise.all(promises),
            delay(this.phaseLengths[GamePhase.PREPARING] * 1000)
        ]);
    }

    private updateLivingPlayers() {
        const livingPlayers = this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.isAlive());
        const livingPlayerCount = livingPlayers.length;

        if (livingPlayerCount !== this.lastLivingPlayerCount) {
            this.opponentProvider.setPlayers(livingPlayers);
            this.lastLivingPlayerCount = livingPlayerCount;
        }
    }

    private async runReadyPhase() {
        this.store.dispatch(gamePhaseStarted(GamePhase.READY, Date.now() / 1000));

        this.updateLivingPlayers();

        const { phaseStartedAtSeconds: newPhaseStartedAt } = this.store.getState();

        this.players
            .filter(p => p.getStatus() !== PlayerStatus.QUIT)
            .forEach(p => p.enterReadyPhase(this.turnSimulator, this.opponentProvider, newPhaseStartedAt));

        await delay(this.phaseLengths[GamePhase.READY] * 1000);
    }

    private async runPlayingPhase() {
        this.store.dispatch(gamePhaseStarted(GamePhase.PLAYING, Date.now() / 1000));

        this.opponentProvider.updateRotation();

        await this.fightBattles();
    }

    private async fightBattles() {
        const maxTimeMs = this.phaseLengths[GamePhase.PLAYING] * 1000;

        const battleTimeoutDeferred = pDefer<void>();

        delay(maxTimeMs).then(() => battleTimeoutDeferred.resolve());

        const livingPlayers = this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.isAlive());

        const { round, phaseStartedAtSeconds: newPhaseStartedAt } = this.store.getState();
        const promises = livingPlayers.map(p => p.fightMatch(newPhaseStartedAt, battleTimeoutDeferred));

        await Promise.all(promises);

        const newLivingPlayers = this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.isAlive());

        if (newLivingPlayers.length === 0) {
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

            this.events.emit(GameEvents.PLAYER_DEATH, player);
        }

        // some battles go right up to the end, so it's nice to have a delay
        // rather than jumping straight into the next phase
        await delay(3000);

        for (const player of this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.isAlive())) {
            player.giveMatchRewards();
        }
    }
}

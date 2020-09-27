import uuid = require("uuid");
import delay from "delay";
import { GamePhase } from "@creature-chess/models/game-phase";
import { Player, PlayerMatchResults } from "./player/player";
import { OpponentProvider } from "./opponentProvider";
import { CardDeck } from "../cardShop/cardDeck";
import { log } from "../log";
import { PHASE_LENGTHS, DEFAULT_TURN_COUNT, DEFAULT_TURN_DURATION, RESURRECT_HEALTH } from "@creature-chess/models/constants";
import { EventEmitter } from "events";
import { PlayerList } from "./playerList";
import { TurnSimulator } from "../match/combat/turnSimulator";
import { DefinitionProvider } from "./definitionProvider";
import { EventManager } from "./events/eventManager";
import { matchRewards } from "./plugins/matchRewards";
import { resetPlayer } from "./plugins/resetPlayer";
import { PhaseUpdatePacket } from "../networking/server-to-client";
import { PlayerStatus } from "@creature-chess/models";

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
    public phase: {
        value: GamePhase;
        startedAt: number;
    };
    private phaseLengths: PhaseLengths;
    private turnCount: number;
    private turnDuration: number;
    private GAME_SIZE: number;
    private round = 0;
    private lastLivingPlayerCount: number;
    private opponentProvider = new OpponentProvider();
    private playerList = new PlayerList();
    private turnSimulator: TurnSimulator;
    private definitionProvider = new DefinitionProvider();
    private players: Player[] = [];
    private events = new EventEmitter();
    private deck: CardDeck;
    private eventManager = new EventManager();

    constructor(players: Player[], phaseLengths?: PhaseLengths, turnCount?: number, turnDuration?: number) {
        this.id = uuid();

        this.GAME_SIZE = players.length;
        this.phaseLengths = { ...defaultPhaseLengths, ...phaseLengths };
        this.turnCount = turnCount >= 0 ? turnCount : DEFAULT_TURN_COUNT;
        this.turnDuration = turnDuration >= 0 ? turnDuration : DEFAULT_TURN_DURATION;

        this.phase = {
            value: GamePhase.WAITING,
            startedAt: null
        };

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

        this.registerPlugins();

        players.forEach(p => {
            this.addPlayer(p);
        })

        // execute at the end of the execution queue
        setTimeout(() => {
            this.startGame();
        });
    }

    // todo use this everywhere
    public getCurrentGamePhaseUpdateForPlayer(player: Player): PhaseUpdatePacket {
        switch (this.phase.value) {
            case GamePhase.DEAD:
                return {
                    startedAt: this.phase.startedAt,
                    phase: this.phase.value
                };
            case GamePhase.PREPARING:
                return {
                    startedAt: this.phase.startedAt,
                    phase: this.phase.value,
                    payload: {
                        round: this.round,
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
                    startedAt: this.phase.startedAt,
                    phase: this.phase.value,
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
        fn: (rounds: number, winner: Player, startTimeMs: number, players: {
            id: string, name: string, isBot: boolean
        }[], durationMs: number
        ) => void) {
        this.events.on(GameEvents.FINISH_GAME, fn);
    }

    public onPlayerDeath(fn: (player: Player) => void) {
        this.events.on(GameEvents.PLAYER_DEATH, fn);
    }

    public onPlayerQuit(fn: (player: Player) => void) {
        this.events.on(GameEvents.PLAYER_QUIT, fn);
    }

    public getPlayers() {
        return this.players;
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

    public getPlayerById(playerId: string) {
        return this.players.find(p => p.id === playerId);
    }

    private playerQuitGame = (player: Player) => {
        this.events.emit(GameEvents.PLAYER_QUIT, player);
    }

    private startGame = async () => {
        if (this.phase.value !== GamePhase.WAITING) {
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

        log(`Match complete in ${(duration)} ms (${this.round} rounds)`);

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

        this.events.emit(GameEvents.FINISH_GAME, this.round, winner, startTimeMs, gamePlayers, duration);

        // more teardown
        this.events.removeAllListeners();
        this.events = null;
        this.eventManager.deconstructor();
        this.eventManager = null;
    }

    private setPhase(value: GamePhase) {
        this.phase = {
            value,
            startedAt: Date.now()
        };
    }

    private async runPreparingPhase() {
        this.round++;

        this.setPhase(GamePhase.PREPARING);

        this.eventManager.getTriggers().enterPreparingPhase(this.players);

        const promises = this.players
            .filter(p => p.getStatus() !== PlayerStatus.QUIT)
            .map(p => p.enterPreparingPhase(this.phase.startedAt, this.round));

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
        this.setPhase(GamePhase.READY);

        this.updateLivingPlayers();

        this.players
            .filter(p => p.getStatus() !== PlayerStatus.QUIT)
            .forEach(p => p.enterReadyPhase(this.turnSimulator, this.opponentProvider, this.phase.startedAt));

        await delay(this.phaseLengths[GamePhase.READY] * 1000);
    }

    private async runPlayingPhase() {
        this.setPhase(GamePhase.PLAYING);

        this.opponentProvider.updateRotation();

        await this.fightBattles();
    }

    private async fightBattles() {
        const maxTimeMs = this.phaseLengths[GamePhase.PLAYING] * 1000;
        const battleTimeout = delay(maxTimeMs);

        const livingPlayers = this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.isAlive());

        const onPlayerFinishBattle = (results: PlayerMatchResults) => {
            const damage = results.awayScore * 3;

            results.homePlayer.subtractHealth(damage);
        };
        const promises = livingPlayers.map(p => p.fightMatch(this.phase.startedAt, battleTimeout).then(onPlayerFinishBattle));

        await Promise.all(promises);

        const newLivingPlayers = this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.isAlive());

        if (newLivingPlayers.length === 0) {
            const justDiedPlayers = this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.getRoundDiedAt() === this.round);

            for (const player of justDiedPlayers) {
                player.resurrect(RESURRECT_HEALTH);
            }

            const justDiedPlayerIds = justDiedPlayers.map(p => p.id);
            for (const player of this.players) {
                player.onPlayersResurrected(justDiedPlayerIds);
            }
        }

        for (const player of this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.getRoundDiedAt() === this.round)) {
            player.kill();

            this.events.emit(GameEvents.PLAYER_DEATH, player);
        }

        // some battles go right up to the end, so it's nice to have a delay
        // rather than jumping straight into the next phase
        await delay(3000);

        this.eventManager.getTriggers().finishRound(this.players);
    }

    private registerPlugins() {
        matchRewards(this.eventManager);
        resetPlayer(this.eventManager);
    }
}

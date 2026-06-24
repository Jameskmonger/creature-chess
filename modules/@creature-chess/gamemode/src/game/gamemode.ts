import { DefinesApi, Logger } from "@cc-engine/kernel";

import { Rng, createRng } from "@shoki/random";

import { SubscribableBoard } from "@creature-chess/board";
import { GamePhase, RoundInfoState } from "@creature-chess/models";
import { PlayerProfile, PlayerStatus } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models";
import { PieceRegistry, ReadablePieceRegistry } from "@creature-chess/utils";

import { Player, createPlayer } from "../entities/player/player";
import {
	GameplayEventsBus,
	CreatureRegistry,
	GamemodeInit,
} from "../factory";
import { PlayerActionRegistry } from "../playerActions/registry";
import { WireProtocol } from "../wireProtocol";
import { CardDeck } from "./cardDeck";
import {
	GameFinishEvent,
	PieceUpgradedEvent,
	PlayerEliminatedEvent,
	PlayerLevelUpEvent,
	PlayerStreakEvent,
} from "./events";
import { runGame, GameContext } from "./gameContext";
import {
	GamemodeEventsApi,
	GamemodeEventsEmitter,
	createGamemodeEvents,
} from "./gamemodeEvents";
import { Match } from "./match";
import { OpponentProvider } from "./opponentProvider";
import { PlayerList } from "./playerList";
import { playerRound } from "./playerRound";

export type GamemodeCallbacks = {
	onTurnComplete?: (timeMs: number) => void;
	onMatchStart?: () => void;
	onMatchEnd?: () => void;
};

export type GamemodeApi = {
	readonly id: string;
	readonly defines: DefinesApi;
	readonly creatures: CreatureRegistry;
	readonly pluginEvents: GameplayEventsBus;
	readonly playerActions: PlayerActionRegistry;
	readonly wire: WireProtocol;
	readonly pieceRegistry: ReadablePieceRegistry;
	readonly events: GamemodeEventsApi;
	roundInfo: RoundInfoState;
	getDeck(): CardDeck;
	getPlayerById(playerId: string): Player | null;
	getRoundInfo(): RoundInfoState;
	getConnectedPlayers(): Player[];
	getPlayerListPlayers(): ReturnType<PlayerList["getValue"]>;
	setRoundInfo(payload: {
		phase: GamePhase;
		startedAt: number;
		round?: number;
	}): void;
	emitPieceUpgraded(payload: PieceUpgradedEvent["payload"]): void;
	emitPlayerLevelUp(payload: PlayerLevelUpEvent["payload"]): void;
	emitPlayerStreak(payload: PlayerStreakEvent["payload"]): void;
	emitPlayerEliminated(payload: PlayerEliminatedEvent["payload"]): void;
	onFinish(fn: (event: GameFinishEvent["payload"]) => void): void;
};

export class Gamemode implements GamemodeApi {
	public roundInfo: RoundInfoState = {
		round: 1,
		phase: GamePhase.PREPARING,
		phaseStartedAtSeconds: 0,
	};

	public readonly id: string;
	public readonly defines: DefinesApi;
	public readonly creatures: CreatureRegistry;
	public readonly pluginEvents: GameplayEventsBus;
	public readonly playerActions: PlayerActionRegistry;
	public readonly wire: WireProtocol;

	private readonly logger: Logger;
	private readonly settings: GamemodeSettings;
	private readonly callbacks: GamemodeCallbacks;

	private readonly pieceRegistryImpl: PieceRegistry = new PieceRegistry();
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly pieceRegistry: ReadablePieceRegistry = this.pieceRegistryImpl;

	private playerList = new PlayerList();
	private players: Player[] = [];
	private opponentProvider: OpponentProvider;
	private deck: CardDeck;
	private rng: Rng;

	private eventsEmitter: GamemodeEventsEmitter = createGamemodeEvents();
	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly events: GamemodeEventsApi = this.eventsEmitter;

	public constructor(init: GamemodeInit) {
		this.id = init.id;
		this.logger = init.logger;
		this.settings = init.settings;
		this.callbacks = init.callbacks ?? {};

		const { context } = init;
		this.defines = context.defines;
		this.creatures = context.creatures;
		this.pluginEvents = context.events;
		this.playerActions = context.playerActions;
		this.wire = context.wire;

		this.rng = init.seed !== undefined ? createRng(init.seed) : Math.random;
		this.opponentProvider = new OpponentProvider(this.rng);
		this.deck = new CardDeck(this.logger, this.creatures, this.rng);
	}

	public getDeck = () => this.deck;

	public createPlayer(
		id: string,
		args: {
			boards: { board: SubscribableBoard; bench: SubscribableBoard };
			name: string;
			profile: PlayerProfile;
			finishPosition: number;
			finishRound: number;
			match: Match | null;
		}
	): Player {
		return createPlayer(
			id,
			{
				logger: this.logger,
				boards: args.boards,
				gamemode: this,
				pieceRegistry: this.pieceRegistryImpl,
				settings: this.settings,
			},
			{
				name: args.name,
				profile: args.profile,
				finishPosition: args.finishPosition,
				finishRound: args.finishRound,
				match: args.match,
			}
		);
	}

	public setRoundInfo(payload: {
		phase: GamePhase;
		startedAt: number;
		round?: number;
	}) {
		this.roundInfo = {
			...this.roundInfo,
			phase: payload.phase,
			phaseStartedAtSeconds: Math.floor(payload.startedAt),
			...(payload.round ? { round: payload.round } : {}),
		};

		this.eventsEmitter.emitPhaseStart(payload);
	}

	public emitPieceUpgraded(payload: PieceUpgradedEvent["payload"]) {
		this.eventsEmitter.emitPieceUpgraded(payload);
	}

	public emitPlayerLevelUp(payload: PlayerLevelUpEvent["payload"]) {
		this.eventsEmitter.emitPlayerLevelUp(payload);
	}

	public emitPlayerStreak(payload: PlayerStreakEvent["payload"]) {
		this.eventsEmitter.emitPlayerStreak(payload);
	}

	public emitPlayerEliminated(payload: PlayerEliminatedEvent["payload"]) {
		this.eventsEmitter.emitPlayerEliminated(payload);
	}

	public finishGame(payload: GameFinishEvent["payload"]) {
		this.eventsEmitter.emitFinish(payload);

		// teardown
		(this.opponentProvider as unknown as null) = null;
		(this.deck as unknown as null) = null;
		this.playerList.dispose();
		(this.playerList as unknown as null) = null;
		this.eventsEmitter.dispose();
	}

	public start = (players: Player[]) => {
		players.forEach((player) => {
			this.players.push(player);
			this.playerList.addPlayer(player);
		});

		this.opponentProvider.setPlayers(players);

		this.playerList.onUpdate((newPlayers) => {
			this.eventsEmitter.emitPlayerListChange({ players: newPlayers });
		});

		const context: GameContext = {
			gamemode: this,
			getMatchups: this.opponentProvider.getMatchups,
			players: {
				getAll: this.getAllPlayers,
				getLiving: this.getLivingPlayers,
				getById: this.getPlayerById,
			},
			logger: this.logger,
			settings: this.settings,
			playerRound,
		};

		// Run the game (async, not blocking)
		runGame(context, this.callbacks);
	};

	public getPlayerById = (playerId: string) =>
		this.players.find(
			(p) => p.status !== PlayerStatus.QUIT && p.id === playerId
		) || null;

	public onFinish(fn: (event: GameFinishEvent["payload"]) => void) {
		this.events.onFinish((action) => fn(action.payload));
	}

	public getConnectedPlayers = () =>
		this.players.filter((p) => p.status !== PlayerStatus.QUIT);

	public getRoundInfo = () => this.roundInfo;
	public getPlayerListPlayers = () => this.playerList.getValue();

	private getAllPlayers = () => this.players;

	private getLivingPlayers = () =>
		this.players.filter((p) => p.status !== PlayerStatus.QUIT && p.alive);
}

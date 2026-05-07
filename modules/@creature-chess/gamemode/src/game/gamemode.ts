import { Logger } from "winston";

import { Rng, createRng } from "@shoki/random";

import { GamePhase, RoundInfoState } from "@creature-chess/models";
import { PlayerStatus } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { Player } from "../entities/player/player";
import { CardDeck } from "./cardDeck";
import { GameFinishEvent } from "./events";
import {
	GamemodeEventsApi,
	GamemodeEventsEmitter,
	createGamemodeEvents,
} from "./gamemodeEvents";
import { runGame, GameContext } from "./gameContext";
import { OpponentProvider } from "./opponentProvider";
import { phaseRules } from "./phaseRules";
import { PlayerList } from "./playerList";

type GamemodeCallbacks = {
	onTurnComplete?: (timeMs: number) => void;
	onMatchStart?: () => void;
	onMatchEnd?: () => void;
};

export class Gamemode {
	public readonly pieceRegistry: PieceRegistry = new PieceRegistry();

	public roundInfo: RoundInfoState = {
		round: 1,
		phase: GamePhase.PREPARING,
		phaseStartedAtSeconds: 0,
	};

	private opponentProvider: OpponentProvider;
	private playerList = new PlayerList();
	private players: Player[] = [];
	private deck: CardDeck;
	private rng: Rng;
	private eventsEmitter: GamemodeEventsEmitter = createGamemodeEvents();

	// eslint-disable-next-line @typescript-eslint/member-ordering
	public readonly events: GamemodeEventsApi = this.eventsEmitter;

	public constructor(
		public readonly id: string,
		private logger: Logger,
		private settings: GamemodeSettings,
		private callbacks: GamemodeCallbacks = {},
		// Optional seed for the shared ISAAC-backed rng. Same seed + same
		// inputs = same game — the hook that makes training-on-scenarios
		// and snapshot replay reproducible. When absent, falls back to
		// `Math.random` so existing call sites are unaffected.
		seed?: number | number[]
	) {
		this.rng = seed !== undefined ? createRng(seed) : Math.random;
		this.opponentProvider = new OpponentProvider(this.rng);
		this.deck = new CardDeck(this.logger, this.rng);
	}

	public getDeck = () => this.deck;

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

	public finishGame(payload: GameFinishEvent["payload"]) {
		this.eventsEmitter.emitFinish(payload);

		// teardown
		(this.opponentProvider as unknown as null) = null;
		(this.deck as unknown as null) = null;
		this.playerList.deconstructor();
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
			phaseRules,
		};

		// Run the game (async, not blocking)
		runGame(context, this.callbacks);
	};

	public getPlayerById = (playerId: string) =>
		this.players.find(
			(p) => p.status !== PlayerStatus.QUIT && p.id === playerId
		) || null;

	public onFinish(fn: (event: GameFinishEvent["payload"]) => void) {
		this.events.onAnyEvent("finish", (action) => fn(action.payload));
	}

	public getConnectedPlayers = () =>
		this.players.filter((p) => p.status !== PlayerStatus.QUIT);

	public getRoundInfo = () => this.roundInfo;
	public getPlayerListPlayers = () => this.playerList.getValue();

	private getAllPlayers = () => this.players;

	private getLivingPlayers = () =>
		this.players.filter((p) => p.status !== PlayerStatus.QUIT && p.alive);
}

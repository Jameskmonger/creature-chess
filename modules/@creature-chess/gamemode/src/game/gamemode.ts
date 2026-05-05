import { EventEmitter } from "events";
import { Logger } from "winston";

import { Rng, createRng } from "@shoki/random";

import { GamePhase, RoundInfoState } from "@creature-chess/models";
import { PlayerStatus } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { Player } from "../entities/player/player";
import {
	getPlayerStatus,
	isPlayerAlive,
} from "../entities/player/state/selectors";
import { CardDeck } from "./cardDeck";
import {
	gameFinishEvent,
	gamePhaseStartedEvent,
	playerListChangedEvent,
	GameFinishEvent,
} from "./events";
import { runGame, GameContext } from "./gameContext";
import { OpponentProvider } from "./opponentProvider";
import { phaseRules } from "./phaseRules";
import { setupPlayerGameDeckListeners } from "./player/playerGameDeck";
import { PlayerList } from "./playerList";

const finishGameEventKey = "FINISH_GAME";

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
	private events = new EventEmitter();
	private deck: CardDeck;
	private rng: Rng;

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

	public setRoundInfo(payload: {
		phase: GamePhase;
		startedAt: number;
		round?: number;
	}) {
		if (payload.round) {
			this.roundInfo = {
				...this.roundInfo,
				phase: payload.phase,
				phaseStartedAtSeconds: Math.floor(payload.startedAt),
				round: payload.round,
			};
		} else {
			this.roundInfo = {
				...this.roundInfo,
				phase: payload.phase,
				phaseStartedAtSeconds: Math.floor(payload.startedAt),
			};
		}

		this.getConnectedPlayers().forEach((player) => {
			player.put(gamePhaseStartedEvent(payload));
		});
	}

	public finishGame(payload: GameFinishEvent["payload"]) {
		this.getConnectedPlayers().forEach((player) => {
			player.put(gameFinishEvent(payload));
		});

		this.events.emit(finishGameEventKey, payload);

		// teardown
		(this.opponentProvider as unknown as null) = null;
		(this.deck as unknown as null) = null;
		this.playerList.deconstructor();
		(this.playerList as unknown as null) = null;
		this.events.removeAllListeners();
		(this.events as unknown as null) = null;
	}

	public start = (players: Player[]) => {
		players.forEach((player) => {
			this.players.push(player);
			this.playerList.addPlayer(player);

			setupPlayerGameDeckListeners(
				player.addListener,
				this.deck,
				this.settings.rerollMultiplier
			);
		});

		this.opponentProvider.setPlayers(players);

		// todo this is ugly
		this.playerList.onUpdate((newPlayers) => {
			this.getConnectedPlayers().forEach((player) => {
				player.put(playerListChangedEvent({ players: newPlayers }));
			});
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
			(p) =>
				p.select(getPlayerStatus) !== PlayerStatus.QUIT && p.id === playerId
		) || null;

	public onFinish(fn: (event: GameFinishEvent["payload"]) => void) {
		this.events.on(finishGameEventKey, fn);
	}

	public getConnectedPlayers = () =>
		this.players.filter((p) => p.select(getPlayerStatus) !== PlayerStatus.QUIT);

	public getRoundInfo = () => this.roundInfo;
	public getPlayerListPlayers = () => this.playerList.getValue();

	private getAllPlayers = () => this.players;

	private getLivingPlayers = () =>
		this.players.filter(
			(p) =>
				p.select(getPlayerStatus) !== PlayerStatus.QUIT &&
				p.select(isPlayerAlive)
		);
}

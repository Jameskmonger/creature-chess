import { EventEmitter } from "events";
import { Logger } from "winston";

import { GamePhase, RoundInfoState } from "@creature-chess/models";
import { PlayerStatus } from "@creature-chess/models/game/playerList";
import { GamemodeSettings } from "@creature-chess/models/settings";

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
import { OpponentProvider } from "./opponentProvider";
import { setupPlayerGameDeckListeners } from "./player/playerGameDeck";
import { PlayerList } from "./playerList";
import { runGame, GameContext } from "./gameContext";
import { PieceRegistry } from "@creature-chess/utils/piece";

const finishGameEventKey = "FINISH_GAME";

type GamemodeCallbacks = {
	onTurnComplete?: (timeMs: number) => void;
	onMatchStart?: () => void;
	onMatchEnd?: () => void;
};

export class Gamemode {
	private opponentProvider: OpponentProvider = new OpponentProvider();
	public readonly pieceRegistry: PieceRegistry = new PieceRegistry();
	private playerList = new PlayerList();
	private players: Player[] = [];
	private events = new EventEmitter();
	private deck: CardDeck;

	public roundInfo: RoundInfoState = {
		round: 1,
		phase: GamePhase.PREPARING,
		phaseStartedAtSeconds: 0,
	};

	public constructor(
		public readonly id: string,
		private logger: Logger,
		private settings: GamemodeSettings,
		private callbacks: GamemodeCallbacks = {}
	) {
		this.deck = new CardDeck(this.logger);
	}

	public setRoundInfo(payload: { phase: GamePhase; startedAt: number; round?: number }) {
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

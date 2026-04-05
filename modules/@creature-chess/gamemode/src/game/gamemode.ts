import { Store } from "@reduxjs/toolkit";
import { EventEmitter } from "events";
import { Logger } from "winston";

import { PlayerStatus } from "@creature-chess/models/game/playerList";
import { GamemodeSettings } from "@creature-chess/models/settings";

import { PlayerEntity } from "../entities";
import {
	getPlayerStatus,
	isPlayerAlive,
} from "../entities/player/state/selectors";
import { CardDeck } from "./cardDeck";
import {
	gameFinishEvent,
	playerListChangedEvent,
	GameFinishEvent,
} from "./events";
import { OpponentProvider } from "./opponentProvider";
import { setupPlayerGameDeckListeners } from "./player/playerGameDeck";
import { PlayerList } from "./playerList";
import { setupPublicEventsListener } from "./publicEvents";
import { runGame, GameContext } from "./gameContext";
import { createGameStore, GameStartListening, GameState } from "./store";
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
	private players: PlayerEntity[] = [];
	private events = new EventEmitter();
	private deck: CardDeck;

	private store: Store<GameState>;
	private startListening: GameStartListening;

	public constructor(
		public readonly id: string,
		private logger: Logger,
		private settings: GamemodeSettings,
		private callbacks: GamemodeCallbacks = {}
	) {
		this.deck = new CardDeck(this.logger);

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

		const { store, startListening } = createGameStore(context);
		this.store = store;
		this.startListening = startListening;
	}

	public start = (players: PlayerEntity[]) => {
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

		// Set up game teardown listener
		this.startListening({
			actionCreator: gameFinishEvent,
			effect: async (event) => {
				this.getConnectedPlayers().forEach((player) => {
					player.put(event);
				});

				this.events.emit(finishGameEventKey, event.payload);

				// teardown
				(this.opponentProvider as unknown as null) = null;
				(this.deck as unknown as null) = null;
				this.playerList.deconstructor();
				(this.playerList as unknown as null) = null;
				this.events.removeAllListeners();
				(this.events as unknown as null) = null;
			},
		});

		// Set up public events listener
		setupPublicEventsListener(this.startListening);

		// Run the game (async, not blocking)
		runGame(this.store, {
			gamemode: this,
			getMatchups: this.opponentProvider.getMatchups,
			players: {
				getAll: this.getAllPlayers,
				getLiving: this.getLivingPlayers,
				getById: this.getPlayerById,
			},
			logger: this.logger,
			settings: this.settings,
		}, this.callbacks);
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

	public getRoundInfo = () => this.store.getState().roundInfo;
	public getPlayerListPlayers = () => this.playerList.getValue();

	private getAllPlayers = () => this.players;

	private getLivingPlayers = () =>
		this.players.filter(
			(p) =>
				p.select(getPlayerStatus) !== PlayerStatus.QUIT &&
				p.select(isPlayerAlive)
		);
}

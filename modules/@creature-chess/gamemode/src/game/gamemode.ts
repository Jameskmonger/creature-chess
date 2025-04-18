import { take } from "@redux-saga/core/effects";
import { Store } from "@reduxjs/toolkit";
import { EventEmitter } from "events";
import { SagaMiddleware } from "redux-saga";
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
import { playerGameDeckSagaFactory } from "./player/playerGameDeckSaga";
import { PlayerList } from "./playerList";
import { sendPublicEventsSaga } from "./publicEvents";
import { gameSaga, GameSagaContext } from "./sagas";
import { createGameStore, GameState } from "./store";

const finishGameEventKey = "FINISH_GAME";

type GamemodeCallbacks = {
	onTurnComplete?: (timeMs: number) => void;
	onMatchStart?: () => void;
	onMatchEnd?: () => void;
};

export class Gamemode {
	private opponentProvider: OpponentProvider = new OpponentProvider();
	private playerList = new PlayerList();
	private players: PlayerEntity[] = [];
	private events = new EventEmitter();
	private deck: CardDeck;

	private store: Store<GameState>;
	private sagaMiddleware: SagaMiddleware<GameSagaContext>;

	public constructor(
		public readonly id: string,
		private logger: Logger,
		private settings: GamemodeSettings,
		private callbacks: GamemodeCallbacks = {}
	) {
		this.deck = new CardDeck(this.logger);

		const { store, sagaMiddleware } = createGameStore({
			getMatchups: this.opponentProvider.getMatchups,
			players: {
				getAll: this.getAllPlayers,
				getLiving: this.getLivingPlayers,
				getById: this.getPlayerById,
			},
			logger: this.logger,
			settings: this.settings,
		});
		this.store = store;
		this.sagaMiddleware = sagaMiddleware;
	}

	public start = (players: PlayerEntity[]) => {
		players.forEach((player) => {
			this.players.push(player);
			this.playerList.addPlayer(player);

			player.runSaga(
				playerGameDeckSagaFactory,
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

		// todo fix these ugly typings
		this.sagaMiddleware.run(this.gameTeardownSagaFactory() as () => Generator);
		this.sagaMiddleware.run(gameSaga as any, this.callbacks);
		this.sagaMiddleware.run(sendPublicEventsSaga);
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

	private gameTeardownSagaFactory = () => {
		const broadcast = (event: GameFinishEvent) => {
			this.getConnectedPlayers().forEach((player) => {
				player.put(event);
			});

			this.events.emit(finishGameEventKey, event.payload);
		};

		const teardown = () => {
			// todo this is ugly
			(this.opponentProvider as unknown as null) = null;
			(this.deck as unknown as null) = null;
			this.playerList.deconstructor();
			(this.playerList as unknown as null) = null;
			this.events.removeAllListeners();
			(this.events as unknown as null) = null;
		};

		return function* () {
			const event: GameFinishEvent = yield take(gameFinishEvent.toString());

			broadcast(event);
			teardown();
		};
	};

	private getAllPlayers = () => this.players;

	private getLivingPlayers = () =>
		this.players.filter(
			(p) =>
				p.select(getPlayerStatus) !== PlayerStatus.QUIT &&
				p.select(isPlayerAlive)
		);
}

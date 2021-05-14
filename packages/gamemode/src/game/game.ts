import { Logger } from "winston";
import { EventEmitter } from "events";
import { Store } from "redux";
import { PlayerStatus, GameOptions, getOptions } from "@creature-chess/models";

import { Player, PlayerSelectors } from "../player";
import { OpponentProvider } from "./opponentProvider";
import { PlayerList } from "./playerList";
import { CardDeck } from "./cardDeck";
import { gameFinishEvent, playerListChangedEvent, GameFinishEvent } from "./events";
import { createGameStore, GameState } from "./store";
import { take } from "@redux-saga/core/effects";
import { gameSaga } from "./sagas";
import { playerGameDeckSagaFactory } from "./player/playerGameDeckSaga";
import { sendPublicEventsSaga } from "./publicEvents";
import { put } from "redux-saga/effects";

const finishGameEventKey = "FINISH_GAME";

export class Game {
	private options: GameOptions;

	private opponentProvider?: OpponentProvider;
	private playerList = new PlayerList();
	private players: Player[] = [];
	private events = new EventEmitter();
	private deck: CardDeck;

	private store?: Store<GameState>;

	constructor(
		public readonly id: string,
		private logger: Logger,
		options?: Partial<GameOptions>
	) {
		this.options = getOptions(options);

		this.deck = new CardDeck(this.logger);
	}

	public start = (players: Player[]) => {
		players.forEach(player => {
			this.players.push(player);
			this.playerList.addPlayer(player);

			player.runSaga(playerGameDeckSagaFactory, this.deck);
		});

		this.opponentProvider = new OpponentProvider(players);

		// todo this is ugly
		this.playerList.onUpdate(newPlayers => {
			this.getConnectedPlayers().forEach(player => {
				player.runSaga(function*() {
					yield put(playerListChangedEvent({ players: newPlayers }));
				});
			});
		});

		const { store, sagaMiddleware } = createGameStore({
			options: this.options,
			getMatchups: this.opponentProvider.getMatchups,
			players: {
				getAll: this.getAllPlayers,
				getLiving: this.getLivingPlayers,
				getById: this.getPlayerById
			},
			logger: this.logger
		});
		this.store = store;

		// todo fix these ugly typings
		sagaMiddleware.run(this.gameTeardownSagaFactory() as () => Generator);
		sagaMiddleware.run(gameSaga as () => Generator);
		sagaMiddleware.run(sendPublicEventsSaga);
	}

	public getPlayerById = (playerId: string) => {
		return this.players.find(p => p.select(PlayerSelectors.getPlayerStatus) !== PlayerStatus.QUIT && p.id === playerId) || null;
	}

	public onFinish(fn: (winner: Player) => void) {
		this.events.on(finishGameEventKey, fn);
	}

	public getConnectedPlayers = () => this.players.filter(p => p.select(PlayerSelectors.getPlayerStatus) !== PlayerStatus.QUIT);

	public getRoundInfo = () => this.store!.getState().roundInfo;
	public getPlayerListPlayers = () => this.playerList.getValue();

	private gameTeardownSagaFactory = () => {
		const broadcast = (event: GameFinishEvent) => {
			this.getConnectedPlayers().forEach(player => {
				player.runSaga(function*() {
					yield put(event);
				});
			});

			this.events.emit(finishGameEventKey, event.payload.winnerId);
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

		return function*() {
			const event: GameFinishEvent = yield take(gameFinishEvent.toString());

			broadcast(event);
			teardown();
		};
	}

	private getAllPlayers = () => this.players;

	private getLivingPlayers = () =>
		this.players.filter(p =>
			p.select(PlayerSelectors.getPlayerStatus) !== PlayerStatus.QUIT
			&& p.select(PlayerSelectors.isPlayerAlive)
		)
}

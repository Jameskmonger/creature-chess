import { Logger } from "winston";
import { v4 as uuid } from "uuid";
import { EventEmitter } from "events";
import { Store } from "redux";
import { PlayerStatus, GameOptions, getOptions } from "@creature-chess/models";

import { Player } from "../player";
import { OpponentProvider } from "./opponentProvider";
import { PlayerList } from "./playerList";
import { CardDeck } from "./cardDeck";
import { GameEvent, gameFinishEvent, playerListChangedEvent, GameFinishEvent, GamePhaseStartedEvent } from "./events";
import { createGameStore, GameState } from "./store";
import { take } from "@redux-saga/core/effects";
import { gameSaga } from "./sagas";
import { playerGameDeckSagaFactory } from "./player/playerGameDeckSaga";
import { sendPublicEventsSaga } from "./publicEvents";

const finishGameEventKey = "FINISH_GAME";

export class Game {
    public readonly id: string;

    private options: GameOptions;

    private opponentProvider: OpponentProvider;
    private playerList = new PlayerList();
    private players: Player[] = [];
    private events = new EventEmitter();
    private deck: CardDeck;

    private store: Store<GameState>;

    private logger: Logger;

    constructor(createLogger: (id: string) => Logger, players: Player[], options?: Partial<GameOptions>) {
        this.id = uuid();

        this.options = getOptions(options);
        this.logger = createLogger(this.id);

        this.deck = new CardDeck(this.logger);

        players.forEach(this.addPlayer);

        this.opponentProvider = new OpponentProvider(players);
        this.playerList.onUpdate(newPlayers => {
            this.dispatchPublicGameEvent(playerListChangedEvent({ players: newPlayers }));
        });

        const { store, sagaMiddleware } = createGameStore({
            options: this.options,
            getMatchups: this.opponentProvider.getMatchups,
            players: {
                getAll: this.getAllPlayers,
                getLiving: this.getLivingPlayers,
                getById: this.getPlayerById,
                broadcast: this.dispatchPublicGameEvent
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
        return this.players.find(p => p.getStatus() !== PlayerStatus.QUIT && p.id === playerId) || null;
    }

    public onFinish(fn: (winner: Player) => void) {
        this.events.on(finishGameEventKey, fn);
    }

    private gameTeardownSagaFactory = () => {
        const broadcast = (event: GameFinishEvent) => {
            this.dispatchPublicGameEvent(event);
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

    private addPlayer = (player: Player) => {
        player.setLogger(this.logger);

        this.players.push(player);
        this.playerList.addPlayer(player);

        player.setGetRoundInfoState(() => this.store.getState().roundInfo);
        player.setGetPlayerListPlayers(this.playerList.getValue);

        player.runSaga(playerGameDeckSagaFactory(this.deck));
    }

    private getAllPlayers = () => this.players;

    private dispatchPublicGameEvent = (event: GameEvent) => {
        this.players.filter(p => p.getStatus() === PlayerStatus.CONNECTED)
            .forEach(p => p.receiveGameEvent(event));
    }

    private getLivingPlayers = () => this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.isAlive());
}

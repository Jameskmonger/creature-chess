import { Logger } from "winston";
import { v4 as uuid } from "uuid";
import { EventEmitter } from "events";
import { Store } from "redux";
import { PlayerListPlayer, PlayerStatus, GameOptions, getOptions } from "@creature-chess/models";

import { Player } from "./player";
import { HeadToHeadOpponentProvider, IOpponentProvider } from "./game/opponentProvider";
import { PlayerList } from "./game/playerList";
import { CardDeck } from "./game/cardDeck";
import { GameEvent, gameFinishEvent, playerListChangedEvent, gamePhaseStartedEvent, GameFinishEvent, GamePhaseStartedEvent } from "./game/events";
import { createGameStore, GameState } from "./game/store";
import { call, put, select, take, takeLatest } from "@redux-saga/core/effects";
import { RoundInfoCommands, SetRoundInfoCommand } from "./game/roundInfo";
import { GameSagaDependencies } from "./game/sagas";
import { gameLoopSaga } from "./game/gameLoop";

const startStopwatch = () => process.hrtime();
const stopwatch = (start: [number, number]) => {
    const end = process.hrtime(start);
    return Math.round((end[0] * 1000) + (end[1] / 1000000));
};

const finishGameEventKey = "FINISH_GAME";

export class Game {
    public readonly id: string;

    private options: GameOptions;

    private lastLivingPlayerCount: number = 0;
    private opponentProvider: IOpponentProvider = new HeadToHeadOpponentProvider();
    private playerList = new PlayerList();
    private players: Player[] = [];
    private events = new EventEmitter();
    private deck: CardDeck;

    private store: Store<GameState>;

    private logger: Logger;

    constructor(createLogger: (id: string) => Logger, players: Player[], options?: Partial<GameOptions>) {
        this.id = uuid();

        const { store, sagaMiddleware } = createGameStore();
        this.store = store;

        this.options = getOptions(options);
        this.logger = createLogger(this.id);

        this.deck = new CardDeck(this.logger);

        players.forEach(this.addPlayer);
        this.updateOpponentProvider();

        this.playerList.onUpdate(newPlayers => {
            this.dispatchPublicGameEvent(playerListChangedEvent({ players: newPlayers }));
        });

        sagaMiddleware.run(this.sendPublicEventsSagaFactory());
        sagaMiddleware.run(this.gameSagaFactory(players));
        sagaMiddleware.run(this.gameTeardownSagaFactory());
    }

    public onFinish(fn: (winner: Player) => void) {
        this.events.on(finishGameEventKey, fn);
    }

    public getPlayerById(playerId: string) {
        return this.players.find(p => p.getStatus() !== PlayerStatus.QUIT && p.id === playerId);
    }

    private sendPublicEventsSagaFactory = () => {
        const broadcast = (event: GamePhaseStartedEvent) => {
            this.dispatchPublicGameEvent(event);
        };

        return function*() {
            yield takeLatest<SetRoundInfoCommand>(RoundInfoCommands.setRoundInfoCommand.toString(), function*({ payload }) {
                broadcast(gamePhaseStartedEvent(payload));
            });
        };
    }

    private gameSagaFactory = (players: Player[]) => {
        const sagaDependencies: GameSagaDependencies = {
            options: this.options,
            getMatchups: () => {
                this.updateOpponentProvider();
                return this.opponentProvider.getMatchups();
            },

            players: {
                getAll: () => this.players,
                getLiving: this.getLivingPlayers,
                getById: (id: string) => this.players.find(p => p.id === id) || null
            },
            logger: this.logger
        };

        return function*() {
            const startTime = startStopwatch();

            sagaDependencies.logger.info(`Game started with ${players.length} players: ${players.map(p => p.name).join(", ")}`);

            const { winnerId } = yield call(gameLoopSaga, sagaDependencies);

            const duration = stopwatch(startTime);

            const round = yield select((state: GameState) => state.roundInfo.round);

            sagaDependencies.logger.info(`Match complete in ${(duration)} ms (${round} rounds)`);

            yield put(gameFinishEvent({ winnerId }));
        };
    }

    private gameTeardownSagaFactory = () => {
        const broadcast = (event: GameFinishEvent) => {
            this.dispatchPublicGameEvent(event);
            this.events.emit(finishGameEventKey, event.payload.winnerId);
        };

        const teardown = () => {
            this.opponentProvider = null;
            this.deck = null;
            this.playerList.deconstructor();
            this.playerList = null;
            this.events.removeAllListeners();
            this.events = null;
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

        player.setDeck(this.deck);
        player.setGetRoundInfoState(() => this.store.getState().roundInfo);
        player.setGetPlayerListPlayers(this.playerList.getValue);
    }

    private dispatchPublicGameEvent(event: GameEvent) {
        this.players.filter(p => p.getStatus() === PlayerStatus.CONNECTED)
            .forEach(p => p.receiveGameEvent(event));
    }

    private updateOpponentProvider() {
        const livingPlayers = this.getLivingPlayers();
        const livingPlayerCount = livingPlayers.length;

        if (livingPlayerCount !== this.lastLivingPlayerCount) {
            this.opponentProvider.setPlayers(livingPlayers);
            this.lastLivingPlayerCount = livingPlayerCount;
        }
    }

    private getLivingPlayers = () => this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT && p.isAlive());
}

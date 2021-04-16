import { Logger } from "winston";
import { v4 as uuid } from "uuid";
import { EventEmitter } from "events";
import { Store } from "redux";
import { PlayerListPlayer, PlayerStatus, GameOptions, getOptions } from "@creature-chess/models";

import { Player } from "./player";
import { HeadToHeadOpponentProvider, IOpponentProvider } from "./game/opponentProvider";
import { PlayerList } from "./game/playerList";
import { CardDeck } from "./game/cardDeck";
import { GameEvent, gameFinishEvent, playerListChangedEvent, gamePhaseStartedEvent } from "./game/events";
import { createGameStore, GameState } from "./game/store";
import { call, takeLatest } from "@redux-saga/core/effects";
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

        this.playerList.onUpdate(this.onPlayerListUpdate);

        sagaMiddleware.run(this.sendPublicEventsSagaFactory());
        sagaMiddleware.run(this.gameSagaFactory(), players);
    }

    public onFinish(fn: (winner: Player) => void) {
        this.events.on(finishGameEventKey, fn);
    }

    public getPlayerById(playerId: string) {
        return this.players.find(p => p.getStatus() !== PlayerStatus.QUIT && p.id === playerId);
    }

    private sendPublicEventsSagaFactory = () => {
        const thisRef = this;

        return function*() {
            yield takeLatest<SetRoundInfoCommand>(RoundInfoCommands.setRoundInfoCommand.toString(), function*({ payload }) {
                thisRef.dispatchPublicGameEvent(gamePhaseStartedEvent(payload));
            });
        };
    }

    private gameSagaFactory = () => {
        const thisRef = this;

        return function*(players: Player[]) {
            players.forEach(thisRef.addPlayer);

            thisRef.updateOpponentProvider();

            const startTime = startStopwatch();

            thisRef.logger.info(`Game started with ${players.length} players: ${players.map(p => p.name).join(", ")}`);

            const sagaDependencies: GameSagaDependencies = {
                options: thisRef.options,
                getMatchups: () => {
                    thisRef.updateOpponentProvider();
                    return thisRef.opponentProvider.getMatchups();
                },

                players: {
                    getAll: () => thisRef.players,
                    getLiving: thisRef.getLivingPlayers,
                    getById: (id: string) => thisRef.players.find(p => p.id === id) || null
                },
                logger: thisRef.logger
            };

            const { winnerId } = yield call(gameLoopSaga, sagaDependencies);

            const duration = stopwatch(startTime);

            thisRef.logger.info(`Match complete in ${(duration)} ms (${thisRef.store.getState().roundInfo.round} rounds)`);

            // teardown
            thisRef.opponentProvider = null;
            thisRef.deck = null;
            thisRef.playerList.deconstructor();
            thisRef.playerList = null;

            const event = gameFinishEvent({ winnerId });
            thisRef.players.filter(p => p.getStatus() !== PlayerStatus.QUIT).forEach(p => p.receiveGameEvent(event));

            thisRef.events.emit(finishGameEventKey, winnerId);

            // more teardown
            thisRef.events.removeAllListeners();
            thisRef.events = null;
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

    private onPlayerListUpdate = (players: PlayerListPlayer[]) => {
        this.dispatchPublicGameEvent(playerListChangedEvent({ players }));
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

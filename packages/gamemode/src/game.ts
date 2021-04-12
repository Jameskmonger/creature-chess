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

    public getPlayerList() {
        return this.playerList.getValue();
    }

    private sendPublicEventsSagaFactory = () => {
        const _this = this;

        return function*() {
            yield takeLatest<SetRoundInfoCommand>(RoundInfoCommands.setRoundInfoCommand.toString(), function*({ payload }) {
                _this.dispatchPublicGameEvent(gamePhaseStartedEvent(payload));
            });
        }
    }

    private gameSagaFactory = () => {
        const _this = this;

        return function*(players: Player[]) {
            players.forEach(_this.addPlayer);

            _this.updateOpponentProvider();

            const startTime = startStopwatch();

            _this.logger.info(`Game started with ${players.length} players: ${players.map(p => p.name).join(", ")}`);

            const sagaDependencies: GameSagaDependencies = {
                options: _this.options,
                getMatchups: () => {
                    _this.updateOpponentProvider();
                    return _this.opponentProvider.getMatchups();
                },

                players: {
                    getAll: () => _this.players,
                    getLiving: _this.getLivingPlayers,
                    getById: (id: string) => _this.players.find(p => p.id === id) || null
                }
            };

            const { winnerId } = yield call(gameLoopSaga, sagaDependencies);

            const duration = stopwatch(startTime);

            _this.logger.info(`Match complete in ${(duration)} ms (${_this.store.getState().roundInfo.round} rounds)`);

            // teardown
            _this.opponentProvider = null;
            _this.deck = null;
            _this.playerList.deconstructor();
            _this.playerList = null;

            const winner = _this.players.find(p => p.id === winnerId);

            const event = gameFinishEvent({ winnerName: winner.name });
            _this.players.filter(p => p.getStatus() !== PlayerStatus.QUIT).forEach(p => p.receiveGameEvent(event));

            const gamePlayers = _this.players.map(p => ({
                id: p.id,
                name: p.name
            }));

            _this.logger.info(`Game finished, won by ${winner.name}`);
            _this.events.emit(finishGameEventKey, winner, gamePlayers);

            // more teardown
            _this.events.removeAllListeners();
            _this.events = null;
        }
    };

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

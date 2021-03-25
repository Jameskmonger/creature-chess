import { EventEmitter } from "events";
import { SagaMiddleware } from "redux-saga";
import { takeEvery, put, takeLatest } from "@redux-saga/core/effects";
import pDefer = require("p-defer");
import { PieceModel, PlayerListPlayer, PlayerStatus, HEALTH_LOST_PER_PIECE } from "@creature-chess/models";

import { BoardCommands } from "../../board";
import { GameState } from "../store/state";
import { DefinitionProvider } from "../definitions/definitionProvider";
import { CardDeck } from "../cardDeck";
import { Match } from "../match";
import {
    createPropertyUpdateRegistry, PlayerPropertyUpdateRegistry,
    playerBattle, playerMatchRewards,
    subtractHealthCommand, fillBoardCommand
} from "./sagas";
import {
    AfterRerollCardsEvent, AfterSellPieceEvent, AFTER_REROLL_CARDS_EVENT, AFTER_SELL_PIECE_EVENT,
    ClientFinishMatchEvent, CLIENT_FINISH_MATCH_EVENT, playerFinishMatchEvent, playerDeathEvent
} from "./events";
import { PlayerStore, createPlayerStore } from "./store";
import { PlayerInfoCommands } from "./playerInfo";
import { BenchCommands } from "./bench";
import { isPlayerAlive } from "./playerSelectors";
import { getAllPieces } from "./pieceSelectors";
import { QuitGameAction, QUIT_GAME_ACTION } from "./actions";
import { GameEvent } from "../store/events";
import { GameEvents } from "../store";

enum PlayerEvent {
    QUIT_GAME = "QUIT_GAME"
}

export interface PlayerMatchResults {
    homePlayer: Player;
    opponentName: string;
    homeScore: number;
    awayScore: number;
}

export abstract class Player {
    public readonly id: string;
    public readonly name: string;

    protected match: Match = null;
    protected definitionProvider: DefinitionProvider;
    protected store: PlayerStore;
    protected sagaMiddleware: SagaMiddleware;

    protected getGameState: () => GameState;
    protected getPlayerListPlayers: () => PlayerListPlayer[];

    private events = new EventEmitter();
    private propertyUpdateRegistry: PlayerPropertyUpdateRegistry;

    private deck: CardDeck;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;

        const { store, sagaMiddleware } = createPlayerStore(this.id);
        this.store = store;
        this.sagaMiddleware = sagaMiddleware;

        this.sagaMiddleware.run(this.afterSellPieceEventSaga());
        this.sagaMiddleware.run(this.afterRerollCardsEventSaga());
        this.sagaMiddleware.run(this.quitGameSaga());
        this.sagaMiddleware.run(this.clientFinishMatchSaga());
        this.sagaMiddleware.run(this.finishGameSaga());
        playerBattle(this.sagaMiddleware);
        playerMatchRewards(this.sagaMiddleware);

        this.propertyUpdateRegistry = createPropertyUpdateRegistry(this.sagaMiddleware);
    }

    public receiveGameEvent(gameEvent: GameEvent) {
        this.store.dispatch(gameEvent);
    }

    public propertyUpdates() {
        return this.propertyUpdateRegistry;
    }

    public setGetGameState(fn: () => GameState) {
        this.getGameState = fn;
    }

    public setGetPlayerListPlayers(fn: () => PlayerListPlayer[]) {
        this.getPlayerListPlayers = fn;
    }

    public setDefinitionProvider(definitionProvider: DefinitionProvider) {
        this.definitionProvider = definitionProvider;
    }

    public getMatch = () => this.match;

    public getHealth() {
        return this.store.getState().playerInfo.health;
    }

    public getReady() {
        return this.store.getState().playerInfo.ready;
    }

    public getStreak() {
        return this.store.getState().playerInfo.streak;
    }

    public getLevel() {
        return this.store.getState().playerInfo.level;
    }

    public getXp() {
        return this.store.getState().playerInfo.xp;
    }

    public getMoney() {
        return this.store.getState().playerInfo.money;
    }

    public getShopLocked() {
        return this.store.getState().playerInfo.shopLocked;
    }

    public getStatus() {
        return this.store.getState().playerInfo.status;
    }

    public getBattle() {
        return this.store.getState().playerInfo.battle;
    }

    public setDeck(deck: CardDeck) {
        this.deck = deck;
    }

    public enterPreparingPhase() {
        if (this.store.getState().playerInfo.shopLocked === false) {
            this.rerollCards();
        }

        this.store.dispatch(PlayerInfoCommands.clearOpponentCommand());
        this.store.dispatch(BenchCommands.unlockBenchCommand());
    }

    public fillBoard() {
        this.store.dispatch(fillBoardCommand());
    }

    public enterReadyPhase(match: Match) {
        this.match = match;
        this.store.dispatch(BenchCommands.lockBenchCommand());

        this.store.dispatch(PlayerInfoCommands.updateOpponentCommand(match.away.id));
    }

    public async fightMatch(startedAt: number, battleTimeout: pDefer.DeferredPromise<void>): Promise<PlayerMatchResults> {
        const finalMatchBoard = await this.match.fight(battleTimeout.promise);

        const pieces = Object.values(finalMatchBoard.pieces);

        const surviving = {
            home: pieces.filter(p => p.currentHealth > 0 && p.ownerId === this.id),
            away: pieces.filter(p => p.currentHealth > 0 && p.ownerId !== this.id)
        };

        const homeScore = surviving.home.length;
        const awayScore = surviving.away.length;

        this.store.dispatch(playerFinishMatchEvent(homeScore, awayScore));

        const opponentName = this.match.away.name;

        this.match = null;

        return {
            homePlayer: this,
            opponentName,
            homeScore,
            awayScore
        };
    }

    public onQuitGame(fn: (player: Player) => void) {
        this.events.on(PlayerEvent.QUIT_GAME, fn);

        return () => this.events.off(PlayerEvent.QUIT_GAME, fn);
    }

    public rerollCards = () => {
        if (isPlayerAlive(this.store.getState()) === false) {
            return;
        }

        const cards = this.store.getState().playerInfo.cards;

        const newCards = this.deck.reroll(cards, this.getLevel(), 5);
        this.store.dispatch(PlayerInfoCommands.updateCardsCommand(newCards));
    }

    public clearPieces() {
        const pieces = getAllPieces(this.store.getState());

        this.store.dispatch(BoardCommands.initialiseBoard({}));

        // todo this is ugly
        this.store.dispatch(BenchCommands.initialiseBenchCommand({
            pieces: [],
            locked: this.store.getState().bench.locked
        }));

        for (const piece of pieces) {
            this.deck.addPiece(piece);
        }

        const cards = this.store.getState().playerInfo.cards;
        this.store.dispatch(PlayerInfoCommands.updateCardsCommand([]));
        this.deck.addCards(cards);

        this.deck.shuffle();
    }

    public kill() {
        this.clearPieces();
        this.store.dispatch(playerDeathEvent());
    }

    public resurrect(startingHealth: number) {
        this.store.dispatch(PlayerInfoCommands.updateRoundDiedAtCommand(null));
        this.store.dispatch(PlayerInfoCommands.updateHealthCommand(startingHealth));
    }

    public isAlive() {
        return isPlayerAlive(this.store.getState());
    }

    public getRoundDiedAt() {
        return this.store.getState().playerInfo.roundDiedAt;
    }

    public getBoard() {
        return this.store.getState().board;
    }

    public getBench() {
        return this.store.getState().bench;
    }

    public getCards() {
        return this.store.getState().playerInfo.cards;
    }

    private afterSellPieceEventSaga() {
        const addPieceToDeck = (piece: PieceModel) => {
            this.deck.addPiece(piece);
            this.deck.shuffle();
        };

        return function*() {
            yield takeEvery<AfterSellPieceEvent>(
                AFTER_SELL_PIECE_EVENT,
                function*({ payload: { piece } }) {
                    addPieceToDeck(piece);
                }
            );
        };
    }

    private afterRerollCardsEventSaga() {
        const thisRerollCards = this.rerollCards;

        return function*() {
            yield takeEvery<AfterRerollCardsEvent>(
                AFTER_REROLL_CARDS_EVENT,
                function*() {
                    thisRerollCards();
                }
            );
        };
    }

    private quitGameSaga() {
        const emitEvent = () => this.events.emit(PlayerEvent.QUIT_GAME, this);

        return function*() {
            yield takeEvery<QuitGameAction>(
                QUIT_GAME_ACTION,
                function*() {
                    yield put(PlayerInfoCommands.updateStatusCommand(PlayerStatus.QUIT));

                    emitEvent();
                }
            );
        };
    }

    private clientFinishMatchSaga() {
        const finishMatch = () => {
            if (this.match === null) {
                return;
            }

            this.match.onClientFinishMatch();
        };

        return function*() {
            yield takeLatest<ClientFinishMatchEvent>(
                CLIENT_FINISH_MATCH_EVENT,
                function*() {
                    finishMatch();
                }
            );
        };
    }

    private finishGameSaga() {
        const removeListeners = () => this.events.removeAllListeners();

        return function*() {
            yield takeLatest<GameEvents.GameFinishEvent>(
                GameEvents.GAME_FINISH_EVENT,
                function*() {
                    removeListeners();
                }
            );
        };
    }
}

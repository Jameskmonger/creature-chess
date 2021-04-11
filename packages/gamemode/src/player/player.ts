import { Logger } from "winston";
import { EventEmitter } from "events";
import { SagaMiddleware } from "redux-saga";
import { takeEvery, put, takeLatest } from "@redux-saga/core/effects";
import pDefer = require("p-defer");
import { PieceModel, PlayerListPlayer, PlayerStatus } from "@creature-chess/models";
import { BoardSelectors, BoardSlice, createBoardSlice } from "@creature-chess/board";

import { GameInfoState } from "../gameInfo";
import { CardDeck } from "../cardDeck";
import { Match } from "../match";
import {
    createPropertyUpdateRegistry, PlayerPropertyUpdateRegistry,
    playerBattle, playerMatchRewards,
    fillBoardCommand
} from "./sagas";
import {
    AfterRerollCardsEvent, AfterSellPieceEvent, AFTER_REROLL_CARDS_EVENT, AFTER_SELL_PIECE_EVENT,
    ClientFinishMatchEvent, CLIENT_FINISH_MATCH_EVENT, playerFinishMatchEvent, playerDeathEvent
} from "./events";
import { PlayerStore, createPlayerStore, PlayerState } from "./store";
import { PlayerInfoCommands } from "./playerInfo";
import { isPlayerAlive } from "./playerSelectors";
import { getAllPieces, getPiecesForStage, getPiecesExceptStage } from "./pieceSelectors";
import { QuitGameAction, QUIT_GAME_ACTION } from "./actions";
import { GameEvent } from "../events";
import { updateCardsCommand } from "./cardShop";

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
    public readonly picture: number;

    protected match: Match = null;
    protected store: PlayerStore;
    protected sagaMiddleware: SagaMiddleware;

    protected getGameInfoState: () => GameInfoState;
    protected getPlayerListPlayers: () => PlayerListPlayer[];

    private events = new EventEmitter();
    private propertyUpdateRegistry: PlayerPropertyUpdateRegistry;

    private deck: CardDeck;
    private logger: Logger;
    protected readonly boardSlice: BoardSlice<PieceModel>;
    protected readonly benchSlice: BoardSlice<PieceModel>;

    constructor(id: string, name: string, picture: number) {
        this.id = id;
        this.name = name;
        this.picture = picture;

        this.boardSlice = createBoardSlice(`player-${this.id}-board`, { width: 7, height: 3 });
        this.benchSlice = createBoardSlice(`player-${this.id}-bench`, { width: 7, height: 1 });

        const { store, sagaMiddleware } = createPlayerStore(this.getLogger, this.id, this.name, {
            boardSlice: this.boardSlice,
            benchSlice: this.benchSlice
        });
        this.store = store;
        this.sagaMiddleware = sagaMiddleware;

        this.sagaMiddleware.run(this.afterSellPieceEventSaga());
        this.sagaMiddleware.run(this.afterRerollCardsEventSaga());
        this.sagaMiddleware.run(this.quitGameSaga());
        this.sagaMiddleware.run(this.clientFinishMatchSaga());
        this.sagaMiddleware.run(this.finishGameSaga());
        playerBattle(this.sagaMiddleware);
        this.sagaMiddleware.run(playerMatchRewards<PlayerState>(this.id));

        this.propertyUpdateRegistry = createPropertyUpdateRegistry(this.sagaMiddleware);
    }

    public setLogger(logger: Logger) {
        this.logger = logger;
    }

    public getLogger = () => this.logger;

    public receiveGameEvent(gameEvent: GameEvent) {
        this.store.dispatch(gameEvent);
    }

    public propertyUpdates() {
        return this.propertyUpdateRegistry;
    }

    public setGetGameInfoState(fn: () => GameInfoState) {
        this.getGameInfoState = fn;
    }

    public setGetPlayerListPlayers(fn: () => PlayerListPlayer[]) {
        this.getPlayerListPlayers = fn;
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

    public isDead() {
        return this.store.getState().playerInfo.dead;
    }

    public getShopLocked() {
        return this.store.getState().cardShop.locked;
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
        if (!this.getShopLocked()) {
            this.rerollCards();
        }

        this.store.dispatch(PlayerInfoCommands.clearOpponentCommand());

        this.store.dispatch(this.boardSlice.commands.setPieceLimitCommand(this.getLevel()));
        this.store.dispatch(this.boardSlice.commands.unlockBoardCommand());
    }

    public fillBoard() {
        this.store.dispatch(fillBoardCommand());
    }

    public enterReadyPhase(match: Match) {
        this.match = match;
        this.store.dispatch(this.boardSlice.commands.lockBoardCommand());

        const opponentId = match.home.id === this.id
            ? match.away.id
            : match.home.id

        this.store.dispatch(PlayerInfoCommands.updateOpponentCommand(opponentId));
    }

    public async fightMatch(startedAt: number, battleTimeout: pDefer.DeferredPromise<void>): Promise<PlayerMatchResults> {
        const finalMatchBoard = await this.match.fight(battleTimeout.promise);

        const survivingPieces = BoardSelectors.getAllPieces(finalMatchBoard).filter(p => p.currentHealth > 0);

        const surviving = {
            home: survivingPieces.filter(p => p.ownerId === this.id),
            away: survivingPieces.filter(p => p.ownerId !== this.id)
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

        const state = this.store.getState();

        const { cardShop: { cards } } = state;

        const threeStarBoardPieces = getPiecesForStage(state.board, 2);
        const threeStarBenchPieces = getPiecesForStage(state.bench, 2);

        const excludeIds = [ ...threeStarBoardPieces, ...threeStarBenchPieces ].map(p => p.definitionId);

        const blessCandidateIds = [... new Set(getPiecesExceptStage(state.board, 2).map(p => p.definitionId)) ];

        const newCards = this.deck.reroll(cards, 5, this.getLevel(), blessCandidateIds, excludeIds);
        this.store.dispatch(updateCardsCommand(newCards));
    }

    public clearPieces() {
        const pieces = getAllPieces(this.store.getState());

        this.store.dispatch(this.boardSlice.commands.setBoardPiecesCommand({ pieces: {}, piecePositions: {} }));
        this.store.dispatch(this.benchSlice.commands.setBoardPiecesCommand({ pieces: {}, piecePositions: {} }));

        for (const piece of pieces) {
            this.deck.addPiece(piece);
        }

        const { cardShop: { cards } } = this.store.getState();
        this.store.dispatch(updateCardsCommand([]));
        this.deck.addCards(cards);

        this.deck.shuffle();
    }

    public kill() {
        this.clearPieces();
        this.store.dispatch(playerDeathEvent());
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
        return this.store.getState().cardShop.cards;
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
            yield takeLatest<GameEvent>(
                "gameFinishEvent",
                function*() {
                    removeListeners();
                }
            );
        };
    }
}

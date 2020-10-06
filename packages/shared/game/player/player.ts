import pDefer = require("p-defer");
import { takeEvery } from "@redux-saga/core/effects";
import { Match } from "../../match/match";
import { log } from "../../log";
import { CardDeck } from "../../cardShop/cardDeck";
import { EventEmitter } from "events";
import { BUY_XP_COST, BUY_XP_AMOUNT, MAX_PLAYER_LEVEL } from "@creature-chess/models/src/constants";
import { DefinitionProvider } from "../definitionProvider";
import { PieceModel, PlayerListPlayer } from "@creature-chess/models";
import { getAllPieces } from "../../player/pieceSelectors";
import { PlayerStatus } from "@creature-chess/models/src/player-list-player";
import { createPlayerStore, PlayerStore } from "../../player/store";
import { cardsUpdated, clearOpponent, healthUpdated, moneyUpdateAction, roundDiedAtUpdated, setOpponent, statusUpdated } from "../../player/playerInfo";
import { SagaMiddleware } from "redux-saga";
import { isPlayerAlive } from "../../player/playerSelectors";
import { initialiseBench, lockBench, unlockBench } from "packages/shared/player/bench/benchActions";
import { initialiseBoard } from "packages/shared/board/actions/boardActions";
import { subtractHealthCommand } from "packages/shared/player/sagas/health";
import { playerStreak } from "./sagas/streak";
import { createPropertyUpdateRegistry, PlayerPropertyUpdateRegistry } from "./sagas/playerPropertyUpdates";
import { AfterRerollCardsAction, AfterSellPieceAction, AFTER_REROLL_CARDS, AFTER_SELL_PIECE, playerFinishMatch } from "./actions";
import { addXpCommand } from "packages/shared/player/sagas/xp";
import { playerBattle } from "./sagas/battle";
import { GameState } from "../store/state";
import { playerMatchRewards } from "./sagas/matchRewards";
import { fillBoardCommand } from "packages/shared/player/sagas/fillBoard";
import { sellPiece } from "../../player/sagas/sellPiece";
import { rerollCards } from "../../player/sagas/rerollCards";

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

    private events = new EventEmitter();
    private propertyUpdateRegistry: PlayerPropertyUpdateRegistry;

    private deck: CardDeck;

    protected getGameState: () => GameState;
    protected getPlayerListPlayers: () => PlayerListPlayer[];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;

        const { store, sagaMiddleware } = createPlayerStore(this.id);
        this.store = store;
        this.sagaMiddleware = sagaMiddleware;

        this.sagaMiddleware.run(this.afterSellPieceSaga());
        this.sagaMiddleware.run(this.afterRerollCardsSaga());
        this.sagaMiddleware.run(sellPiece);
        this.sagaMiddleware.run(rerollCards);
        playerStreak(this.sagaMiddleware);
        playerBattle(this.sagaMiddleware);
        playerMatchRewards(this.sagaMiddleware);

        this.propertyUpdateRegistry = createPropertyUpdateRegistry(this.sagaMiddleware);
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

    public getMatch() {
        return this.match;
    }

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

    public getMoney() {
        return this.store.getState().playerInfo.money;
    }

    public getStatus() {
        return this.store.getState().playerInfo.status;
    }

    public getBattle() {
        return this.store.getState().playerInfo.battle;
    }

    public onFinishGame(winner: Player) {
        this.events.removeAllListeners();
    }

    public setDeck(deck: CardDeck) {
        this.deck = deck;
    }

    public async enterPreparingPhase() {
        if (this.store.getState().playerInfo.shopLocked === false) {
            this.rerollCards();
        }

        this.store.dispatch(clearOpponent());
        this.store.dispatch(unlockBench());

        this.onEnterPreparingPhase();
    }

    public fillBoard() {
        this.store.dispatch(fillBoardCommand());
    }

    public enterReadyPhase(match: Match) {
        this.store.dispatch(lockBench());

        this.store.dispatch(setOpponent(match.away.id));
        this.match = match;

        this.onEnterReadyPhase();
    }

    public async fightMatch(startedAt: number, battleTimeout: pDefer.DeferredPromise<void>): Promise<PlayerMatchResults> {
        this.onEnterPlayingPhase(startedAt);

        const finalMatchBoard = await this.match.fight(battleTimeout.promise);

        const pieces = Object.values(finalMatchBoard.pieces);

        const surviving = {
            home: pieces.filter(p => p.currentHealth > 0 && p.ownerId === this.id),
            away: pieces.filter(p => p.currentHealth > 0 && p.ownerId !== this.id)
        };

        const homeScore = surviving.home.length;
        const awayScore = surviving.away.length;

        const damage = awayScore * 3;
        this.store.dispatch(subtractHealthCommand(this.getGameState().round, damage));

        this.store.dispatch(playerFinishMatch(homeScore, awayScore));

        return {
            homePlayer: this,
            opponentName: this.match.away.name,
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
        this.store.dispatch(cardsUpdated(newCards));
    }

    public clearPieces() {
        const pieces = getAllPieces(this.store.getState());

        this.store.dispatch(initialiseBoard({}));

        // todo this is ugly
        this.store.dispatch(initialiseBench({
            pieces: [],
            locked: this.store.getState().bench.locked
        }));

        for (const piece of pieces) {
            this.deck.addPiece(piece);
        }

        const cards = this.store.getState().playerInfo.cards;
        this.store.dispatch(cardsUpdated([]));
        this.deck.addCards(cards);

        this.deck.shuffle();
    }

    public kill() {
        this.clearPieces();
        this.onDeath(Date.now());
    }

    public resurrect(startingHealth: number) {
        this.store.dispatch(roundDiedAtUpdated(null));
        this.store.dispatch(healthUpdated(startingHealth));
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

    public abstract onPlayersResurrected(playerIds: string[]);

    public abstract onStartGame(gameId: string);

    public abstract onPlayerListUpdate(playerLists: PlayerListPlayer[]);

    protected abstract onEnterPreparingPhase();

    protected abstract onEnterReadyPhase();

    protected abstract onEnterPlayingPhase(startedAt: number);

    protected abstract onDeath(phaseStartedAt: number);

    protected quitGame() {
        this.store.dispatch(statusUpdated(PlayerStatus.QUIT));

        // todo combine these
        this.events.emit(PlayerEvent.QUIT_GAME, this);
    }

    protected buyXp = () => {
        // todo put this all into a saga
        if (isPlayerAlive(this.store.getState()) === false) {
            log(`${this.name} attempted to buy xp, but they are dead`);
            return;
        }

        if (this.getLevel() === MAX_PLAYER_LEVEL) {
            log(`${this.name} attempted to buy xp, but they are at max level`);
            return;
        }

        const money = this.store.getState().playerInfo.money;

        // not enough money
        if (money < BUY_XP_COST) {
            log(`${this.name} attempted to buy xp costing $${BUY_XP_COST} but only had $${money}`);
            return;
        }

        this.store.dispatch(addXpCommand(BUY_XP_AMOUNT));
        this.store.dispatch(moneyUpdateAction(money - BUY_XP_COST));
    }

    protected finishMatch = () => {
        if (this.match === null) {
            return;
        }

        this.match.onClientFinishMatch();
    }

    private afterSellPieceSaga() {
        const addPieceToDeck = (piece: PieceModel) => {
            this.deck.addPiece(piece);
            this.deck.shuffle();
        };

        return function*() {
            yield takeEvery<AfterSellPieceAction>(
                AFTER_SELL_PIECE,
                function*({ payload: { piece } }) {
                    addPieceToDeck(piece);
                }
            );
        };
    }

    private afterRerollCardsSaga() {
        const rerollCards = this.rerollCards;

        return function*() {
            yield takeEvery<AfterRerollCardsAction>(
                AFTER_REROLL_CARDS,
                function*() {
                    rerollCards();
                }
            );
        };
    }
}

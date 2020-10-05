import pDefer = require("p-defer");
import { Match } from "../../match/match";
import { log } from "../../log";
import { CardDeck } from "../../cardShop/cardDeck";
import { EventEmitter } from "events";
import { OpponentProvider } from "../opponentProvider";
import { BUY_XP_COST, BUY_XP_AMOUNT, REROLL_COST, GRID_SIZE, STARTING_HEALTH, MAX_PLAYER_LEVEL } from "@creature-chess/models/src/constants";
import { TurnSimulator } from "../../match/combat/turnSimulator";
import { DefinitionProvider } from "../definitionProvider";
import { LobbyPlayer, StreakType, PlayerListPlayer, PlayerPieceLocation } from "@creature-chess/models";
import { getPiecesForStage, getXpToNextLevel } from "../../utils";
import { getBoardPieceCount, getPiece, getAllPieces } from "../../player/pieceSelectors";
import { PlayerPieces } from "./playerPieces";
import { mergeBoards } from "../../board/utils/mergeBoards";
import { PlayerBattle, inProgressBattle, finishedBattle, PlayerStatus } from "@creature-chess/models/src/player-list-player";
import { PlayerActions } from "../../player";
import { createPlayerStore, PlayerStore } from "../../player/store";
import { cardsUpdated } from "../../player/cardShop/actions";
import { moneyUpdateAction } from "../../player/gameInfo";
import { SagaMiddleware } from "redux-saga";
import { setLevelAction } from "../../player/level/actions";
import { getPlayerBelowPieceLimit, getMostExpensiveBenchPiece, getPlayerFirstEmptyBoardSlot } from "../../player/playerSelectors";

enum PlayerEvent {
    UPDATE_HEALTH = "UPDATE_HEALTH",
    UPDATE_READY = "UPDATE_READY",
    UPDATE_STREAK = "UPDATE_STREAK",
    START_LOBBY_GAME = "START_LOBBY_GAME",
    UPDATE_BATTLE = "UPDATE_BATTLE",
    UPDATE_STATUS = "UPDATE_STATUS",
    QUIT_GAME = "QUIT_GAME"
}

interface StreakInfo {
    type: StreakType;
    amount: number;
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
    public health: number = STARTING_HEALTH;
    public ready = false;
    public readonly streak: StreakInfo = {
        type: StreakType.WIN,
        amount: 0
    };
    public battle: PlayerBattle = null;

    public abstract readonly isBot: boolean;

    protected match: Match = null;
    protected definitionProvider: DefinitionProvider;
    protected shopLocked = false;
    protected store: PlayerStore;
    protected sagaMiddleware: SagaMiddleware;

    protected pieces: PlayerPieces;

    private events = new EventEmitter();

    private deck: CardDeck;

    private readyUpDeferred: pDefer.DeferredPromise<void>;

    private turnCount: number;
    private turnDuration: number;

    private currentRound: number | null = null;
    private roundDiedAt: number | null = null;
    private status: PlayerStatus = PlayerStatus.CONNECTED;

    protected battleTimeout: pDefer.DeferredPromise<void> = null;

    constructor(id: string, name: string, saga?: () => Generator) {
        this.id = id;
        this.name = name;

        const { store, sagaMiddleware } = createPlayerStore(this.id, saga);
        this.store = store;
        this.sagaMiddleware = sagaMiddleware;
        this.pieces = new PlayerPieces(this.store);
    }

    public setDefinitionProvider(definitionProvider: DefinitionProvider) {
        this.definitionProvider = definitionProvider;
    }

    public setTurnCount(turnCount: number) {
        this.turnCount = turnCount;
    }

    public setTurnDuration(turnDuration: number) {
        this.turnDuration = turnDuration;
    }

    public getMatch() {
        return this.match;
    }

    public getBattleBoard(away: Player) {
        return mergeBoards(GRID_SIZE, this.store.getState().board.pieces, away.store.getState().board.pieces);
    }

    public addXp(amount: number) {
        let { level, xp } = this.store.getState().level;

        for (let i = 0; i < amount; i++) {
            const toNextLevel = getXpToNextLevel(level);
            const newXp = xp + 1;

            if (newXp === toNextLevel) {
                xp = 0;
                level++;
            } else {
                xp = newXp;
            }
        }

        this.store.dispatch(setLevelAction(level, xp));
    }

    public addMoney(money: number) {
        const currentMoney = this.store.getState().gameInfo.money;

        this.store.dispatch(moneyUpdateAction(currentMoney + money));
    }

    public getLevel() {
        return this.store.getState().level.level;
    }

    public getMoney() {
        return this.store.getState().gameInfo.money;
    }

    public getRoundDiedAt() {
        return this.roundDiedAt;
    }

    public getStatus() {
        return this.status;
    }

    public onFinishGame(winner: Player) {
        this.events.removeAllListeners();
    }

    public setDeck(deck: CardDeck) {
        this.deck = deck;
    }

    public async enterPreparingPhase(startedAt: number, round: number) {
        this.currentRound = round;

        this.readyUpDeferred = pDefer();

        if (this.shopLocked === false) {
            this.rerollCards();
        }

        this.pieces.unlockEvolutions();

        this.onEnterPreparingPhase(startedAt, round);

        if (this.isAlive() === false) {
            return;
        }

        await this.readyUpDeferred.promise;
    }

    public reset() {
        this.match = null;
    }

    public enterReadyPhase(turnSimulator: TurnSimulator, opponentProvider: OpponentProvider, startedAt: number) {
        this.readyUpDeferred = null;
        this.ready = false;

        if (this.isAlive()) {
            this.fillBoard();

            this.pieces.lockEvolutions();

            const opponent = opponentProvider.getOpponent(this.id);

            this.battle = inProgressBattle(opponent.id);
            this.events.emit(PlayerEvent.UPDATE_BATTLE, this.battle);

            this.match = new Match(turnSimulator, this.turnCount, this.turnDuration, this, opponent);

            this.onEnterReadyPhase(startedAt);
        }
    }

    public async fightMatch(startedAt: number, battleTimeout: pDefer.DeferredPromise<void>): Promise<PlayerMatchResults> {
        this.onEnterPlayingPhase(startedAt);

        this.battleTimeout = battleTimeout;

        const finalMatchBoard = await this.match.fight(battleTimeout.promise);

        this.battleTimeout = null;

        const pieces = Object.values(finalMatchBoard.pieces);

        const surviving = {
            home: pieces.filter(p => p.currentHealth > 0 && p.ownerId === this.id),
            away: pieces.filter(p => p.currentHealth > 0 && p.ownerId !== this.id)
        };

        const homeScore = surviving.home.length;
        const awayScore = surviving.away.length;

        this.battle = finishedBattle(this.match.away.id, homeScore, awayScore);
        this.events.emit(PlayerEvent.UPDATE_BATTLE, this.battle);

        return {
            homePlayer: this,
            opponentName: this.match.away.name,
            homeScore,
            awayScore
        };
    }

    public onQuitGame(fn: (player: Player) => void) {
        this.events.on(PlayerEvent.QUIT_GAME, fn);
    }

    public onStartLobbyGame(fn: () => void) {
        this.events.on(PlayerEvent.START_LOBBY_GAME, fn);
    }

    public onHealthUpdate(fn: (health: number) => void) {
        this.events.on(PlayerEvent.UPDATE_HEALTH, fn);

        fn(this.health);
    }

    public onReadyUpdate(fn: (ready: boolean) => void) {
        this.events.on(PlayerEvent.UPDATE_READY, fn);

        fn(this.ready);
    }

    public onStreakUpdate(fn: (streak: StreakInfo) => void) {
        this.events.on(PlayerEvent.UPDATE_STREAK, fn);

        fn(this.streak);
    }

    public onBattleUpdate(fn: (battle: PlayerBattle) => void) {
        this.events.on(PlayerEvent.UPDATE_BATTLE, fn);

        fn(this.battle);
    }

    public onStatusUpdate(fn: (status: PlayerStatus) => void) {
        this.events.on(PlayerEvent.UPDATE_STATUS, fn);

        fn(this.status);
    }

    public isAlive() {
        return this.health > 0;
    }

    public rerollCards() {
        if (this.isAlive() === false) {
            return;
        }

        const cards = this.store.getState().cards;

        const newCards = this.deck.reroll(cards, this.getLevel(), 5);
        this.store.dispatch(cardsUpdated(newCards));
    }

    public adjustStreak(win: boolean) {
        const type = win ? StreakType.WIN : StreakType.LOSS;

        if (this.streak.type !== type) {
            this.streak.type = type;
            this.streak.amount = 0;
        }

        this.streak.amount++;

        this.events.emit(PlayerEvent.UPDATE_STREAK, this.streak);
    }

    public clearPieces() {
        const pieces = getAllPieces(this.store.getState());
        this.pieces.clear();
        for (const piece of pieces) {
            this.deck.addPiece(piece);
        }

        const cards = this.store.getState().cards;
        this.store.dispatch(cardsUpdated([]));
        this.deck.addCards(cards);

        this.deck.shuffle();
    }

    public subtractHealth(value: number) {
        const oldValue = this.health;

        let newValue = this.health - value;
        newValue = (newValue < 0) ? 0 : newValue;

        this.health = newValue;

        if (newValue === 0 && oldValue !== 0) {
            // player has just died
            this.roundDiedAt = this.currentRound;
        }

        this.events.emit(PlayerEvent.UPDATE_HEALTH, this.health);
    }

    public kill() {
        this.clearPieces();
        this.onDeath(Date.now());
    }

    public resurrect(startingHealth: number) {
        this.roundDiedAt = null;
        this.health = startingHealth;
        this.events.emit(PlayerEvent.UPDATE_HEALTH, this.health);
    }

    public getBoard() {
        return this.store.getState().board;
    }

    public getBench() {
        return this.store.getState().bench;
    }

    public getCards() {
        return this.store.getState().cards;
    }

    public getGameState() {
        const { board, bench, cards, gameInfo: { money }, level } = this.store.getState();

        return {
            board: board.pieces,
            bench,
            cards,
            money,
            level
        };
    }

    public abstract onPlayersResurrected(playerIds: string[]);

    public abstract onStartGame();

    public abstract onPlayerListUpdate(playerLists: PlayerListPlayer[]);

    public abstract onLobbyPlayerUpdate(index: number, player: LobbyPlayer);

    protected abstract onEnterPreparingPhase(startedAt: number, round: number);

    protected abstract onEnterReadyPhase(startedAt: number, );

    protected abstract onEnterPlayingPhase(startedAt: number, );

    protected abstract onDeath(phaseStartedAt: number, );

    protected abstract onShopLockUpdate();

    protected quitGame() {
        this.status = PlayerStatus.QUIT;

        // todo combine these
        this.events.emit(PlayerEvent.QUIT_GAME, this);
        this.events.emit(PlayerEvent.UPDATE_STATUS, this.status);

        if (this.readyUpDeferred) {
            this.readyUpDeferred.resolve();
        }
    }

    protected belowPieceLimit() {
        return getBoardPieceCount(this.store.getState()) < this.store.getState().level.level;
    }

    protected toggleShopLock = () => {
        this.shopLocked = !this.shopLocked;

        this.onShopLockUpdate();
    }

    protected sellPiece = (pieceId: string) => {
        // todo add `from` here to improve lookup
        const piece = getPiece(this.store.getState(), pieceId);

        if (piece === null) {
            log(`${this.name} attempted to sell piece with id ${pieceId} but did not own it`);
            return;
        }

        const piecesUsed = getPiecesForStage(piece.stage);
        const pieceCost = this.definitionProvider.get(piece.definitionId).cost;
        this.addMoney(pieceCost * piecesUsed);

        this.deck.addPiece(piece);
        this.deck.shuffle();

        this.pieces.removePiece(pieceId);
    }

    protected buyXp = () => {
        // todo put this all into a saga
        if (this.isAlive() === false) {
            log(`${this.name} attempted to buy xp, but they are dead`);
            return;
        }

        if (this.getLevel() === MAX_PLAYER_LEVEL) {
            log(`${this.name} attempted to buy xp, but they are at max level`);
            return;
        }

        const money = this.store.getState().gameInfo.money;

        // not enough money
        if (money < BUY_XP_COST) {
            log(`${this.name} attempted to buy xp costing $${BUY_XP_COST} but only had $${money}`);
            return;
        }

        this.addXp(BUY_XP_AMOUNT);

        this.store.dispatch(moneyUpdateAction(money - BUY_XP_COST));
    }

    protected buyReroll = () => {
        if (this.isAlive() === false) {
            log(`${this.name} attempted to reroll, but they are dead`);
            return;
        }

        const money = this.store.getState().gameInfo.money;

        // not enough money
        if (money < REROLL_COST) {
            log(`${this.name} attempted to reroll costing $${REROLL_COST} but only had $${money}`);
            return;
        }

        this.rerollCards();

        this.store.dispatch(moneyUpdateAction(money - REROLL_COST));
    }

    protected finishMatch = () => {
        if (this.match === null) {
            return;
        }

        this.match.onClientFinishMatch();
    }

    protected readyUp = () => {
        if (this.ready || this.readyUpDeferred === null) {
            return;
        }

        this.setReady(true);

        this.readyUpDeferred.resolve();
    }

    protected onDropPiece = ({ payload }: PlayerActions.PlayerDropPieceAction) => {
        if (!payload || !payload.pieceId || !payload.from || !payload.to) {
            // packet malformed
            return;
        }

        this.pieces.dispatchAction(
            PlayerActions.playerDropPiece(payload.pieceId, payload.from, payload.to)
        );
    }

    private setReady(ready: boolean) {
        this.ready = ready;
        this.events.emit(PlayerEvent.UPDATE_READY, this.ready);
    }

    private fillBoard() {
        while (true) {
            const state = this.store.getState();
            const belowPieceLimit = getPlayerBelowPieceLimit(state, this.id);

            if (!belowPieceLimit) {
                return;
            }

            const benchPiece = getMostExpensiveBenchPiece(state);

            if (!benchPiece) {
                return;
            }

            const destination = getPlayerFirstEmptyBoardSlot(state);

            if (!destination) {
                return;
            }

            const fromLocation: PlayerPieceLocation = {
                type: "bench",
                location: {
                    slot: benchPiece.position.x
                }
            };

            const toLocation: PlayerPieceLocation = {
                type: "board",
                location: {
                    x: destination.x,
                    y: destination.y
                }
            };

            this.store.dispatch(
                PlayerActions.playerDropPiece(benchPiece.id, fromLocation, toLocation)
            );
        }
    }
}

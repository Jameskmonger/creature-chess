import uuid = require("uuid/v4");
import { getDefinition, getRequiredQuantityToEvolve, getPieceCost } from "../models/creatureDefinition";
import { clonePiece, createPiece, createPieceFromCard } from "../piece-utils";
import { MovePiecePacket } from "../packet-opcodes";
import { TileType, createTileCoordinates } from "../position";
import { Match } from "../match/match";
import { log } from "../log";
import { CardDeck } from "../cardShop/cardDeck";
import { FeedMessage } from "../feed-message";
import { canDropPiece, boardReducer, BenchActions, benchReducer, BoardActions, getFirstEmptyBenchSlot } from "../board";
import { EventEmitter } from "events";
import { Observable } from "../observable/observable";
import { Store } from "../observable/store";
import { OpponentProvider } from "./opponentProvider";
import { Card } from "../models/card";
import { Piece } from "../models/piece";
import { GamePhase } from "../game-phase";
import { BUY_XP_COST, BUY_XP_AMOUNT, REROLL_COST, TURNS_IN_BATTLE } from "../constants";
import { getXpToNextLevel } from "../get-xp-for-level";
import { PlayerListPlayer } from "../models/player-list-player";
import { MatchRewarder } from "../match/matchRewarder";

export enum StreakType {
    WIN,
    LOSS
}

enum PlayerEvent {
    UPDATE_HEALTH = "UPDATE_HEALTH",
    SEND_CHAT_MESSAGE = "SEND_CHAT_MESSAGE",
    FINISH_MATCH = "FINISH_MATCH",
    UPDATE_READY = "UPDATE_READY"
}

export abstract class Player {
    public readonly id: string;
    public readonly name: string;
    public health: number = 100;
    public ready = false;
    public readonly streak = {
        type: StreakType.WIN,
        amount: 0
    };

    protected money = new Observable(3);
    protected cards = new Observable<Card[]>([]);
    protected board = new Store<Piece[], BoardActions.BoardAction>([], boardReducer);
    protected bench = new Store<Piece[], BenchActions.BenchPiecesAction>([], benchReducer);
    protected level = new Observable({ level: 1, xp: 0 });
    protected match: Match = null;

    private events = new EventEmitter();

    private deck: CardDeck;
    private gamePhase: GamePhase = GamePhase.WAITING;

    private readyUpPromise: Promise<void> = null;
    private resolveReadyUpPromise: () => void = null;

    constructor(name: string) {
        this.id = uuid();
        this.name = name;
    }

    public addXp(amount: number) {
        let { level, xp } = this.level.getValue();

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

        this.level.setValue({ level, xp });
    }

    public addMoney(money: number) {
        const currentMoney = this.money.getValue();

        this.money.setValue(currentMoney + money);
    }

    public onFinishGame() {
        this.events.removeAllListeners();
    }

    public setDeck(deck: CardDeck) {
        this.deck = deck;
    }

    public async enterPreparingPhase() {
        this.gamePhase = GamePhase.PREPARING;

        this.readyUpPromise = new Promise(resolve => {
            this.resolveReadyUpPromise = resolve;
        });

        this.rerollCards();

        this.onEnterPreparingPhase();

        if (this.isAlive() === false) {
            return;
        }

        await this.readyUpPromise;
    }

    public giveMatchRewards(matchRewarder: MatchRewarder) {
        if (!this.match) {
            return;
        }

        matchRewarder.giveRewards(this.match);

        this.match = null;
    }

    public enterReadyPhase(opponentProvider: OpponentProvider) {
        this.gamePhase = GamePhase.READY;
        this.readyUpPromise = null;
        this.resolveReadyUpPromise = null;
        this.ready = false;

        if (this.isAlive()) {
            const opponent = opponentProvider.getOpponent(this.id);

            this.match = new Match(this, opponent);

            this.onEnterReadyPhase();
        }
    }

    public async fightMatch(battleTimeout: Promise<void>) {
        this.gamePhase = GamePhase.PLAYING;

        this.onEnterPlayingPhase();

        const results = await this.match.fight(battleTimeout, TURNS_IN_BATTLE);

        const damage = results.away.length * 3;
        this.subtractHealth(damage);

        this.events.emit(PlayerEvent.FINISH_MATCH, {
            home: this.name,
            away: this.match.away.name,
            homeScore: results.home.length,
            awayScore: results.away.length
        });
    }

    public cloneBoard() {
        return this.board.getValue().map(p => clonePiece(p));
    }

    public onHealthUpdate(fn: (health: number) => void) {
        this.events.on(PlayerEvent.UPDATE_HEALTH, fn);

        fn(this.health);
    }

    public onReadyUpdate(fn: (ready: boolean) => void) {
        this.events.on(PlayerEvent.UPDATE_READY, fn);

        fn(this.ready);
    }

    public onSendChatMessage(fn: (message: string) => void) {
        this.events.on(PlayerEvent.SEND_CHAT_MESSAGE, fn);
    }

    public onFinishMatch(fn: (results: { home: string, away: string, homeScore: number, awayScore: number }) => void) {
        this.events.on(PlayerEvent.FINISH_MATCH, fn);
    }

    public isAlive() {
        return this.health > 0;
    }

    public rerollCards() {
        if (this.isAlive() === false) {
            return;
        }

        const cards = this.cards.getValue();

        this.deck.add(cards);
        this.deck.shuffle();

        const newCards = this.deck.take(5);
        this.cards.setValue(newCards);
    }

    public abstract onPlayerListUpdate(playeLists: PlayerListPlayer[]);

    public abstract onNewFeedMessage(message: FeedMessage);

    protected abstract onEnterPreparingPhase();

    protected abstract onEnterReadyPhase();

    protected abstract onEnterPlayingPhase();

    protected abstract onDeath();

    protected belowPieceLimit() {
        return this.board.getValue().length < this.level.getValue().level;
    }

    protected buyCard = (cardIndex: number) => {
        const slot = getFirstEmptyBenchSlot(this.bench.getValue());

        if (slot === null) {
            log(`${this.name} attempted to buy a card but has no empty slot`);
            return;
        }

        const card = this.getCardAtIndex(cardIndex);

        if (!card) {
            log(`${this.name} attempted to buy card at index ${cardIndex} but that card was ${card}`);
            return;
        }

        const money = this.money.getValue();

        if (money < card.cost) {
            log(`${this.name} attempted to buy card costing $${card.cost} but only had $${money}`);
            return;
        }

        this.money.setValue(money - card.cost);
        this.deleteCard(cardIndex);

        const piece = createPieceFromCard(this.id, card, slot);

        this.addPieceToBench(piece);
    }

    protected sellPiece = (pieceId: string) => {
        const piece = this.findPiece(pieceId);

        if (piece === null) {
            log(`${this.name} attempted to sell piece with id ${pieceId} but did not own it`);
            return;
        }

        const pieceCost = getPieceCost(piece.definitionId);
        this.addMoney(pieceCost);
        this.deck.addPiece(piece);
        this.deck.shuffle();

        this.bench.dispatch(BoardActions.sellPiece(pieceId));
        this.board.dispatch(BoardActions.sellPiece(pieceId));
    }

    protected buyXp = () => {
        if (this.isAlive() === false) {
            log(`${this.name} attempted to buy xp, but they are dead`);
            return;
        }

        const money = this.money.getValue();

        // not enough money
        if (money < BUY_XP_COST) {
            log(`${this.name} attempted to buy xp costing $${BUY_XP_COST} but only had $${money}`);
            return;
        }

        this.addXp(BUY_XP_AMOUNT);

        this.money.setValue(money - BUY_XP_COST);
    }

    protected buyReroll = () => {
        if (this.isAlive() === false) {
            log(`${this.name} attempted to reroll, but they are dead`);
            return;
        }

        const money = this.money.getValue();

        // not enough money
        if (money < REROLL_COST) {
            log(`${this.name} attempted to reroll costing $${REROLL_COST} but only had $${money}`);
            return;
        }

        this.rerollCards();

        this.money.setValue(money - REROLL_COST);
    }

    protected sendChatMessage = (message: string) => {
        this.events.emit(PlayerEvent.SEND_CHAT_MESSAGE, message);
    }

    protected finishMatch = () => {
        if (this.match === null) {
            return;
        }

        this.match.onClientFinishMatch();
    }

    protected readyUp = () => {
        if (this.ready) {
            return;
        }

        log(`${this.name} readied up`);

        this.setReady(true);

        this.resolveReadyUpPromise();
    }

    protected movePieceToBench = (packet: MovePiecePacket) => {
        const piece = this.findPiece(packet.id);

        if (piece === null) {
            log(`Could not find piece ID ${packet.id}`);
            return;
        }

        if (piece.position.x !== packet.from.x || piece.position.y !== packet.from.y) {
            log(`Position mismatch for piece ID ${packet.id}`);
            return;
        }

        const benchTilePieces = this.bench.getValue().filter(p => p.position.x === packet.to.x);
        const canDrop = canDropPiece(piece, packet.to, benchTilePieces, this.gamePhase, this.belowPieceLimit());

        if (canDrop === false) {
            log(`Could not drop piece`);
            return;
        }

        const action = BoardActions.pieceMoved(piece, packet.to, TileType.BENCH);

        this.bench.dispatch(action);
        this.board.dispatch(action);
    }

    protected movePieceToBoard = (packet: MovePiecePacket) => {
        const piece = this.findPiece(packet.id);

        if (piece === null) {
            log(`Could not find piece ID ${packet.id}`);
            return;
        }

        if (piece.position.x !== packet.from.x || piece.position.y !== packet.from.y) {
            log(`Position mismatch for piece ID ${packet.id}`);
            return;
        }

        const tilePieces = this.board.getValue().filter(p => p.position.x === packet.to.x && p.position.y === packet.to.y);
        const canDrop = canDropPiece(piece, packet.to, tilePieces, this.gamePhase, this.belowPieceLimit());

        if (canDrop === false) {
            log(`Could not drop piece`);
            return;
        }

        const action = BoardActions.pieceMoved(piece, packet.to, TileType.BOARD);

        this.bench.dispatch(action);
        this.board.dispatch(action);
    }

    protected getLevel() {
        return this.level.getValue().level;
    }

    private addPieceToBench(piece: Piece) {
        const action = BenchActions.benchPieceAdded(piece);

        this.bench.dispatch(action);

        this.checkForEvolutions(piece);
    }

    private checkForEvolutions(piece: Piece) {
        const { evolvedFormId } = getDefinition(piece.definitionId);

        if (!evolvedFormId) {
            return;
        }

        const board = this.board.getValue();
        const bench = this.bench.getValue();

        const benchOthers = bench.filter(p => p.definitionId !== piece.definitionId);
        const boardOthers = board.filter(p => p.definitionId !== piece.definitionId);

        const totalInstances = (bench.length - benchOthers.length) + (board.length - boardOthers.length);

        if (totalInstances < getRequiredQuantityToEvolve(piece.definitionId)) {
            return;
        }

        this.board.dispatch(BoardActions.piecesUpdated(boardOthers));
        this.bench.dispatch(BenchActions.benchPiecesUpdated(benchOthers));

        const slot = getFirstEmptyBenchSlot(benchOthers);

        const newPiece = createPiece(this.id, evolvedFormId, [slot, null], piece.id);
        this.addPieceToBench(newPiece);
    }

    private getCardAtIndex(index: number) {
        return this.cards.getValue()[index];
    }

    private deleteCard(indexToDelete: number) {
        const newValue = this.cards.getValue()
            .map((card, index) => index === indexToDelete ? null : card);

        this.cards.setValue(newValue);
    }

    private subtractHealth(value: number) {
        const oldValue = this.health;

        let newValue = this.health - value;
        newValue = (newValue < 0) ? 0 : newValue;

        this.health = newValue;

        if (newValue === 0 && oldValue !== 0) {
            // player has just died
            this.addCardsToDeck();
            this.addPiecesToDeck();
            this.onDeath();
        }

        this.events.emit(PlayerEvent.UPDATE_HEALTH, this.health);
    }

    private addPiecesToDeck() {
        const boardPieces = this.board.getValue();
        const benchPieces = this.board.getValue();

        boardPieces.forEach(p => this.deck.addPiece(p));
        benchPieces.forEach(p => this.deck.addPiece(p));

        this.board.dispatch(BoardActions.piecesUpdated([]));
        this.bench.dispatch(BenchActions.benchPiecesUpdated([]));

        this.deck.shuffle();
    }

    private addCardsToDeck() {
        const cards = this.cards.getValue();

        this.deck.add(cards);
        this.deck.shuffle();

        this.cards.setValue([]);
    }

    private findPiece(id: string) {
        return (
            this.board.getValue().find(p => p.id === id)
            || this.bench.getValue().find(p => p.id === id)
            || null
        );
    }

    private setReady(ready: boolean) {
        this.ready = ready;
        this.events.emit(PlayerEvent.UPDATE_READY, this.ready);
    }
}

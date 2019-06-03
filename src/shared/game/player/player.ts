import uuid = require("uuid/v4");
import { clonePiece, createPieceFromCard } from "../../piece-utils";
import { MovePiecePacket } from "../../packet-opcodes";
import { Match } from "../../match/match";
import { log } from "../../log";
import { CardDeck } from "../../cardShop/cardDeck";
import { FeedMessage } from "../../feed-message";
import { canDropPiece, getFirstEmptyBenchSlot } from "../../board";
import { EventEmitter } from "events";
import { Observable } from "../../observable/observable";
import { OpponentProvider } from "../opponentProvider";
import { Card } from "../../models/card";
import { GamePhase } from "../../game-phase";
import { BUY_XP_COST, BUY_XP_AMOUNT, REROLL_COST, DEFAULT_TURN_COUNT, DEFAULT_TURN_DURATION } from "../../constants";
import { getXpToNextLevel } from "../../get-xp-for-level";
import { PlayerListPlayer } from "../../models/player-list-player";
import { MatchRewarder } from "../../match/matchRewarder";
import { TurnSimulator } from "../../match/combat/turnSimulator";
import { DefinitionProvider } from "../definitionProvider";
import { PlayerBoard } from "./playerBoard";
import { StreakType } from "../../models/streakType";

enum PlayerEvent {
    UPDATE_HEALTH = "UPDATE_HEALTH",
    SEND_CHAT_MESSAGE = "SEND_CHAT_MESSAGE",
    FINISH_MATCH = "FINISH_MATCH",
    UPDATE_READY = "UPDATE_READY",
    UPDATE_STREAK = "UPDATE_STREAK"
}

interface StreakInfo {
    type: StreakType;
    amount: number;
}

export abstract class Player {
    public readonly id: string;
    public readonly name: string;
    public health: number = 100;
    public ready = false;
    public readonly streak: StreakInfo = {
        type: StreakType.WIN,
        amount: 0
    };

    protected money = new Observable(3);
    protected cards = new Observable<Card[]>([]);

    protected level = new Observable({ level: 1, xp: 0 });
    protected match: Match = null;
    protected definitionProvider: DefinitionProvider;

    private events = new EventEmitter();

    private deck: CardDeck;
    private gamePhase: GamePhase = GamePhase.WAITING;

    private readyUpPromise: Promise<void> = null;
    private resolveReadyUpPromise: () => void = null;

    private board = new PlayerBoard();
    private turnCount: number;
    private turnDuration: number;

    constructor(name: string) {
        this.id = uuid();
        this.name = name;
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

    public async enterPreparingPhase(round: number) {
        this.gamePhase = GamePhase.PREPARING;

        this.readyUpPromise = new Promise(resolve => {
            this.resolveReadyUpPromise = resolve;
        });

        this.rerollCards();

        this.onEnterPreparingPhase(round);

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

    public enterReadyPhase(turnSimulator: TurnSimulator, opponentProvider: OpponentProvider) {
        this.gamePhase = GamePhase.READY;
        this.readyUpPromise = null;
        this.resolveReadyUpPromise = null;
        this.ready = false;

        if (this.isAlive()) {
            const opponent = opponentProvider.getOpponent(this.id);

            this.match = new Match(turnSimulator, this.turnCount, this.turnDuration, this, opponent);

            this.onEnterReadyPhase();
        }
    }

    public async fightMatch(battleTimeout: Promise<void>) {
        this.gamePhase = GamePhase.PLAYING;

        this.onEnterPlayingPhase();

        const results = await this.match.fight(battleTimeout);

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
        return this.getBoard().map(p => clonePiece(this.definitionProvider, p));
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

        const newCards = this.deck.take(this.getLevel(), 5);
        this.cards.setValue(newCards);
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

    public abstract onPlayerListUpdate(playeLists: PlayerListPlayer[]);

    public abstract onNewFeedMessage(message: FeedMessage);

    protected abstract onEnterPreparingPhase(round: number);

    protected abstract onEnterReadyPhase();

    protected abstract onEnterPlayingPhase();

    protected abstract onDeath();

    protected getBoard() {
        return this.board.getBoard();
    }

    protected getBench() {
        return this.board.getBench();
    }

    protected belowPieceLimit() {
        return this.getBoard().length < this.level.getValue().level;
    }

    protected buyCard = (cardIndex: number) => {
        const slot = getFirstEmptyBenchSlot(this.getBench());

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

        const piece = createPieceFromCard(this.definitionProvider, this.id, card, slot);

        this.board.addBenchPiece(piece);
    }

    protected sellPiece = (pieceId: string) => {
        const piece = this.findPiece(pieceId);

        if (piece === null) {
            log(`${this.name} attempted to sell piece with id ${pieceId} but did not own it`);
            return;
        }

        const pieceCost = this.definitionProvider.get(piece.definitionId).cost;
        this.addMoney(pieceCost);
        this.deck.addPiece(piece);
        this.deck.shuffle();

        this.board.sellPiece(pieceId);
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
        if (!message) {
            return;
        }
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

        const benchTilePieces = this.getBench().filter(p => p.position.x === packet.to.x);
        const canDrop = canDropPiece(piece, packet.to, benchTilePieces, this.gamePhase, this.belowPieceLimit());

        if (canDrop === false) {
            log(`Could not drop piece`);
            return;
        }

        this.board.movePieceToBench(piece, packet.to);
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

        const tilePieces = this.getBoard().filter(p => p.position.x === packet.to.x && p.position.y === packet.to.y);
        const canDrop = canDropPiece(piece, packet.to, tilePieces, this.gamePhase, this.belowPieceLimit());

        if (canDrop === false) {
            log(`Could not drop piece`);
            return;
        }

        this.board.movePieceToBoard(piece, packet.to);
    }

    protected getLevel() {
        return this.level.getValue().level;
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
        this.getBoard().forEach(p => this.deck.addPiece(p));
        this.getBench().forEach(p => this.deck.addPiece(p));

        this.board.clear();

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
            this.getBoard().find(p => p.id === id)
            || this.getBench().find(p => p.id === id)
            || null
        );
    }

    private setReady(ready: boolean) {
        this.ready = ready;
        this.events.emit(PlayerEvent.UPDATE_READY, this.ready);
    }
}

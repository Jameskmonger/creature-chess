import uuid = require("uuid/v4");
import pDefer = require("p-defer");
import { Match } from "../../match/match";
import { log } from "../../log";
import { CardDeck } from "../../cardShop/cardDeck";
import { EventEmitter } from "events";
import { OpponentProvider } from "../opponentProvider";
import { BUY_XP_COST, BUY_XP_AMOUNT, REROLL_COST, STARTING_MONEY, STARTING_LEVEL } from "../../models/constants";
import { TurnSimulator } from "../../match/combat/turnSimulator";
import { DefinitionProvider } from "../definitionProvider";
import { LobbyPlayer, StreakType, PlayerListPlayer, Card, FeedMessage, GamePhase } from "@common/models";
import { getPiecesForStage, getXpToNextLevel, pieceUtils, Observable } from "@common/utils";
import { DropPiecePacket } from "@common/networking/client-to-server";
import { getBoardPieceCount, hasSpaceOnBench, getPiece, getAllPieces,  } from "../../player/pieceSelectors";
import { PlayerPieces } from "./playerPieces";
import { mergeBoards } from "@common/board/utils/mergeBoards";
import { PlayerBattle, inProgressBattle, finishedBattle } from "@common/models/player-list-player";

enum PlayerEvent {
    UPDATE_HEALTH = "UPDATE_HEALTH",
    SEND_CHAT_MESSAGE = "SEND_CHAT_MESSAGE",
    UPDATE_READY = "UPDATE_READY",
    UPDATE_STREAK = "UPDATE_STREAK",
    START_LOBBY_GAME = "START_LOBBY_GAME",
    UPDATE_BATTLE = "UPDATE_BATTLE"
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
    public health: number = 100;
    public ready = false;
    public readonly streak: StreakInfo = {
        type: StreakType.WIN,
        amount: 0
    };
    public battle: PlayerBattle = null;

    public abstract readonly isBot: boolean;

    protected money = new Observable(STARTING_MONEY);
    protected cards = new Observable<Card[]>([]);

    protected level = new Observable({ level: STARTING_LEVEL, xp: 0 });
    protected match: Match = null;
    protected definitionProvider: DefinitionProvider;
    protected shopLocked = false;
    protected pieces = new PlayerPieces();

    private events = new EventEmitter();

    private deck: CardDeck;
    private gamePhase: GamePhase = GamePhase.WAITING;

    private readyUpDeferred: pDefer.DeferredPromise<void>;

    private turnCount: number;
    private turnDuration: number;

    private currentRound: number | null = null;
    private roundDiedAt: number | null = null;

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

    public getMatch() {
        return this.match;
    }

    public getBattleBoard(away: Player) {
        return mergeBoards(this.pieces.getState().board.pieces, away.pieces.getState().board.pieces);
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

    public getMoney() {
        return this.money.getValue();
    }

    public getRoundDiedAt() {
        return this.roundDiedAt;
    }

    public onFinishGame(winner: Player) {
        this.events.removeAllListeners();
    }

    public setDeck(deck: CardDeck) {
        this.deck = deck;
    }

    public async enterPreparingPhase(round: number) {
        this.gamePhase = GamePhase.PREPARING;
        this.currentRound = round;

        this.readyUpDeferred = pDefer();

        if (this.shopLocked === false) {
            this.rerollCards();
        }

        this.pieces.unlockEvolutions();

        this.onEnterPreparingPhase(round);

        if (this.isAlive() === false) {
            return;
        }

        await this.readyUpDeferred.promise;
    }

    public reset() {
        this.match = null;
    }

    public enterReadyPhase(turnSimulator: TurnSimulator, opponentProvider: OpponentProvider) {
        this.gamePhase = GamePhase.READY;
        this.readyUpDeferred = null;
        this.ready = false;

        if (this.isAlive()) {
            this.pieces.lockEvolutions();

            const opponent = opponentProvider.getOpponent(this.id);

            this.battle = inProgressBattle(opponent.id);
            this.events.emit(PlayerEvent.UPDATE_BATTLE, this.battle);

            this.match = new Match(turnSimulator, this.turnCount, this.turnDuration, this, opponent);

            this.onEnterReadyPhase();
        }
    }

    public async fightMatch(battleTimeout: Promise<void>): Promise<PlayerMatchResults> {
        this.gamePhase = GamePhase.PLAYING;

        this.onEnterPlayingPhase();

        const finalMatchBoard = await this.match.fight(battleTimeout);

        const pieces = Object.values(finalMatchBoard.pieces);

        const surviving = {
            home: pieces.filter(p => p.currentHealth > 0 && p.ownerId === this.id),
            away: pieces.filter(p => p.currentHealth > 0 && p.ownerId !== this.id)
        };

        const homeScore = surviving.home.length;
        const awayScore = surviving.away.length;

        this.battle = finishedBattle(this.match.away.id, homeScore, awayScore);
        this.events.emit(PlayerEvent.UPDATE_BATTLE, this.battle);

        this.pieces.applyDamagePerTurn(pieces);

        return {
            homePlayer: this,
            opponentName: this.match.away.name,
            homeScore,
            awayScore
        };
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

    public onSendChatMessage(fn: (message: string) => void) {
        this.events.on(PlayerEvent.SEND_CHAT_MESSAGE, fn);
    }

    public isAlive() {
        return this.health > 0;
    }

    public rerollCards() {
        if (this.isAlive() === false) {
            return;
        }

        const cards = this.cards.getValue();

        const newCards = this.deck.reroll(cards, this.getLevel(), 5);
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

    public clearPieces() {
        const pieces = getAllPieces(this.pieces.getState());
        this.pieces.clear();
        for (const piece of pieces) {
            this.deck.addPiece(piece);
        }

        const cards = this.cards.getValue();
        this.cards.setValue([]);
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
        this.onDeath();
    }

    public resurrect(startingHealth: number) {
        this.roundDiedAt = null;
        this.health = startingHealth;
        this.events.emit(PlayerEvent.UPDATE_HEALTH, this.health);
    }

    public abstract onPlayersResurrected(playerIds: string[]);

    public abstract onStartGame(gameId: string);

    public abstract onPlayerListUpdate(playerLists: PlayerListPlayer[]);

    public abstract onNewFeedMessage(message: FeedMessage);

    public abstract onLobbyPlayerUpdate(index: number, player: LobbyPlayer);

    protected abstract onEnterPreparingPhase(round: number);

    protected abstract onEnterReadyPhase();

    protected abstract onEnterPlayingPhase();

    protected abstract onDeath();

    protected abstract onShopLockUpdate();

    protected belowPieceLimit() {
        return getBoardPieceCount(this.pieces.getState()) < this.level.getValue().level;
    }

    protected startLobbyGame = () => {
        this.events.emit(PlayerEvent.START_LOBBY_GAME);
    }

    protected toggleShopLock = () => {
        this.shopLocked = !this.shopLocked;

        this.onShopLockUpdate();
    }

    protected buyCard = (cardIndex: number) => {
        if (hasSpaceOnBench(this.pieces.getState()) === false) {
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

        const piece = pieceUtils.createPieceFromCard(this.definitionProvider, this.id, card, 0);

        this.pieces.addBenchPiece(piece);
    }

    protected sellPiece = (pieceId: string) => {
        // todo add `from` here to improve lookup
        const piece = getPiece(this.pieces.getState(), pieceId);

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
        if (this.ready || this.readyUpDeferred === null) {
            return;
        }

        this.setReady(true);

        this.readyUpDeferred.resolve();
    }

    protected onDropPiece = (packet: DropPiecePacket) => {
        if (!packet || !packet.pieceId || !packet.from || !packet.to) {
            // packet malformed
            return;
        }

        this.pieces.playerDropPiece(packet.pieceId, packet.from, packet.to);
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

    private setReady(ready: boolean) {
        this.ready = ready;
        this.events.emit(PlayerEvent.UPDATE_READY, this.ready);
    }
}

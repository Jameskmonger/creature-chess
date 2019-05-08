import uuid = require("uuid/v4");
import delay from "delay";
import { PokemonCard, PlayerListPlayer, GamePhase, Constants, getPokemonDefinition } from "../../shared";
import { PokemonPiece, clonePokemonPiece, createBenchPokemon } from "../../shared/pokemon-piece";
import { Connection } from "./connection";
import { MovePiecePacket, ClientToServerPacketOpcodes } from "../../shared/packet-opcodes";
import { TileCoordinates } from "../../shared/position";
import { Match } from "../match";
import { log } from "../log";
import { CardDeck } from "../cardDeck";

enum StreakType {
    WIN,
    LOSS
}

interface StreakDetails {
    type: StreakType;
    amount: number;
}

export class Player {
    public readonly id: string;
    public readonly name: string;
    private connection: Connection;
    private deck: CardDeck;

    private cards: PokemonCard[] = [];
    private board: PokemonPiece[] = [];
    private bench: PokemonPiece[] = [];
    private money: number = 3;
    private health: number = 100;
    private match: Match = null;
    private streak = {
        type: StreakType.WIN,
        amount: 0
    };
    private opponent?: Player = null;

    private onHealthUpdateListeners: ((health: number) => void)[] = [];

    constructor(connection: Connection, name: string, deck: CardDeck) {
        this.connection = connection;
        this.id = uuid();
        this.name = name;
        this.deck = deck;

        connection.setPlayer(this);

        connection.onReceivePacket(ClientToServerPacketOpcodes.PURCHASE_CARD, this.onPurchaseCard);
        connection.onReceivePacket(ClientToServerPacketOpcodes.SELL_PIECE, this.onSellPiece);
        connection.onReceivePacket(ClientToServerPacketOpcodes.REROLL_CARDS, this.onRerollCards);
        connection.onReceivePacket(ClientToServerPacketOpcodes.MOVE_PIECE_TO_BENCH, this.movePieceToBench);
        connection.onReceivePacket(ClientToServerPacketOpcodes.MOVE_PIECE_TO_BOARD, this.movePieceToBoard);

        connection.sendJoinedGameUpdate(this.id);

        this.sendCardsUpdate();
        this.sendBoardUpdate();
        this.sendBenchUpdate();
        this.sendMoneyUpdate();
    }

    public cloneBoard() {
        return this.board.map(p => clonePokemonPiece(p));
    }

    public onHealthUpdate(fn: (health: number) => void) {
        this.onHealthUpdateListeners.push(fn);
    }

    public isAlive() {
        return this.health > 0;
    }

    public sendPlayerListUpdate(players: Player[]) {
        const playerList: PlayerListPlayer[] = players.map(p => {
            return {
                id: p.id,
                name: p.name,
                health: p.health
            };
        });

        this.connection.sendPlayerListUpdate(playerList);
    }

    public sendPreparingPhaseUpdate() {
        this.match = null;

        this.connection.sendPreparingPhaseUpdate(this.board);
    }

    public async runPlayingPhase(seed: number) {
        this.connection.sendPlayingPhaseUpdate(seed);

        const [, results] = await Promise.all([
            delay(Constants.PHASE_LENGTHS[GamePhase.PLAYING] * 1000),
            this.match.fight(seed, Constants.TURNS_IN_BATTLE)
        ]);

        log(`results: ${this.name} ${results.survivingHomeTeam.length} v ${results.survivingAwayTeam.length} ${this.opponent.name}`);

        this.subtractHealth(results.survivingAwayTeam.length * 3);

        const win = results.survivingHomeTeam.length > results.survivingAwayTeam.length;

        log(`- Awarded a ${win ? "win" : "loss"} to ${this.name}`);

        const money = this.getMoneyForMatch(win);

        this.addMoney(money);
    }

    public sendReadyPhaseUpdate(opponent: Player) {
        this.opponent = opponent;

        this.match = new Match(this, opponent);

        this.connection.sendReadyPhaseUpdate(this.match.getBoard(), this.opponent.id);
    }

    public rerollCards() {
        const cards = this.cards;

        this.deck.add(cards);
        this.deck.shuffle();

        const newCards = this.deck.take(5);
        this.setCards(newCards);
    }

    private getNewStreakBonus(win: boolean) {
        const type = win ? StreakType.WIN : StreakType.LOSS;

        if (this.streak.type !== type) {
            this.streak.type = type;
            this.streak.amount = 0;
        }

        this.streak.amount++;

        if (this.streak.amount >= 9) {
            return 3;
        }

        if (this.streak.amount >= 6) {
            return 2;
        }

        if (this.streak.amount >= 3) {
            return 1;
        }

        return 0;
    }

    private getMoneyForMatch(win: boolean) {
        const base = 3;
        const winBonus = win ? 1 : 0;
        const streakBonus = this.getNewStreakBonus(win);

        const total = base + winBonus + streakBonus;

        log(`${this.name} just earned $${total} (base: ${base}, win bonus: ${winBonus}, (${this.streak.amount}) streak bonus: ${streakBonus})`);

        return total;
    }

    private addBenchPiece(piece: PokemonPiece) {
        this.bench.push(piece);

        this.sendBenchUpdate();
    }

    private ownsPiece = (pieceId: string) => {
        return this.board.concat(this.bench).some(p => p.id === pieceId);
    }

    private removePiece(pieceId: string) {
        const boardPiece = this.board.find(p => p.id === pieceId);
        const benchPiece = this.bench.find(p => p.id === pieceId);
        if (boardPiece) {
            this.board.splice(this.board.indexOf(boardPiece), 1);
            this.sendBoardUpdate();
            return boardPiece;
        }

        if (benchPiece) {
            this.bench.splice(this.bench.indexOf(benchPiece), 1);
            this.sendBenchUpdate();
            return benchPiece;
        }
    }

    private setMoney(money: number) {
        this.money = money;

        this.sendMoneyUpdate();
    }

    private getFirstEmptyBenchSlot() {
        for (let slot = 0; slot < Constants.GRID_SIZE; slot++) {
            const piece = this.bench.some(p => p.position.x === slot);

            if (!piece) {
                return slot;
            }
        }

        return null;
    }

    private setCards(cards: PokemonCard[], update: boolean = true) {
        this.cards = cards;

        if (update) {
            this.sendCardsUpdate();
        }
    }

    private getCardAtIndex(index: number) {
        return this.cards[index];
    }

    private deleteCard(index: number) {
        this.cards[index] = null;

        this.sendCardsUpdate();
    }

    private setBoard(board: PokemonPiece[]) {
        this.board = board;

        this.sendBoardUpdate();
    }

    private setBench(bench: PokemonPiece[]) {
        this.bench = bench;

        this.sendBenchUpdate();
    }

    private addMoney(money: number) {
        this.setMoney(this.money + money);
    }

    private sendDeathUpdate() {
        this.connection.sendDeadPhaseUpdate();
    }

    private sendCardsUpdate() {
        this.connection.sendCardsUpdate(this.cards);
    }

    private sendBoardUpdate() {
        // turn all local pieces to face away
        const turnedPieces = this.board.map(piece => ({
            ...piece,
            facingAway: true
        }));

        this.connection.sendBoardUpdate(turnedPieces);
    }

    private sendBenchUpdate() {
        this.connection.sendBenchUpdate(this.bench);
    }

    private sendMoneyUpdate() {
        this.connection.sendMoneyUpdate(this.money);
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
            this.sendDeathUpdate();
        }

        this.onHealthUpdateListeners.forEach(fn => fn(this.health));
    }

    private onPurchaseCard = (cardIndex: number) => {
        const slot = this.getFirstEmptyBenchSlot();
        const card = this.getCardAtIndex(cardIndex);

        if (slot === null) {
            log(`${this.name} attempted to buy a card but has no empty slot`);
            return;
        }

        if (!card) {
            log(`${this.name} attempted to buy card at index ${cardIndex} but that card was ${card}`);
            return;
        }

        const money = this.money;

        if (money < card.cost) {
            log(`${this.name} attempted to buy card costing $${card.cost} but only had $${this}`);
            return;
        }

        this.setMoney(money - card.cost);
        this.deleteCard(cardIndex);

        const piece = createBenchPokemon(this.id, card.id, slot);

        this.addBenchPiece(piece);
    }

    private onSellPiece = (pieceId: string) => {
        if (!this.ownsPiece(pieceId)) {
            log(`${this.name} attempted to sell piece with id ${pieceId} but did not own it`);
            return;
        }

        const piece = this.removePiece(pieceId);
        // When pieces are combined, non-basic pieces do not currently have a cost, so use  placeholder value of $6
        const pieceCost = getPokemonDefinition(piece.pokemonId).cost || 6;
        this.addMoney(pieceCost);
    }

    private onRerollCards = () => {
        if (this.isAlive() === false) {
            log(`${this.name} attempted to reroll, but they are dead`);
            return;
        }

        const money = this.money;

        // not enough money
        if (money < Constants.REROLL_COST) {
            log(`${this.name} attempted to reroll costing $${Constants.REROLL_COST} but only had $${money}`);
            return;
        }

        this.rerollCards();

        this.setMoney(money - Constants.REROLL_COST);
    }

    private movePieceToBench = (packet: MovePiecePacket) => {
        const piece = this.popPieceIfExists(packet.id, packet.from);

        if (piece === null) {
            log(`Could not find piece ID ${packet.id}`);
            return;
        }

        piece.position = packet.to;
        this.bench.push(piece);
    }

    private movePieceToBoard = (packet: MovePiecePacket) => {
        const piece = this.popPieceIfExists(packet.id, packet.from);

        if (piece === null) {
            log(`Could not find piece ID ${packet.id}`);
            return;
        }

        piece.position = packet.to;
        this.board.push(piece);
    }

    private addPiecesToDeck() {
        const board = this.board;
        const bench = this.bench;

        this.setBoard([]);
        this.setBench([]);

        board.forEach(p => this.deck.addPiece(p));
        bench.forEach(p => this.deck.addPiece(p));

        this.deck.shuffle();
    }

    private addCardsToDeck() {
        const cards = this.cards;

        this.deck.add(cards);
        this.deck.shuffle();

        this.setCards([]);
    }

    private popPieceIfExists(id: string, { x, y }: TileCoordinates) {
        const fromBench = y === null;
        const origin = fromBench ? this.bench : this.board;

        const index = origin.findIndex(p =>
            p.id === id
            && p.position.x === x
            && p.position.y === y);

        if (index === -1) {
            return null;
        }

        const piece = origin[index];

        origin.splice(index, 1);

        return piece;
    }
}

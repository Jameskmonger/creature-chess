import uuid = require("uuid/v4");
import { PokemonCard, PlayerListPlayer, GamePhase, Constants, getPokemonDefinition, getXpToNextLevel, getRequiredQuantityToEvolve } from "@common";
import { PokemonPiece, clonePokemonPiece, createBenchPokemon } from "@common/pokemon-piece";
import { MovePiecePacket, ClientToServerPacketOpcodes } from "@common/packet-opcodes";
import { TileCoordinates, TileType, createTileCoordinates } from "@common/position";
import { Match } from "../match";
import { log } from "../log";
import { CardDeck } from "../cardDeck";
import { FeedMessage } from "@common/feed-message";
import { canDropPiece, boardReducer, BenchActions, benchReducer, BoardActions } from "@common/board";
import { EventEmitter } from "events";
import { PokemonDefinition } from "../../shared/pokemon-stats";
import { Observable } from "../observable/observable";
import { ObservableWithReducer } from "../observable/observableWithReducer";
import { OpponentProvider } from "./opponentProvider";

enum StreakType {
    WIN,
    LOSS
}

enum PlayerEvent {
    UPDATE_HEALTH = "UPDATE_HEALTH",
    SEND_CHAT_MESSAGE = "SEND_CHAT_MESSAGE"
}

export abstract class Player {
    public readonly id: string;
    public readonly name: string;
    public health: number = 100;

    protected money = new Observable(3);
    protected cards = new Observable<PokemonCard[]>([]);
    protected board = new ObservableWithReducer<PokemonPiece[], BoardActions.BoardAction>([], boardReducer);
    protected bench = new ObservableWithReducer<PokemonPiece[], BenchActions.BenchPiecesAction>([], benchReducer);
    protected level: number = 1;
    protected gamePhaseObservable: Observable<GamePhase>;
    protected match: Match = null;

    private opponentProvider: OpponentProvider;

    private events = new EventEmitter();

    private deck: CardDeck;
    private streak = {
        type: StreakType.WIN,
        amount: 0
    };
    private xp: number = 0;

    constructor(gamePhaseObservable: Observable<GamePhase>, opponentProvider: OpponentProvider, name: string, deck: CardDeck) {
        this.id = uuid();
        this.gamePhaseObservable = gamePhaseObservable;
        this.opponentProvider = opponentProvider;
        this.name = name;
        this.deck = deck;

        this.gamePhaseObservable.onChange(newValue => {
            if (this.isAlive() === false) {
                return;
            }

            if (newValue === GamePhase.PREPARING) {
                this.takeNewCardsFromDeck();
            } else if (newValue === GamePhase.READY) {
                const opponent = this.opponentProvider.getOpponent(this.id);

                this.match = new Match(this, opponent);
            }
        });
    }

    public cloneBoard() {
        return this.board.getValue().map(p => clonePokemonPiece(p));
    }

    public onHealthUpdate(fn: (health: number) => void) {
        this.events.on(PlayerEvent.UPDATE_HEALTH, fn);
    }

    public onSendChatMessage(fn: (message: string) => void) {
        this.events.on(PlayerEvent.SEND_CHAT_MESSAGE, fn);
    }

    public isAlive() {
        return this.health > 0;
    }

    public async fightMatch(battleTimeout: Promise<void>) {
        const maxTurns = Constants.TURNS_IN_BATTLE;

        const results = await this.match.fight(battleTimeout, maxTurns);

        log(`results: ${this.name} ${results.survivingHomeTeam.length} v ${results.survivingAwayTeam.length} ${this.match.away.name}`);

        const damage = results.survivingAwayTeam.length * 3;
        this.subtractHealth(damage);

        const win = results.survivingHomeTeam.length > results.survivingAwayTeam.length;

        log(`- Awarded a ${win ? "win" : "loss"} to ${this.name}`);

        const money = this.getMoneyForMatch(win);

        this.addMoney(money);

        this.addXp(1);

        return { player: this, opponent: this.match.away, win, damage };
    }

    public takeNewCardsFromDeck() {
        const cards = this.cards.getValue();

        this.deck.add(cards);
        this.deck.shuffle();

        const newCards = this.deck.take(5);
        this.cards.setValue(newCards);
    }

    public abstract onPlayerListUpdate(players: Player[]);

    public abstract onNewFeedMessage(message: FeedMessage);

    protected abstract onLevelUpdate(level: number, xp: number);

    protected abstract onDeath();

    protected belowPieceLimit() {
        return this.board.getValue().length < this.level;
    }

    protected purchaseCard = (cardIndex: number) => {
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

        const money = this.money.getValue();

        if (money < card.cost) {
            log(`${this.name} attempted to buy card costing $${card.cost} but only had $${money}`);
            return;
        }

        this.money.setValue(money - card.cost);
        this.deleteCard(cardIndex);

        const pieceDefinition = getPokemonDefinition(card.id);
        const definitionIdToAdd = this.handleEvolution(pieceDefinition);

        const piece = createBenchPokemon(this.id, definitionIdToAdd, slot);

        this.bench.dispatch(BoardActions.pieceMoved(piece, createTileCoordinates(slot, null), TileType.BENCH));
    }

    protected sellPiece = (pieceId: string) => {
        const piece = this.findPiece(pieceId);

        if (piece === null) {
            log(`${this.name} attempted to sell piece with id ${pieceId} but did not own it`);
            return;
        }

        // When pieces are combined, non-basic pieces do not currently have a cost, so use  placeholder value of $6
        const pieceCost = getPokemonDefinition(piece.pokemonId).cost || 6;
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
        if (money < Constants.BUY_XP_COST) {
            log(`${this.name} attempted to buy xp costing $${Constants.BUY_XP_COST} but only had $${money}`);
            return;
        }

        this.addXp(Constants.BUY_XP_AMOUNT);

        this.money.setValue(money - Constants.BUY_XP_COST);
    }

    protected rerollCards = () => {
        if (this.isAlive() === false) {
            log(`${this.name} attempted to reroll, but they are dead`);
            return;
        }

        const money = this.money.getValue();

        // not enough money
        if (money < Constants.REROLL_COST) {
            log(`${this.name} attempted to reroll costing $${Constants.REROLL_COST} but only had $${money}`);
            return;
        }

        this.takeNewCardsFromDeck();

        this.money.setValue(money - Constants.REROLL_COST);
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
        const canDrop = canDropPiece(piece, packet.to, benchTilePieces, this.gamePhaseObservable.getValue(), this.belowPieceLimit());

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
        const canDrop = canDropPiece(piece, packet.to, tilePieces, this.gamePhaseObservable.getValue(), this.belowPieceLimit());

        if (canDrop === false) {
            log(`Could not drop piece`);
            return;
        }

        const action = BoardActions.pieceMoved(piece, packet.to, TileType.BOARD);

        this.bench.dispatch(action);
        this.board.dispatch(action);
    }

    private handleEvolution = (pieceDefinition: PokemonDefinition) => {
        const instancesOfPieceOwnedOnBench = this.bench.getValue().filter(p => p.pokemonId === pieceDefinition.id);
        const instancesOfPieceOwnedOnBoard = this.board.getValue().filter(p => p.pokemonId === pieceDefinition.id);
        const instancesOfPieceOwned = instancesOfPieceOwnedOnBench.concat(instancesOfPieceOwnedOnBoard);
        const shouldEvolve = !!pieceDefinition.evolvedFormId && instancesOfPieceOwned.length + 1 >= getRequiredQuantityToEvolve(pieceDefinition.id);

        if (shouldEvolve) {
            instancesOfPieceOwned.forEach(p => {
                this.bench.dispatch(BoardActions.sellPiece(p.id));
                this.board.dispatch(BoardActions.sellPiece(p.id));
            });

            return this.handleEvolution(getPokemonDefinition(pieceDefinition.evolvedFormId));
        }

        return pieceDefinition.id;
    }

    private addXp(amount: number) {
        for (let i = 0; i < amount; i++) {
            const toNextLevel = getXpToNextLevel(this.level);
            const newXp = this.xp + 1;

            if (newXp === toNextLevel) {
                this.xp = 0;
                this.level++;
            } else {
                this.xp = newXp;
            }
        }

        this.onLevelUpdate(this.level, this.xp);
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

    private getFirstEmptyBenchSlot() {
        for (let slot = 0; slot < Constants.GRID_SIZE; slot++) {
            const piece = this.bench.getValue().some(p => p.position.x === slot);

            if (!piece) {
                return slot;
            }
        }

        return null;
    }

    private getCardAtIndex(index: number) {
        return this.cards.getValue()[index];
    }

    private addMoney(money: number) {
        const currentMoney = this.money.getValue();

        this.money.setValue(currentMoney + money);
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

        this.board.setValue([]);
        this.bench.setValue([]);

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
}

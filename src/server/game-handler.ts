import delay from "delay";
import { Player } from "./player";
import { CardDeck } from "./cardDeck";
import { createBenchPokemon } from "../shared/pokemon-piece";
import { Connection } from "./connection";
import { ClientToServerPacketOpcodes, MovePiecePacket } from "../shared/packet-opcodes";
import { GamePhase, getAllDefinitions, Constants } from "../shared";
import { SeedProvider } from "./seed-provider";
import { log } from "./log";

const randomFromArray = <T>(array: T[]) => {
    return array[Math.floor(Math.random() * array.length)];
};

export class GameHandler {
    private deck = new CardDeck(getAllDefinitions());
    private players: Player[] = [];
    private state = GamePhase.WAITING;
    private seedProvider = new SeedProvider();
    private GAME_SIZE: number;

    constructor(gameSize: number) {
        this.GAME_SIZE = gameSize;
    }

    public registerConnection(connection: Connection) {
        connection.onReceivePacket(ClientToServerPacketOpcodes.JOIN_GAME, (name: string) => {
            this.onJoinGame(connection, name);
        });
    }

    private onJoinGame(connection: Connection, name: string) {
        if (this.state !== GamePhase.WAITING || this.players.length === this.GAME_SIZE) {
            // can't join game
            return;
        }

        this.acceptConnection(connection, name);
    }

    private acceptConnection(connection: Connection, name: string) {
        log(`${name} has joined the game`);

        const player = new Player(connection, name);
        player.setCards(this.deck.take(5));
        player.setMoney(50);

        connection.onReceivePacket(ClientToServerPacketOpcodes.PURCHASE_CARD, (cardIndex: number) => {
            log(`[${player.name}] PURCHASE_CARD (${cardIndex})`);

            this.onPlayerPurchaseCard(player, cardIndex);
        });

        connection.onReceivePacket(ClientToServerPacketOpcodes.REROLL_CARDS, () => {
            log(`[${player.name}] REROLL_CARDS`);

            this.onPlayerRerollCards(player);
        });

        connection.onReceivePacket(ClientToServerPacketOpcodes.MOVE_PIECE_TO_BENCH, (packet: MovePiecePacket) => {
            log(`[${player.name}] MOVE_PIECE_TO_BENCH`);

            player.movePieceToBench(packet);
        });

        connection.onReceivePacket(ClientToServerPacketOpcodes.MOVE_PIECE_TO_BOARD, (packet: MovePiecePacket) => {
            log(`[${player.name}] MOVE_PIECE_TO_BOARD`);

            player.movePieceToBoard(packet);
        });

        this.players.push(player);

        this.updatePlayerLists();

        player.sendJoinedGame();
        player.sendCardsUpdate();
        player.sendBoardUpdate();
        player.sendBenchUpdate();
        player.sendMoneyUpdate();

        if (this.players.length === this.GAME_SIZE) {
            this.startGame();
        }
    }

    private async startGame() {
        while (this.players.filter(p => p.getHealth() > 0).length > 1) {
            this.startPreparingPhase();

            await delay(Constants.STATE_LENGTHS[GamePhase.PREPARING] * 1000);

            this.startReadyPhase();

            await delay(Constants.STATE_LENGTHS[GamePhase.READY] * 1000);

            this.startPlayingPhase();
        }

    }

    private startPreparingPhase() {
        this.players.forEach(p => p.sendPlayerListUpdate(this.players));

        log(`Entering phase ${GamePhase.PREPARING}`);

        this.state = GamePhase.PREPARING;

        this.players.forEach(p => p.sendPreparingPhaseUpdate());
    }

    private startReadyPhase() {
        log(`Entering phase ${GamePhase.READY}`);

        this.state = GamePhase.READY;

        this.players.forEach(p => {
            const others = this.players.filter(other => other.id !== p.id);
            const opponent = randomFromArray(others);

            p.sendReadyPhaseUpdate(opponent);
        });
    }

    private async startPlayingPhase() {
        this.state = GamePhase.PLAYING;

        const newSeed = this.seedProvider.refreshSeed();

        log(`Entering phase ${GamePhase.PLAYING} (with seed ${newSeed})`);

        const promises = this.players.map(p =>
            p.sendPlayingPhaseUpdate(newSeed)
                .then(() => this.updatePlayerLists())
        );

        await Promise.all([
            delay(20_000),
            Promise.all(promises)
        ]);
    }

    private updatePlayerLists() {
        this.players.forEach(p => p.sendPlayerListUpdate(this.players));
    }

    private onPlayerPurchaseCard(player: Player, cardIndex: number) {
        const slot = player.getFirstEmptyBenchSlot();
        const card = player.getCardAtIndex(cardIndex);
        const money = player.getMoney();

        if (slot === null) {
            log(`${player.name} attempted to buy a card but has no empty slot`);
            return;
        }

        if (!card) {
            log(`${player.name} attempted to buy card at index ${cardIndex} but that card was ${card}`);
            return;
        }

        if (money < card.cost) {
            log(`${player.name} attempted to buy card costing $${card.cost} but only had $${money}`);
            return;
        }

        player.setMoney(money - card.cost);
        player.deleteCard(cardIndex);

        player.sendCardsUpdate();
        player.sendMoneyUpdate();

        const piece = createBenchPokemon(player.id, card.id, slot);

        player.addBenchPiece(piece);

        player.sendBenchUpdate();
    }

    private onPlayerRerollCards(player: Player) {
        const money = player.getMoney();

        // not enough money
        if (money < Constants.REROLL_COST) {
            log(`${player.name} attempted to reroll costing $${Constants.REROLL_COST} but only had $${money}`);
            return;
        }

        // prevent any race conditions
        const playerCards = player.getCards();
        player.setCards([]);

        this.deck.add(playerCards);
        this.deck.shuffle();

        const newCards = this.deck.take(5);
        player.setCards(newCards);

        player.setMoney(money - Constants.REROLL_COST);

        player.sendMoneyUpdate();
        player.sendCardsUpdate();
    }
}

import delay from "delay";
import { Player } from "./player";
import { CardDeck } from "./cardDeck";
import { createBenchPokemon } from "../shared/pokemon-piece";
import { createRandomOpponentBoard } from "./opponents/random-opponent";
import { Connection } from "./connection";
import { ClientToServerPacketOpcodes, MovePiecePacket } from "../shared/packet-opcodes";
import { GameState, getAllDefinitions, Constants } from "../shared";
import { SeedProvider } from "./seed-provider";

const randomFromArray = <T>(array: T[]) => {
    return array[Math.floor(Math.random() * array.length)];
};

export class GameHandler {
    private deck = new CardDeck(getAllDefinitions());
    private players: Player[] = [];
    private state = GameState.WAITING;
    private seedProvider = new SeedProvider();

    public registerConnection(connection: Connection) {
        connection.onReceivePacket(ClientToServerPacketOpcodes.JOIN_GAME, (name: string) => {
            this.onJoinGame(connection, name);
        });
    }

    private onJoinGame(connection: Connection, name: string) {
        if (this.state !== GameState.WAITING || this.players.length === Constants.MAX_PLAYER_COUNT) {
            // can't join game
            return;
        }

        this.acceptConnection(connection, name);
    }

    private acceptConnection(connection: Connection, name: string) {
        console.log(`${name} has joined the game`);

        const opponent = new Player(null, "Opponent");
        opponent.setCards(this.deck.take(5));
        opponent.setBoard(createRandomOpponentBoard(opponent.id));

        const player = new Player(connection, name);
        player.setCards(this.deck.take(5));
        player.setMoney(50);

        connection.onReceivePacket(ClientToServerPacketOpcodes.PURCHASE_CARD, (cardIndex: number) => {
            console.log(`[${player.name}] PURCHASE_CARD (${cardIndex})`);

            this.onPlayerPurchaseCard(player, cardIndex);
        });

        connection.onReceivePacket(ClientToServerPacketOpcodes.REROLL_CARDS, () => {
            console.log(`[${player.name}] REROLL_CARDS`);

            this.onPlayerRerollCards(player);
        });

        connection.onReceivePacket(ClientToServerPacketOpcodes.MOVE_PIECE_TO_BENCH, (packet: MovePiecePacket) => {
            console.log(`[${player.name}] MOVE_PIECE_TO_BENCH`);

            player.movePieceToBench(packet);
        });

        connection.onReceivePacket(ClientToServerPacketOpcodes.MOVE_PIECE_TO_BOARD, (packet: MovePiecePacket) => {
            console.log(`[${player.name}] MOVE_PIECE_TO_BOARD`);

            player.movePieceToBoard(packet);
        });

        this.players.push(opponent);
        this.players.push(player);

        player.sendJoinedGame();
        player.sendPlayerListUpdate(this.players);
        player.sendCardsUpdate();
        player.sendBoardUpdate();
        player.sendBenchUpdate();
        player.sendMoneyUpdate();

        if (this.players.length === Constants.MAX_PLAYER_COUNT) {
            this.startGame();
        }
    }

    private async startGame() {
        this.startPreparingPhase();

        await delay(Constants.STATE_LENGTHS[GameState.PREPARING] * 1000);

        this.startReadyPhase();

        await delay(Constants.STATE_LENGTHS[GameState.READY] * 1000);

        this.startPlayingPhase();
    }

    private startPreparingPhase() {
        console.log(`Entering phase ${GameState.PREPARING}`);

        this.state = GameState.PREPARING;

        this.players.forEach(p => p.sendPreparingPhaseUpdate());
    }

    private startReadyPhase() {
        console.log(`Entering phase ${GameState.READY}`);

        this.state = GameState.READY;

        this.players.forEach(p => {
            const others = this.players.filter(other => other.id !== p.id);
            const opponent = randomFromArray(others);

            p.sendReadyPhaseUpdate(opponent);
        });
    }

    private startPlayingPhase() {
        this.state = GameState.PLAYING;

        const newSeed = this.seedProvider.refreshSeed();

        console.log(`Entering phase ${GameState.PLAYING} (with seed ${newSeed})`);

        this.players.forEach(p => p.sendPlayingPhaseUpdate(newSeed));
    }

    private onPlayerPurchaseCard(player: Player, cardIndex: number) {
        const slot = player.getFirstEmptyBenchSlot();
        const card = player.getCardAtIndex(cardIndex);
        const money = player.getMoney();

        if (slot === null) {
            console.log(`${player.name} attempted to buy a card but has no empty slot`);
            return;
        }

        if (!card) {
            console.log(`${player.name} attempted to buy card at index ${cardIndex} but that card was ${card}`);
            return;
        }

        if (money < card.cost) {
            console.log(`${player.name} attempted to buy card costing $${card.cost} but only had $${money}`);
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
            console.log(`${player.name} attempted to reroll costing $${Constants.REROLL_COST} but only had $${money}`);
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

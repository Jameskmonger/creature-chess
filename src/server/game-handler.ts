import delay from "delay";
import { Player } from "./player";
import { CardDeck } from "./cardDeck";
import { createPokemon, PokemonPiece, createBenchPokemon } from "../shared/pokemon-piece";
import { createRandomOpponentBoard } from "./opponents/random-opponent";
import { Connection } from "./connection";
import { ClientToServerPacketOpcodes } from "../shared/packet-opcodes";
import { GameState, getAllDefinitions, Constants } from "../shared";
import { SeedProvider } from "./seed-provider";
import uuid = require("uuid");

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
        player.setBoard([
            createPokemon(player.id, 129, [1, 6]),
            createPokemon(player.id, 129, [2, 6]),
            createPokemon(player.id, 129, [4, 4]),
            createPokemon(player.id, 70, [7, 6]),
            createPokemon(player.id, 67, [3, 4]),
            createPokemon(player.id, 89, [5, 4])
        ]);
        player.setBench([
            createBenchPokemon(player.id, 9, 2),
            createBenchPokemon(player.id, 70, 5),
            createBenchPokemon(player.id, 67, 6),
        ]);

        player.setOpponent(opponent);
        opponent.setOpponent(player);

        connection.onReceivePacket(ClientToServerPacketOpcodes.PURCHASE_CARD, (cardIndex: number) => {
            console.log(`[${player.name}] PURCHASE_CARD (${cardIndex})`);

            this.onPlayerPurchaseCard(player, cardIndex);
        });

        connection.onReceivePacket(ClientToServerPacketOpcodes.REROLL_CARDS, () => {
            console.log(`[${player.name}] REROLL_CARDS`);

            this.onPlayerRerollCards(player);
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
        this.updateState(GameState.PREPARING);

        await delay(Constants.STATE_LENGTHS[GameState.PREPARING] * 1000);

        this.updateState(GameState.READY);

        await delay(Constants.STATE_LENGTHS[GameState.READY] * 1000);

        this.updateState(GameState.PLAYING);
    }

    private sendStateUpdate(seed?: number) {
        this.players.forEach(p => p.sendStateUpdate(this.state, seed));
    }

    private updateState(state: GameState) {
        this.state = state;

        if (this.state !== GameState.PLAYING) {
            console.log(`Entering state ${GameState[state]}`);
            this.sendStateUpdate();
            return;
        }

        const newSeed = this.seedProvider.refreshSeed();
        console.log(`Entering state ${GameState[state]} (with seed ${newSeed})`);
        this.sendStateUpdate(newSeed);
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

import { Player } from "./player";
import { CardDeck } from "./cardDeck";
import { createPokemon } from "../shared/pokemon-piece";
import { createRandomOpponentBoard } from "./opponents/random-opponent";
import { Connection } from "./connection";
import { ClientToServerPacketOpcodes } from "../shared/packet-opcodes";
import { GameState } from "../shared";
import { SeedProvider } from "./seed-provider";

const MAX_PLAYER_COUNT = 2;
const STATE_LENGTHS = {
    [GameState.PREPARING]: 5_000,
    [GameState.READY]: 1_000
};

export class GameHandler {
    private deck = new CardDeck();
    private players: Player[] = [];
    private state = GameState.WAITING;
    private seedProvider = new SeedProvider();

    public registerConnection(connection: Connection) {
        connection.onReceivePacket(ClientToServerPacketOpcodes.JOIN_GAME, (name: string) => {
            this.onJoinGame(connection, name);
        });
    }

    private onJoinGame(connection: Connection, name: string) {
        if (this.state !== GameState.WAITING || this.players.length === MAX_PLAYER_COUNT) {
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
            createPokemon(player.id, 89, [5, 4]),

            createPokemon(player.id, 9, [2, 8], true),
            createPokemon(player.id, 70, [5, 8], true),
            createPokemon(player.id, 67, [6, 8], true)
        ]);
        player.setOpponent(opponent);

        connection.onReceivePacket(ClientToServerPacketOpcodes.PURCHASE_CARD, (cardIndex: number) => {
            this.onPlayerPurchaseCard(player, cardIndex);
        });

        connection.onReceivePacket(ClientToServerPacketOpcodes.REFRESH_CARDS, () => {
            this.onPlayerRefreshCards(player);
        });

        this.players.push(opponent);
        this.players.push(player);

        player.sendJoinedGame();
        player.sendPlayerListUpdate(this.players);
        player.sendCardsUpdate();
        player.sendBoardUpdate();

        if (this.players.length === MAX_PLAYER_COUNT) {
            this.startGame();
        }
    }

    private startGame() {
        this.updateState(GameState.PREPARING);

        setTimeout(() => {
            this.updateState(GameState.READY);

            setTimeout(() => {
                this.updateState(GameState.PLAYING);
            }, STATE_LENGTHS[GameState.READY]);
        }, STATE_LENGTHS[GameState.PREPARING]);
    }

    private sendStateUpdate(data?: null | ({ seed: number })) {
        this.players.forEach(p => p.sendStateUpdate(this.state, data));
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
        this.sendStateUpdate({ seed: newSeed });
    }

    private onPlayerPurchaseCard(player: Player, cardIndex: number) {
        player.deleteCard(cardIndex);
    }

    private onPlayerRefreshCards(player: Player) {
        // prevent any race conditions
        const playerCards = player.getCards();
        player.setCards([]);

        this.deck.add(playerCards);
        this.deck.shuffle();

        const newCards = this.deck.take(5);
        player.setCards(newCards);

        player.sendCardsUpdate();
    }
}

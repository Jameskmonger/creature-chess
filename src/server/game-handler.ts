import { Player } from "./player";
import { CardDeck } from "./cardDeck";
import { makeEnemy, makeFriendly } from "../shared/pokemon-piece";
import { createRandomOpponentBoard } from "./opponents/random-opponent";
import { Connection } from "./connection";
import { ClientToServerPacketOpcodes } from "../shared/packet-opcodes";

export class GameHandler {
    private deck = new CardDeck();
    private players: any[] = [];

    public registerConnection(connection: Connection) {
        connection.onReceivePacket(ClientToServerPacketOpcodes.JOIN_GAME, (name: string) => {
            this.onJoinGame(connection, name);
        });
    }

    private onJoinGame(connection: Connection, name: string) {
        if (this.players.length >= 1) {
            // can't join game
            return;
        }

        this.acceptConnection(connection, name);
    }

    private acceptConnection(connection: Connection, name: string) {
        console.log(`${name} has joined the game`);

        const opponent = new Player(null, "Opponent");
        opponent.setCards(this.deck.take(5));
        opponent.setBoard(createRandomOpponentBoard());

        const player = new Player(connection, name);
        player.setCards(this.deck.take(5));
        player.setBoard([
            makeFriendly(129, [1, 6]),
            makeFriendly(129, [2, 6]),
            makeFriendly(129, [4, 4]),
            makeFriendly(70, [7, 6]),
            makeFriendly(67, [3, 4]),
            makeFriendly(89, [5, 4]),

            makeFriendly(9, [2, 8], true),
            makeFriendly(70, [5, 8], true),
            makeFriendly(67, [6, 8], true)
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

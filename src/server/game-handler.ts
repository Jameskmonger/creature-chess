import { Player } from "./player";
import { CardDeck } from "./cardDeck";
import { makeEnemy, makeFriendly } from "../shared/pokemon-piece";
import { createRandomOpponentBoard } from "./opponents/random-opponent";
import { Connection, IncomingPacketOpcodes, OutgoingPacketOpcodes } from "./connection";

export class GameHandler {
    private deck = new CardDeck();

    public registerConnection(connection: Connection) {
        const opponent = new Player(null);
        opponent.setCards(this.deck.take(5));
        opponent.setBoard(createRandomOpponentBoard());

        const player = new Player(connection);
        player.setCards(this.deck.take(5));
        player.setBoard([
            makeFriendly(129, [1, 6]),
            makeFriendly(129, [2, 6]),
            makeFriendly(129, [4, 4]),
            makeFriendly(70, [7, 6]),
            makeFriendly(67, [3, 4]),
            makeFriendly(89, [5, 4]),

            makeFriendly(9, [8, 2], true),
            makeFriendly(70, [8, 5], true),
            makeFriendly(67, [8, 6], true)
        ]);
        player.setOpponent(opponent);

        connection.onReceivePacket(IncomingPacketOpcodes.PURCHASE_CARD, (cardIndex: number) => {
            this.onPlayerPurchaseCard(player, cardIndex);
        });

        connection.onReceivePacket(IncomingPacketOpcodes.REFRESH_CARDS, () => {
            this.onPlayerRefreshCards(player);
        });

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

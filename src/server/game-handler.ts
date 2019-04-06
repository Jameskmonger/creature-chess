import { Player } from "./player";
import { CardDeck } from "./cardDeck";
import { makeEnemy, makeFriendly } from "../shared/pokemon-piece";
import { createRandomOpponentBoard } from "./opponents/random-opponent";
import { Connection, IncomingPacketOpcodes, OutgoingPacketOpcodes } from "./connection";

export class GameHandler {
    private deck = new CardDeck();

    public registerConnection(connection: Connection) {
        connection.onReceivePacket(IncomingPacketOpcodes.PURCHASE_CARD, (cardIndex: number) => {
            this.onPlayerPurchaseCard(connection, cardIndex);
        });

        connection.onReceivePacket(IncomingPacketOpcodes.REFRESH_CARDS, () => {
            this.onPlayerRefreshCards(connection);
        });

        const opponent: Player = {
            cards: this.deck.take(5),
            board: createRandomOpponentBoard()
        };

        const player: Player = {
            cards: this.deck.take(5),
            board: [
                makeFriendly(129, [1, 6]),
                makeFriendly(129, [2, 6]),
                makeFriendly(129, [4, 4]),
                makeFriendly(70, [7, 6]),
                makeFriendly(67, [3, 4]),
                makeFriendly(89, [5, 4]),

                makeFriendly(9, [8, 2], true),
                makeFriendly(70, [8, 5], true),
                makeFriendly(67, [8, 6], true)
            ],
            opponent
        };

        connection.setPlayer(player);

        this.onPlayerSetupComplete(connection);
    }

    public onPlayerSetupComplete(connection: Connection) {
        const player = connection.getPlayer();

        if (!player) {
            return;
        }

        connection.sendPacket(OutgoingPacketOpcodes.CARDS_UPDATE, player.cards);
        connection.sendPacket(OutgoingPacketOpcodes.BOARD_UPDATE, {
            friendly: player.board,
            opponent: player.opponent.board
        });
    }

    public onPlayerPurchaseCard(connection: Connection, cardIndex: number) {
        const player = connection.getPlayer();

        if (!player) {
            return;
        }

        player.cards[cardIndex] = null;
    }

    public onPlayerRefreshCards(connection: Connection) {
        const player = connection.getPlayer();

        if (!player) {
            return;
        }

        // prevent any race conditions
        const playerCards = player.cards;
        player.cards = [];

        this.deck.add(playerCards);
        this.deck.shuffle();

        player.cards = this.deck.take(5);

        connection.sendPacket(OutgoingPacketOpcodes.CARDS_UPDATE, player.cards);
    }
}

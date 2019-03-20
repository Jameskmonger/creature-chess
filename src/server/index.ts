// tslint:disable:no-console
import io = require("socket.io");
import { CardDeck } from "@common/cardDeck";
import { Player } from "./player";

const server = io.listen(3000);

const deck = new CardDeck();

server.on("connection", socket => {
    const player: Player = {
        cards: deck.take(5)
    };

    socket.on("purchaseCard", (cardIndex: number) => {
        player.cards[cardIndex] = null;
    });

    socket.on("shuffleCards", () => {
        // prevent any race conditions
        const playerCards = player.cards;
        player.cards = [];

        deck.add(player.cards);
        deck.shuffle();

        player.cards = deck.take(5);

        socket.emit("cardsUpdate", player.cards);
    });

    socket.emit("cardsUpdate", player.cards);
});

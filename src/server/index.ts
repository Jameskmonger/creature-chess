// tslint:disable:no-console
import io = require("socket.io");
import { CardDeck } from "../shared/cardDeck";
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
        console.log("shuffling cards");
        console.log("IDs before are: " + JSON.stringify(player.cards.map(p => p.id)));
        // prevent any race conditions
        const playerCards = player.cards;
        player.cards = [];

        deck.add(playerCards);
        deck.shuffle();

        player.cards = deck.take(5);
        console.log("IDs after are: " + JSON.stringify(player.cards.map(p => p.id)));

        socket.emit("cardsUpdate", player.cards);
    });

    socket.emit("cardsUpdate", player.cards);
});

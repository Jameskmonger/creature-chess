// tslint:disable:no-console
import io = require("socket.io");
import { CardDeck } from "./cardDeck";
import { Player } from "./player";
import { makeFriendly, makeEnemy } from "../shared/pokemon-piece";

const server = io.listen(3000);

const deck = new CardDeck();

const opponent: Player = {
    cards: deck.take(5),
    board: [
        makeEnemy(77, [0, 0]),
        makeEnemy(15, [1, 0]),
        makeEnemy(123, [4, 0]),
        makeEnemy(58, [5, 0]),
        makeEnemy(6, [4, 3]),
        makeEnemy(11, [3, 1]),
    ]
};

server.on("connection", socket => {
    const player: Player = {
        cards: deck.take(5),
        board: [
            makeFriendly(129, [1, 6]),
            makeFriendly(62, [2, 6]),
            makeFriendly(9, [4, 4]),
            makeFriendly(70, [7, 6]),
            makeFriendly(67, [3, 4]),
            makeFriendly(89, [5, 4]),

            makeFriendly(9, [8, 2], true),
            makeFriendly(70, [8, 5], true),
            makeFriendly(67, [8, 6], true)
        ],
        opponent
    };

    socket.on("purchaseCard", (cardIndex: number) => {
        player.cards[cardIndex] = null;
    });

    socket.on("refreshCards", () => {
        console.log("refreshing cards");
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
    socket.emit("boardUpdate", {
        friendly: player.board,
        opponent: player.opponent.board
    });
});

import { Player } from "./player";
import { CardDeck } from "./cardDeck";
import { makeEnemy, makeFriendly } from "../shared/pokemon-piece";
import { OutgoingPacketOpcodes } from "./network-handler";

type OutgoingPacketListener = (opcode: OutgoingPacketOpcodes, data: any) => void;

export class GameHandler {
    private deck = new CardDeck();
    private outgoingPacketListeners = new Map<Player, OutgoingPacketListener>();

    public createPlayer() {
        const opponent: Player = {
            cards: this.deck.take(5),
            board: [
                makeEnemy(77, [0, 0]),
                makeEnemy(15, [1, 0]),
                makeEnemy(123, [4, 0]),
                makeEnemy(58, [5, 0]),
                makeEnemy(6, [4, 3]),
                makeEnemy(11, [3, 1]),
            ]
        };

        const player: Player = {
            cards: this.deck.take(5),
            board: [
                makeFriendly(129, [1, 6]),
                makeFriendly(62, [2, 6]),
                makeFriendly(9, [4, 4]),
                makeFriendly(70, [7, 6]),
                makeFriendly(67, [3, 4]),
                makeFriendly(89, [5, 4])
            ],
            opponent
        };

        return player;
    }

    public setOutgoingPacketListener(player: Player, listener: OutgoingPacketListener) {
        this.outgoingPacketListeners.set(player, listener);
    }

    public onPlayerSetupComplete(player: Player) {
        this.sendPacket(player, OutgoingPacketOpcodes.CARDS_UPDATE, player.cards);
        this.sendPacket(player, OutgoingPacketOpcodes.BOARD_UPDATE, {
            friendly: player.board,
            opponent: player.opponent.board
        });
    }

    public onPlayerPurchaseCard(player: Player, cardIndex: number) {
        player.cards[cardIndex] = null;
    }

    public onPlayerRefreshCards(player: Player) {
        // prevent any race conditions
        const playerCards = player.cards;
        player.cards = [];

        this.deck.add(playerCards);
        this.deck.shuffle();

        player.cards = this.deck.take(5);

        this.sendPacket(player, OutgoingPacketOpcodes.CARDS_UPDATE, player.cards);
    }

    private sendPacket(player: Player, opcode: OutgoingPacketOpcodes, data: any) {
        const listener = this.outgoingPacketListeners.get(player);

        if (listener === undefined) {
            return;
        }

        listener(opcode, data);
    }
}

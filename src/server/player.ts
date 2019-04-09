import { PokemonCard } from "../shared";
import { PokemonPiece } from "../shared/pokemon-piece";
import { Connection, OutgoingPacketOpcodes } from "./connection";

export class Player {
    private connection: Connection;
    private cards: PokemonCard[];
    private board: PokemonPiece[];
    private opponent?: Player;

    constructor(connection: Connection) {
        this.connection = connection;

        if (connection !== null) {
            connection.setPlayer(this);
        }
    }

    public setCards(cards: PokemonCard[]) {
        this.cards = cards;
    }

    public getCards() {
        return this.cards;
    }

    public deleteCard(index: number) {
        this.cards[index] = null;
    }

    public setBoard(board: PokemonPiece[]) {
        this.board = board;
    }

    public setOpponent(opponent: Player) {
        this.opponent = opponent;
    }

    public sendCardsUpdate() {
        this.sendPacket(OutgoingPacketOpcodes.CARDS_UPDATE, this.cards);
    }

    public sendBoardUpdate() {
        this.sendPacket(OutgoingPacketOpcodes.BOARD_UPDATE, {
            friendly: this.board,
            opponent: this.opponent.board
        });
    }

    private sendPacket(opcode: OutgoingPacketOpcodes, ...data: any[]) {
        this.connection.sendPacket(opcode, ...data);
    }
}

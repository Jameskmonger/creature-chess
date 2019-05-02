import uuid = require("uuid/v4");
import { PokemonCard, PlayerListPlayer, GameState } from "../shared";
import { PokemonPiece } from "../shared/pokemon-piece";
import { Connection } from "./connection";
import { ServerToClientPacketOpcodes } from "../shared/packet-opcodes";
import { GameStateUpdate } from "../shared/game-state";

export class Player {
    public readonly id: string;
    public readonly name: string;
    private connection: Connection;
    private cards: PokemonCard[];
    private board: PokemonPiece[];
    private opponent?: Player;
    private money: number;

    constructor(connection: Connection, name: string) {
        this.connection = connection;
        this.id = uuid();
        this.name = name;
        this.money = 3;

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

    public sendJoinedGame() {
        this.sendPacket(ServerToClientPacketOpcodes.JOINED_GAME, this.id);
    }

    public sendCardsUpdate() {
        this.sendPacket(ServerToClientPacketOpcodes.CARDS_UPDATE, this.cards);
    }

    public sendBoardUpdate() {
        this.sendPacket(ServerToClientPacketOpcodes.BOARD_UPDATE, {
            friendly: this.board,
            opponent: this.opponent.board
        });
    }

    public sendMoneyUpdate() {
        this.sendPacket(ServerToClientPacketOpcodes.MONEY_UPDATE, this.money);
    }

    public sendPlayerListUpdate(players: Player[]) {
        const playerList: PlayerListPlayer[] = players.map(p => {
            return {
                id: p.id,
                name: p.name,
                health: 100
            };
        });

        this.sendPacket(ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE, playerList);
    }

    public sendStateUpdate(state: GameState, seed?: number) {
        const data = this.getStateUpdateData(state, seed);

        this.sendPacket(ServerToClientPacketOpcodes.STATE_UPDATE, {
            state,
            data
        });
    }

    private getStateUpdateData(state: GameState, seed?: number): GameStateUpdate {
        if (state === GameState.PLAYING) {
            return {
                seed,
                opponentId: this.opponent.id
            };
        }

        return undefined;
    }

    private sendPacket(opcode: ServerToClientPacketOpcodes, ...data: any[]) {
        // allow for bot players
        if (this.connection === null) {
            return;
        }

        this.connection.sendPacket(opcode, ...data);
    }
}

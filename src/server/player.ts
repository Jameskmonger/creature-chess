import uuid = require("uuid/v4");
import { PokemonCard, PlayerListPlayer, GamePhase, Constants } from "../shared";
import { PokemonPiece, clonePokemonPiece } from "../shared/pokemon-piece";
import { Connection } from "./connection";
import { ServerToClientPacketOpcodes, MovePiecePacket, PhaseUpdatePacket, BoardUpatePacket } from "../shared/packet-opcodes";
import { TileCoordinates } from "../shared/position";
import { Match } from "./match";
import { log } from "./log";

export class Player {
    public readonly id: string;
    public readonly name: string;
    private connection: Connection;
    private cards: PokemonCard[];
    private board: PokemonPiece[];
    private bench: PokemonPiece[];
    private opponent?: Player;
    private money: number;
    private health: number;
    private match: Match;

    constructor(connection: Connection, name: string) {
        this.connection = connection;
        this.id = uuid();
        this.name = name;
        this.cards = [];
        this.board = [];
        this.bench = [];
        this.money = 0;
        this.health = 100;
        this.match = null;

        if (connection !== null) {
            connection.setPlayer(this);
        }

        this.sendCardsUpdate();
        this.sendBoardUpdate();
        this.sendBenchUpdate();
        this.sendMoneyUpdate();
    }

    public setCards(cards: PokemonCard[], update: boolean = true) {
        this.cards = cards;

        if (update) {
            this.sendCardsUpdate();
        }
    }

    public getCards() {
        return this.cards;
    }

    public getCardAtIndex(index: number) {
        return this.cards[index];
    }

    public deleteCard(index: number) {
        this.cards[index] = null;

        this.sendCardsUpdate();
    }

    public setBoard(board: PokemonPiece[]) {
        this.board = board;
    }

    public clone() {
        return this.board.map(p => clonePokemonPiece(p));
    }

    public addBenchPiece(piece: PokemonPiece) {
        this.bench.push(piece);

        this.sendBenchUpdate();
    }

    public getMoney() {
        return this.money;
    }

    public setMoney(money: number) {
        this.money = money;

        this.sendMoneyUpdate();
    }

    public getHealth() {
        return this.health;
    }

    public movePieceToBench(packet: MovePiecePacket) {
        const piece = this.popPieceIfExists(packet.id, packet.from);

        if (piece === null) {
            log(`Could not find piece ID ${packet.id}`);
            return;
        }

        piece.position = packet.to;
        this.bench.push(piece);
    }

    public movePieceToBoard(packet: MovePiecePacket) {
        const piece = this.popPieceIfExists(packet.id, packet.from);

        if (piece === null) {
            log(`Could not find piece ID ${packet.id}`);
            return;
        }

        piece.position = packet.to;
        this.board.push(piece);
    }

    public sendJoinedGame() {
        this.sendPacket(ServerToClientPacketOpcodes.JOINED_GAME, this.id);
    }

    public sendPlayerListUpdate(players: Player[]) {
        const playerList: PlayerListPlayer[] = players.map(p => {
            return {
                id: p.id,
                name: p.name,
                health: p.health
            };
        });

        this.sendPacket(ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE, playerList);
    }

    public sendPreparingPhaseUpdate() {
        this.match = null;

        const packet: PhaseUpdatePacket = {
            phase: GamePhase.PREPARING,
            payload: {
                pieces: this.board
            }
        };

        this.sendPacket(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    public async sendPlayingPhaseUpdate(seed: number) {
        const packet: PhaseUpdatePacket = {
            phase: GamePhase.PLAYING,
            payload: {
                seed
            }
        };

        this.sendPacket(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);

        const results = await this.match.fight(seed);

        log(`results: ${this.name} ${results.survivingHomeTeam.length} v ${results.survivingAwayTeam.length} ${this.opponent.name}`);

        this.health -= results.survivingAwayTeam.length;
    }

    public sendReadyPhaseUpdate(opponent: Player) {
        this.opponent = opponent;

        this.match = new Match(this, opponent);

        const packet: PhaseUpdatePacket = {
            phase: GamePhase.READY,
            payload: {
                pieces: this.match.getBoard(),
                opponentId: this.opponent.id
            }
        };

        this.sendPacket(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    public getFirstEmptyBenchSlot() {
        for (let slot = 0; slot < Constants.GRID_SIZE; slot++) {
            const piece = this.bench.some(p => p.position.x === slot);

            if (!piece) {
                return slot;
            }
        }

        return null;
    }

    private sendCardsUpdate() {
        this.sendPacket(ServerToClientPacketOpcodes.CARDS_UPDATE, this.cards);
    }

    private sendBoardUpdate() {
        const packet: BoardUpatePacket = {
            pieces: this.board.map(piece => ({
                ...piece,
                facingAway: true
            }))
        };

        this.sendPacket(ServerToClientPacketOpcodes.BOARD_UPDATE, packet);
    }

    private sendBenchUpdate() {
        this.sendPacket(ServerToClientPacketOpcodes.BENCH_UPDATE, {
            pieces: this.bench
        });
    }

    private sendMoneyUpdate() {
        this.sendPacket(ServerToClientPacketOpcodes.MONEY_UPDATE, this.money);
    }

    private sendPacket(opcode: ServerToClientPacketOpcodes, ...data: any[]) {
        // allow for bot players
        if (this.connection === null) {
            return;
        }

        this.connection.sendPacket(opcode, ...data);
    }

    private popPieceIfExists(id: string, { x, y }: TileCoordinates) {
        const fromBench = y === null;
        const origin = fromBench ? this.bench : this.board;

        const index = origin.findIndex(p =>
            p.id === id
            && p.position.x === x
            && p.position.y === y);

        if (index === -1) {
            return null;
        }

        const piece = origin[index];

        origin.splice(index, 1);

        return piece;
    }
}

import { Socket } from "socket.io";
import { Player } from "./player";
import { ClientToServerPacketOpcodes, ServerToClientPacketOpcodes, PhaseUpdatePacket, BoardUpatePacket, LevelUpdatePacket } from "@common/packet-opcodes";
import { PlayerListPlayer, PokemonPiece, GamePhase, PokemonCard } from "@common";
import { FeedMessage } from "@common/feed-message";
import { CardDeck } from "../cardDeck";

type IncomingPacketListener = (...args: any[]) => void;

export class Connection extends Player {
    private socket: Socket;

    constructor(socket: Socket, name: string, deck: CardDeck) {
        super(name, deck);

        this.socket = socket;

        this.onReceivePacket(ClientToServerPacketOpcodes.PURCHASE_CARD, this.purchaseCard);
        this.onReceivePacket(ClientToServerPacketOpcodes.SELL_PIECE, this.sellPiece);
        this.onReceivePacket(ClientToServerPacketOpcodes.REROLL_CARDS, this.rerollCards);
        this.onReceivePacket(ClientToServerPacketOpcodes.MOVE_PIECE_TO_BENCH, this.movePieceToBench);
        this.onReceivePacket(ClientToServerPacketOpcodes.MOVE_PIECE_TO_BOARD, this.movePieceToBoard);
        this.onReceivePacket(ClientToServerPacketOpcodes.BUY_XP, this.buyXp);
        this.onReceivePacket(ClientToServerPacketOpcodes.SEND_CHAT_MESSAGE, this.sendChatMessage);
        this.onReceivePacket(ClientToServerPacketOpcodes.FINISH_MATCH, this.finishMatch);

        this.money.onChange(this.sendMoneyUpdate);
        this.cards.onChange(this.sendCardsUpdate);
        this.board.onChange(this.sendBoardUpdate);
        this.bench.onChange(this.sendBenchUpdate);
    }

    public onLevelUpdate(level: number, xp: number) {
        const packet: LevelUpdatePacket = {
            level,
            xp
        };

        this.sendPacket(ServerToClientPacketOpcodes.LEVEL_UPDATE, packet);
    }

    public onEnterPreparingPhase(board: PokemonPiece[]) {
        const packet: PhaseUpdatePacket = {
            phase: GamePhase.PREPARING,
            payload: {
                pieces: board
            }
        };

        this.sendPacket(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    public onEnterReadyPhase(board: PokemonPiece[], opponentId: string) {
        const packet: PhaseUpdatePacket = {
            phase: GamePhase.READY,
            payload: {
                pieces: board,
                opponentId
            }
        };

        this.sendPacket(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    public onEnterPlayingPhase(seed: number) {
        const packet: PhaseUpdatePacket = {
            phase: GamePhase.PLAYING,
            payload: {
                seed
            }
        };

        this.sendPacket(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    public onEnterDeadPhase() {
        const packet: PhaseUpdatePacket = {
            phase: GamePhase.DEAD
        };

        this.sendPacket(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    public onNewFeedMessage(message: FeedMessage) {
        this.sendPacket(ServerToClientPacketOpcodes.NEW_FEED_MESSAGE, message);
    }

    public onPlayerListUpdate(players: Player[]) {
        const playerList: PlayerListPlayer[] = players.map(p => {
            return {
                id: p.id,
                name: p.name,
                health: p.health
            };
        });

        this.sendPacket(ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE, playerList);
    }

    private onReceivePacket(opcode: ClientToServerPacketOpcodes, listener: IncomingPacketListener) {
        this.socket.on(opcode, listener);
    }

    private sendPacket(opcode: ServerToClientPacketOpcodes, ...data: any[]) {
        this.socket.emit(opcode, ...data);
    }

    private sendMoneyUpdate = (newValue: number) => {
        this.sendPacket(ServerToClientPacketOpcodes.MONEY_UPDATE, newValue);
    }

    private sendCardsUpdate = (newValue: PokemonCard[]) => {
        this.sendPacket(ServerToClientPacketOpcodes.CARDS_UPDATE, newValue);
    }

    private sendBoardUpdate = (newValue: PokemonPiece[]) => {
        const turnedPieces = newValue.map(piece => ({
            ...piece,
            facingAway: true
        }));

        const packet: BoardUpatePacket = {
            pieces: turnedPieces
        };

        this.sendPacket(ServerToClientPacketOpcodes.BOARD_UPDATE, packet);
    }

    private sendBenchUpdate = (newValue: PokemonPiece[]) => {
        this.sendPacket(ServerToClientPacketOpcodes.BENCH_UPDATE, {
            pieces: newValue
        });
    }
}

import { Socket } from "socket.io";
import { Player } from "./player";
import { ClientToServerPacketOpcodes, ServerToClientPacketOpcodes, PhaseUpdatePacket, BoardUpatePacket, LevelUpdatePacket } from "../../shared/packet-opcodes";
import { PlayerListPlayer, PokemonPiece, GamePhase, PokemonCard } from "../../shared";
import { FeedMessage } from "@common/feed-message";

type IncomingPacketListener = (...args: any[]) => void;

export class Connection {
    private socket: Socket;
    private player: Player;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    public setPlayer(player: Player) {
        this.player = player;
    }

    public getPlayer() {
        return this.player;
    }

    public onReceivePacket(opcode: ClientToServerPacketOpcodes, listener: IncomingPacketListener) {
        this.socket.on(opcode, listener);
    }

    public onJoinGame(handler: (name: string, callback: (id: string) => void) => void) {
        this.onReceivePacket(ClientToServerPacketOpcodes.JOIN_GAME, handler);
    }

    public sendLevelUpdate(level: number, xp: number) {
        const packet: LevelUpdatePacket = {
            level,
            xp
        };

        this.sendPacket(ServerToClientPacketOpcodes.LEVEL_UPDATE, packet);
    }

    public sendBoardUpdate(board: PokemonPiece[]) {
        const packet: BoardUpatePacket = {
            pieces: board
        };

        this.sendPacket(ServerToClientPacketOpcodes.BOARD_UPDATE, packet);
    }

    public sendBenchUpdate(bench: PokemonPiece[]) {
        this.sendPacket(ServerToClientPacketOpcodes.BENCH_UPDATE, {
            pieces: bench
        });
    }

    public sendMoneyUpdate(money: number) {
        this.sendPacket(ServerToClientPacketOpcodes.MONEY_UPDATE, money);
    }

    public sendPlayerListUpdate(players: PlayerListPlayer[]) {
        this.sendPacket(ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE, players);
    }

    public sendPreparingPhaseUpdate(board: PokemonPiece[]) {
        const packet: PhaseUpdatePacket = {
            phase: GamePhase.PREPARING,
            payload: {
                pieces: board
            }
        };

        this.sendPacket(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    public sendReadyPhaseUpdate(board: PokemonPiece[], opponentId: string) {
        const packet: PhaseUpdatePacket = {
            phase: GamePhase.READY,
            payload: {
                pieces: board,
                opponentId
            }
        };

        this.sendPacket(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    public sendPlayingPhaseUpdate(seed: number) {
        const packet: PhaseUpdatePacket = {
            phase: GamePhase.PLAYING,
            payload: {
                seed
            }
        };

        this.sendPacket(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    public sendDeadPhaseUpdate() {
        const packet: PhaseUpdatePacket = {
            phase: GamePhase.DEAD
        };

        this.sendPacket(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    public sendCardsUpdate(cards: PokemonCard[]) {
        this.sendPacket(ServerToClientPacketOpcodes.CARDS_UPDATE, cards);
    }

    public sendNewFeedMessage(message: FeedMessage) {
        this.sendPacket(ServerToClientPacketOpcodes.NEW_FEED_MESSAGE, message);
    }

    private sendPacket(opcode: ServerToClientPacketOpcodes, ...data: any[]) {
        this.socket.emit(opcode, ...data);
    }
}

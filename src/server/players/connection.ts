import { Socket } from "socket.io";
import { Player } from "./player";
import { ClientToServerPacketOpcodes, ServerToClientPacketOpcodes, PhaseUpdatePacket, BoardUpatePacket, LevelUpdatePacket } from "@common/packet-opcodes";
import { PlayerListPlayer, PokemonPiece, GamePhase, PokemonCard } from "@common";
import { FeedMessage } from "@common/feed-message";
import { CardDeck } from "../cardDeck";
import { Observable } from "../observable/observable";
import { OpponentProvider } from "./opponentProvider";

type IncomingPacketListener = (...args: any[]) => void;

export class Connection extends Player {
    private socket: Socket;

    constructor(socket: Socket, gamePhaseObservable: Observable<GamePhase>, opponentProvider: OpponentProvider, deck: CardDeck, name: string) {
        super(gamePhaseObservable, opponentProvider, deck, name);

        this.socket = socket;

        this.onReceivePacket(ClientToServerPacketOpcodes.PURCHASE_CARD, this.purchaseCard);
        this.onReceivePacket(ClientToServerPacketOpcodes.SELL_PIECE, this.sellPiece);
        this.onReceivePacket(ClientToServerPacketOpcodes.REROLL_CARDS, this.rerollCards);
        this.onReceivePacket(ClientToServerPacketOpcodes.MOVE_PIECE_TO_BENCH, this.movePieceToBench);
        this.onReceivePacket(ClientToServerPacketOpcodes.MOVE_PIECE_TO_BOARD, this.movePieceToBoard);
        this.onReceivePacket(ClientToServerPacketOpcodes.BUY_XP, this.buyXp);
        this.onReceivePacket(ClientToServerPacketOpcodes.SEND_CHAT_MESSAGE, this.sendChatMessage);
        this.onReceivePacket(ClientToServerPacketOpcodes.FINISH_MATCH, this.finishMatch);

        this.gamePhaseObservable.onChange(newValue => {
            switch (newValue) {
                case GamePhase.PREPARING:
                    return this.sendPreparingPhaseUpdate();
                case GamePhase.READY:
                    return this.sendReadyPhaseUpdate();
                case GamePhase.PLAYING:
                    return this.sendPlayingPhaseUpdate();
                default:
                    return;
            }
        });

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

    public onDeath() {
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

    private sendPreparingPhaseUpdate = () => {
        const packet: PhaseUpdatePacket = {
            phase: GamePhase.PREPARING,
            payload: {
                pieces: this.board.getValue()
            }
        };

        this.sendPacket(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    private sendReadyPhaseUpdate = () => {
        const packet: PhaseUpdatePacket = {
            phase: GamePhase.READY,
            payload: {
                pieces: this.match.getBoard(),
                opponentId: this.match.away.id
            }
        };

        this.sendPacket(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    private sendPlayingPhaseUpdate = () => {
        const packet: PhaseUpdatePacket = {
            phase: GamePhase.PLAYING
        };

        this.sendPacket(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }
}

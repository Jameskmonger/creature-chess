import uuid = require("uuid/v4");
import { Socket } from "socket.io";
import { Player } from "@common/game/player/player";
import { ClientToServerPacketOpcodes, ServerToClientPacketOpcodes, PhaseUpdatePacket, BoardUpatePacket, LevelUpdatePacket, LobbyPlayerUpdatePacket, StartGamePacket, ShopLockUpdatePacket } from "@common/packet-opcodes";
import { GamePhase, Models } from "@common";
import { FeedMessage } from "@common/feed-message";
import { LobbyPlayer } from '@common/models';

type IncomingPacketListenerReference = ({ opcode: ClientToServerPacketOpcodes, listener: IncomingPacketListener });
type IncomingPacketListener = (...args: any[]) => void;

export class Connection extends Player {
    public readonly isBot: boolean = false;
    public readonly isConnection = true;
    private socket: Socket;
    private reconnectionSecret: string;
    private incomingPacketListeners: IncomingPacketListenerReference[] = [];

    constructor(socket: Socket, name: string) {
        super(name);

        this.setSocket(socket);

        this.onReceivePacket(ClientToServerPacketOpcodes.BUY_CARD, this.buyCard);
        this.onReceivePacket(ClientToServerPacketOpcodes.SELL_PIECE, this.sellPiece);
        this.onReceivePacket(ClientToServerPacketOpcodes.BUY_REROLL, () => {
            this.buyReroll();
            this.sendCardsUpdate();
        });
        this.onReceivePacket(ClientToServerPacketOpcodes.START_LOBBY_GAME, this.startLobbyGame);
        this.onReceivePacket(ClientToServerPacketOpcodes.MOVE_PIECE_TO_BENCH, this.movePieceToBench);
        this.onReceivePacket(ClientToServerPacketOpcodes.MOVE_PIECE_TO_BOARD, this.movePieceToBoard);
        this.onReceivePacket(ClientToServerPacketOpcodes.BUY_XP, this.buyXp);
        this.onReceivePacket(ClientToServerPacketOpcodes.READY_UP, this.readyUp);
        this.onReceivePacket(ClientToServerPacketOpcodes.SEND_CHAT_MESSAGE, this.sendChatMessage);
        this.onReceivePacket(ClientToServerPacketOpcodes.FINISH_MATCH, this.finishMatch);
        this.onReceivePacket(ClientToServerPacketOpcodes.TOGGLE_SHOP_LOCK, this.toggleShopLock);

        this.money.onChange(this.sendMoneyUpdate);
        this.level.onChange(this.sendLevelUpdate);
    }

    public onStartGame(gameId: string) {
        const packet: StartGamePacket = {
            localPlayerId: this.id,
            reconnectionSecret: this.reconnectionSecret,
            name: this.name,
            gameId
        };

        this.sendPacket(ServerToClientPacketOpcodes.START_GAME, packet);
    }

    public onFinishGame() {
        super.onFinishGame();

        // TODO: send game finished packet here, display scoreboard etc
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

    public onPlayerListUpdate(players: Models.PlayerListPlayer[]) {
        this.sendPacket(ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE, players);
    }

    public onLobbyPlayerUpdate(index: number, player: LobbyPlayer) {
        const packet: LobbyPlayerUpdatePacket = {
            index,
            player
        };

        this.sendPacket(ServerToClientPacketOpcodes.LOBBY_PLAYER_UPDATE, packet);
    }

    public reauthenticate(socket: Socket, reconnectionSecret: string) {
        if (this.reconnectionSecret !== reconnectionSecret) {
            return false;
        }

        this.setSocket(socket);
        return true;
    }

    protected onEnterPreparingPhase(round: number) {
        const turnedBoard = this.getBoard().map(piece => ({
            ...piece,
            facingAway: true
        }));

        const packet: PhaseUpdatePacket = {
            phase: GamePhase.PREPARING,
            payload: {
                round,
                pieces: turnedBoard,
                bench: this.getBench(),
                cards: this.cards.getValue()
            }
        };

        this.sendPacket(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    protected onEnterReadyPhase() {
        const packet: PhaseUpdatePacket = {
            phase: GamePhase.READY,
            payload: {
                pieces: this.match.getBoard(),
                opponentId: this.match.away.id
            }
        };

        this.sendPacket(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    protected onEnterPlayingPhase() {
        const packet: PhaseUpdatePacket = {
            phase: GamePhase.PLAYING
        };

        this.sendPacket(ServerToClientPacketOpcodes.PHASE_UPDATE, packet);
    }

    protected onShopLockUpdate() {
        const packet: ShopLockUpdatePacket = {
            locked: this.shopLocked
        };

        this.sendPacket(ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE, packet);
    }

    private onReceivePacket(opcode: ClientToServerPacketOpcodes, listener: IncomingPacketListener) {
        this.incomingPacketListeners.push({ opcode, listener });

        if (this.socket) {
            this.socket.on(opcode, listener);
        }
    }

    private sendPacket(opcode: ServerToClientPacketOpcodes, ...data: any[]) {
        this.socket.emit(opcode, ...data);
    }

    private sendMoneyUpdate = (newValue: number) => {
        this.sendPacket(ServerToClientPacketOpcodes.MONEY_UPDATE, newValue);
    }

    private sendCardsUpdate = () => {
        this.sendPacket(ServerToClientPacketOpcodes.CARDS_UPDATE, this.cards.getValue());
    }

    private sendLevelUpdate = ({ level, xp }: { level: number, xp: number }) => {
        const packet: LevelUpdatePacket = {
            level,
            xp
        };

        this.sendPacket(ServerToClientPacketOpcodes.LEVEL_UPDATE, packet);
    }

    private setSocket(socket: Socket) {
        this.socket = socket;
        this.reconnectionSecret = uuid();

        this.incomingPacketListeners.forEach(({ opcode, listener }) => {
            this.socket.on(opcode, listener);
        });
    }
}

import uuid = require("uuid/v4");
import { Socket } from "socket.io";
import { Player } from "@common/game/player/player";
import { LobbyPlayer, FeedMessage, PlayerListPlayer } from "@common/models";
import { IncomingPacketRegistry } from "@common/networking/incoming-packet-registry";
import { ClientToServerPacketDefinitions, ClientToServerPacketOpcodes } from "@common/networking/client-to-server";
import { ServerToClientPacketOpcodes, ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements } from "@common/networking/server-to-client";
import { OutgoingPacketRegistry } from "@common/networking/outgoing-packet-registry";
import { GamePhase } from "@common/models";

export class Connection extends Player {
    public readonly isBot: boolean = false;
    public readonly isConnection = true;
    private socket: Socket;
    private reconnectionSecret: string;

    private incomingPacketRegistry: IncomingPacketRegistry<ClientToServerPacketDefinitions>;
    private outgoingPacketRegistry: OutgoingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>;

    constructor(socket: Socket, name: string) {
        super(name);

        this.setSocket(socket);

        this.incomingPacketRegistry.on(ClientToServerPacketOpcodes.BUY_CARD, this.buyCard);
        this.incomingPacketRegistry.on(ClientToServerPacketOpcodes.SELL_PIECE, this.sellPiece);
        this.incomingPacketRegistry.on(ClientToServerPacketOpcodes.BUY_REROLL, () => {
            this.buyReroll();
            this.sendCardsUpdate();
        });
        this.incomingPacketRegistry.on(ClientToServerPacketOpcodes.START_LOBBY_GAME, this.startLobbyGame);
        this.incomingPacketRegistry.on(ClientToServerPacketOpcodes.DROP_PIECE, this.onDropPiece);
        this.incomingPacketRegistry.on(ClientToServerPacketOpcodes.BUY_XP, this.buyXp);
        this.incomingPacketRegistry.on(ClientToServerPacketOpcodes.READY_UP, this.readyUp);
        this.incomingPacketRegistry.on(ClientToServerPacketOpcodes.SEND_CHAT_MESSAGE, this.sendChatMessage);
        this.incomingPacketRegistry.on(ClientToServerPacketOpcodes.FINISH_MATCH, this.finishMatch);
        this.incomingPacketRegistry.on(ClientToServerPacketOpcodes.TOGGLE_SHOP_LOCK, this.toggleShopLock);

        this.money.onChange(this.sendMoneyUpdate);
        this.level.onChange(this.sendLevelUpdate);
    }

    public onStartGame(gameId: string) {
        this.outgoingPacketRegistry.emit(
            ServerToClientPacketOpcodes.START_GAME,
            {
                localPlayerId: this.id,
                reconnectionSecret: this.reconnectionSecret,
                name: this.name,
                gameId
            }
        );
    }

    public onFinishGame(winner: Player) {
        super.onFinishGame(winner);

        this.outgoingPacketRegistry.emit(
            ServerToClientPacketOpcodes.FINISH_GAME,
            {
                winnerName: winner.name
            }
        );
    }

    public onDeath() {
        this.outgoingPacketRegistry.emit(
            ServerToClientPacketOpcodes.PHASE_UPDATE,
            {
                phase: GamePhase.DEAD
            }
        );
    }

    public onNewFeedMessage(message: FeedMessage) {
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.NEW_FEED_MESSAGE, message);
    }

    public onPlayerListUpdate(players: PlayerListPlayer[]) {
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.PLAYER_LIST_UPDATE, players);
    }

    public onLobbyPlayerUpdate(index: number, player: LobbyPlayer) {
        this.outgoingPacketRegistry.emit(
            ServerToClientPacketOpcodes.LOBBY_PLAYER_UPDATE,
            {
                index,
                player
            }
        );
    }

    public reauthenticate(socket: Socket, reconnectionSecret: string) {
        if (this.reconnectionSecret !== reconnectionSecret) {
            return null;
        }

        this.setSocket(socket);
        return this.reconnectionSecret;
    }

    public onPlayersResurrected(playerIds: string[]) {
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.PLAYERS_RESURRECTED, { playerIds });
    }

    protected onEnterPreparingPhase(round: number) {
        this.outgoingPacketRegistry.emit(
            ServerToClientPacketOpcodes.PHASE_UPDATE,
            {
                phase: GamePhase.PREPARING,
                payload: {
                    round,
                    pieces: this.pieces.getState(),
                    cards: this.cards.getValue()
                }
            }
        );
    }

    protected onEnterReadyPhase() {
        this.outgoingPacketRegistry.emit(
            ServerToClientPacketOpcodes.PHASE_UPDATE,
            {
                phase: GamePhase.READY,
                payload: {
                    board: this.match.getBoard(),
                    opponentId: this.match.away.id
                }
            }
        );
    }

    protected onEnterPlayingPhase() {
        this.outgoingPacketRegistry.emit(
            ServerToClientPacketOpcodes.PHASE_UPDATE,
            {
                phase: GamePhase.PLAYING
            }
        );
    }

    protected onShopLockUpdate() {
        this.outgoingPacketRegistry.emit(
            ServerToClientPacketOpcodes.SHOP_LOCK_UPDATE,
            {
                locked: this.shopLocked
            }
        );
    }

    private sendMoneyUpdate = (newValue: number) => {
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.MONEY_UPDATE, newValue);
    }

    private sendCardsUpdate = () => {
        this.outgoingPacketRegistry.emit(ServerToClientPacketOpcodes.CARDS_UPDATE, this.cards.getValue());
    }

    private sendLevelUpdate = ({ level, xp }: { level: number, xp: number }) => {
        this.outgoingPacketRegistry.emit(
            ServerToClientPacketOpcodes.LEVEL_UPDATE,
            {
                level,
                xp
            }
        );
    }

    private setSocket(socket: Socket) {
        this.socket = socket;
        this.reconnectionSecret = uuid();

        this.incomingPacketRegistry = new IncomingPacketRegistry<ClientToServerPacketDefinitions>(
            (opcode, handler) => socket.on(opcode, handler)
        );

        this.outgoingPacketRegistry = new OutgoingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>(
            (opcode, payload, ack) => socket.emit(opcode, payload, ack)
        );
    }
}

import uuid = require("uuid/v4");
import { Socket } from "socket.io";
import { Player } from "@common/game/player/player";
import { LobbyPlayer, FeedMessage, PlayerListPlayer } from "@common/models";
import { IncomingPacketRegistry } from "@common/networking/incoming-packet-registry";
import { ClientToServerPacketDefinitions, ClientToServerPacketOpcodes, SendPlayerActionsPacket, ClientToServerPacketAcknowledgements } from "@common/networking/client-to-server";
import { ServerToClientPacketOpcodes, ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements } from "@common/networking/server-to-client";
import { OutgoingPacketRegistry } from "@common/networking/outgoing-packet-registry";
import { GamePhase } from "@common/models";
import { PlayerActionTypes } from "@common/player";
import { log } from "console";

export class Connection extends Player {
    public readonly isBot: boolean = false;
    public readonly isConnection = true;
    private reconnectionSecret: string;

    private incomingPacketRegistry: IncomingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>;
    private outgoingPacketRegistry: OutgoingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>;
    private lastReceivedPacketIndex = 0;

    constructor(socket: Socket, name: string) {
        super(name);

        this.setSocket(socket);

        this.incomingPacketRegistry.on(ClientToServerPacketOpcodes.START_LOBBY_GAME, this.startLobbyGame);
        this.incomingPacketRegistry.on(ClientToServerPacketOpcodes.SEND_CHAT_MESSAGE, this.sendChatMessage);
        this.incomingPacketRegistry.on(ClientToServerPacketOpcodes.FINISH_MATCH, this.finishMatch);

        this.incomingPacketRegistry.on(ClientToServerPacketOpcodes.SEND_PLAYER_ACTIONS, this.receiveActions);

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

    private receiveActions = (packet: SendPlayerActionsPacket, ack: (accepted: boolean, packetIndex?: number) => void) => {
        const expectedPacketIndex = this.lastReceivedPacketIndex + 1;

        if (expectedPacketIndex !== packet.index) {
            ack(false);
            return;
        }

        for (const action of packet.actions) {
            switch (action.type) {
                case PlayerActionTypes.TOGGLE_SHOP_LOCK: {
                    this.toggleShopLock();
                    break;
                }
                case PlayerActionTypes.BUY_CARD: {
                    this.buyCard(action.payload.index);
                    break;
                }
                case PlayerActionTypes.PLAYER_SELL_PIECE: {
                    this.sellPiece(action.payload.pieceId);
                    break;
                }
                case PlayerActionTypes.REROLL_CARDS: {
                    this.buyReroll();
                    this.sendCardsUpdate();
                    break;
                }
                case PlayerActionTypes.PLAYER_DROP_PIECE: {
                    this.onDropPiece(action);
                    break;
                }
                case PlayerActionTypes.BUY_XP: {
                    this.buyXp();
                    break;
                }
                case PlayerActionTypes.READY_UP: {
                    this.readyUp();
                    break;
                }
                default: {
                    log(`Unhandled action type for player ${this.name}`);
                    break;
                }
            }
        }

        this.lastReceivedPacketIndex = packet.index;
        ack(true, packet.index);
    }

    private setSocket(socket: Socket) {
        this.reconnectionSecret = uuid();

        this.incomingPacketRegistry = new IncomingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>(
            (opcode, handler) => socket.on(opcode, handler)
        );

        this.outgoingPacketRegistry = new OutgoingPacketRegistry<ServerToClientPacketDefinitions, ServerToClientPacketAcknowledgements>(
            (opcode, payload, ack) => socket.emit(opcode, payload, ack)
        );
    }
}

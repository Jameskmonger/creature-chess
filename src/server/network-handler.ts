import { GameHandler } from "./game-handler";

export enum IncomingPacketOpcodes {
    PURCHASE_CARD = "purchaseCard",
    REFRESH_CARDS = "refreshCards"
}

export enum OutgoingPacketOpcodes {
    CARDS_UPDATE = "cardsUpdate",
    BOARD_UPDATE = "boardUpdate"
}

export class NetworkHandler {
    private gameHandler: GameHandler;

    constructor(gameHandler: GameHandler) {
        this.gameHandler = gameHandler;
    }

    public receiveConnection(socket: SocketIO.Socket) {
        const player = this.gameHandler.createPlayer();

        this.gameHandler.addOutgoingPacketListener(
            player,
            (opcode: OutgoingPacketOpcodes, data: any) => {
                socket.emit(opcode, data);
            }
        );

        socket.on(IncomingPacketOpcodes.PURCHASE_CARD, (cardIndex: number) => {
            this.gameHandler.onPlayerPurchaseCard(player, cardIndex);
        });

        socket.on(IncomingPacketOpcodes.REFRESH_CARDS, () => {
            this.gameHandler.onPlayerRefreshCards(player);
        });

        this.gameHandler.onPlayerSetupComplete(player);
    }
}

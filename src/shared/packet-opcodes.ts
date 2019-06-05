import { TileCoordinates } from "./position";
import { GamePhase } from "./game-phase";
import { Piece, Card } from "./models";

export enum ServerToClientPacketOpcodes {
    CARDS_UPDATE = "cardsUpdate",
    PLAYER_LIST_UPDATE = "playerListUpdate",
    PHASE_UPDATE = "phaseUpdate",
    MONEY_UPDATE = "moneyUpdate",
    LEVEL_UPDATE = "levelUpdate",
    NEW_FEED_MESSAGE = "newFeedMessage"
}

export enum ClientToServerPacketOpcodes {
    JOIN_GAME = "joinGame",
    CREATE_GAME = "createGame",
    BUY_CARD = "buyCard",
    SELL_PIECE = "sellPiece",
    BUY_REROLL = "rerollCards",
    MOVE_PIECE_TO_BENCH = "movePieceToBench",
    MOVE_PIECE_TO_BOARD = "movePieceToBoard",
    BUY_XP = "buyXp",
    SEND_CHAT_MESSAGE = "sendChatMessage",
    FINISH_MATCH = "finishMatch",
    READY_UP = "readyUp"
}

export interface MovePiecePacket {
    id: string;
    from: TileCoordinates;
    to: TileCoordinates;
}

export type BoardUpatePacket = {
    pieces: Piece[];
};

export interface LevelUpdatePacket {
    level: number;
    xp: number;
}

interface PreparingPhasePacket {
    round: number;
    pieces: Piece[];
    bench: Piece[];
    cards: Card[];
}

export type PhaseUpdatePacket
    = ({ phase: GamePhase.PREPARING, payload: PreparingPhasePacket })
    | ({ phase: GamePhase.READY, payload: { pieces: Piece[], opponentId: string } })
    | ({ phase: GamePhase.PLAYING })
    | ({ phase: GamePhase.DEAD });

export interface JoinGameResponse {
    error?: string;
    response?: {
        playerId: string;
        gameId: string;
    };
}

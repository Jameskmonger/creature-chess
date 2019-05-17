import { TileCoordinates } from "./position";
import { PokemonPiece } from "./pokemon-piece";
import { GamePhase } from "./game-phase";

export enum ServerToClientPacketOpcodes {
    CARDS_UPDATE = "cardsUpdate",
    BOARD_UPDATE = "boardUpdate",
    BENCH_UPDATE = "benchUpdate",
    PLAYER_LIST_UPDATE = "playerListUpdate",
    PHASE_UPDATE = "phaseUpdate",
    MONEY_UPDATE = "moneyUpdate",
    LEVEL_UPDATE = "levelUpdate",
    NEW_FEED_MESSAGE = "newFeedMessage"
}

export enum ClientToServerPacketOpcodes {
    JOIN_GAME = "joinGame",
    BUY_CARD = "buyCard",
    SELL_PIECE = "sellPiece",
    BUY_REROLL = "rerollCards",
    MOVE_PIECE_TO_BENCH = "movePieceToBench",
    MOVE_PIECE_TO_BOARD = "movePieceToBoard",
    BUY_XP = "buyXp",
    SEND_CHAT_MESSAGE = "sendChatMessage",
    FINISH_MATCH = "finishMatch"
}

export interface MovePiecePacket {
    id: string;
    from: TileCoordinates;
    to: TileCoordinates;
}

export type BoardUpatePacket = {
    pieces: PokemonPiece[];
};

export interface LevelUpdatePacket {
    level: number;
    xp: number;
}

export type PhaseUpdatePacket
    = ({ phase: GamePhase.PREPARING, payload: { pieces: PokemonPiece[] } })
        | ({ phase: GamePhase.READY, payload: { pieces: PokemonPiece[], opponentId: string }})
        | ({ phase: GamePhase.PLAYING })
        | ({ phase: GamePhase.DEAD });

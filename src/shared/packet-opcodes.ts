import { TileCoordinates } from "./position";
import { PokemonPiece } from "./pokemon-piece";
import { GamePhase } from "./game-phase";

export enum ServerToClientPacketOpcodes {
    CARDS_UPDATE = "cardsUpdate",
    BOARD_UPDATE = "boardUpdate",
    BENCH_UPDATE = "benchUpdate",
    PLAYER_LIST_UPDATE = "playerListUpdate",
    JOINED_GAME = "joinedGame",
    PHASE_UPDATE = "phaseUpdate",
    MONEY_UPDATE = "moneyUpdate"
}

export enum ClientToServerPacketOpcodes {
    JOIN_GAME = "joinGame",
    PURCHASE_CARD = "purchaseCard",
    REROLL_CARDS = "rerollCards",
    MOVE_PIECE_TO_BENCH = "movePieceToBench",
    MOVE_PIECE_TO_BOARD = "movePieceToBoard"
}

export interface MovePiecePacket {
    id: string;
    from: TileCoordinates;
    to: TileCoordinates;
}

export type BoardUpatePacket = {
    pieces: PokemonPiece[];
};

export type PhaseUpdatePacket
    = ({ phase: GamePhase.PREPARING, payload: { pieces: PokemonPiece[] } })
        | ({ phase: GamePhase.READY, payload: { pieces: PokemonPiece[], opponentId: string }})
        | ({ phase: GamePhase.PLAYING, payload: { seed: number } })
        | ({ phase: GamePhase.DEAD });

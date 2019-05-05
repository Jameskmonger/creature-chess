import { string } from "prop-types";
import { TileCoordinates } from "./position";
import { PokemonPiece } from "./pokemon-piece";
import { GameState } from "./game-state";

export enum ServerToClientPacketOpcodes {
    CARDS_UPDATE = "cardsUpdate",
    BOARD_UPDATE = "boardUpdate",
    BENCH_UPDATE = "benchUpdate",
    PLAYER_LIST_UPDATE = "playerListUpdate",
    JOINED_GAME = "joinedGame",
    STATE_UPDATE = "stateUpdate",
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
    = ({ phase: GameState.PREPARING, payload: { pieces: PokemonPiece[] } })
        | ({ phase: GameState.READY, payload: { pieces: PokemonPiece[], opponentId: string }})
        | ({ phase: GameState.PLAYING, payload: { seed: number } });

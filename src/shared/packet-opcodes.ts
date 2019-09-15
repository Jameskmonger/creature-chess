import { TileCoordinates } from "./position";
import { GamePhase } from "./game-phase";
import { Piece, Card, LobbyPlayer } from "./models";

export enum ServerToClientPacketOpcodes {
    CARDS_UPDATE = "cardsUpdate",
    PLAYER_LIST_UPDATE = "playerListUpdate",
    PHASE_UPDATE = "phaseUpdate",
    MONEY_UPDATE = "moneyUpdate",
    LEVEL_UPDATE = "levelUpdate",
    NEW_FEED_MESSAGE = "newFeedMessage",
    LOBBY_PLAYER_UPDATE = "lobbyPlayerUpdate",
    START_GAME = "startGame",
    SHOP_LOCK_UPDATE = "shopLockUpdate"
}

export enum ClientToServerPacketOpcodes {
    FIND_GAME = "findGame",
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
    READY_UP = "readyUp",
    START_LOBBY_GAME = "startLobbyGame",
    TOGGLE_SHOP_LOCK = "toggleShopLock"
}

export interface StartGamePacket {
    gameId: string;
    localPlayerId: string;
    name: string;
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

export type ShopLockUpdatePacket = {
    locked: boolean;
};

export interface LobbyPlayerUpdatePacket {
    index: number;
    player: LobbyPlayer;
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

export interface JoinLobbyResponse {
    error?: string;
    response?: {
        playerId: string;
        lobbyId: string;
        players: LobbyPlayer[];
        startTimestamp: number;
        isHost: boolean;
    };
}

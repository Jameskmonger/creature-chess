import { Card, PieceModel, PlayerListPlayer } from "@creature-chess/models";
import { PlayerInfoState, GameState } from "@creature-chess/shared";
import { BoardState } from "@creature-chess/board";
import { Overlay } from "../ui/overlay";
import { LobbyState } from "../lobby";
import { UserState } from "../menu/auth/store/reducer";
import { ConnectionStatus } from "../networking";

export interface AppState {
    user: UserState;

    ui: UiState;

    lobby: LobbyState;
    game: GameState;

    playerInfo: PlayerInfoState;
    board: BoardState<PieceModel>;
    bench: BoardState<PieceModel>;
    cardShop: {
        cards: Card[],
        locked: boolean
    };

    playerList: PlayerListPlayer[];
}

export interface UiState {
    loading: boolean;
    connectionStatus: ConnectionStatus;
    selectedPieceId: string;
    currentOverlay: Overlay | null;
    winnerName: string;
    menuError: string;
}

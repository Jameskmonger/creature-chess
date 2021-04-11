import { GameInfoState, PlayerInfoState } from "@creature-chess/shared";
import { BoardState } from "@creature-chess/board";
import { Card, PieceModel, PlayerListPlayer } from "@creature-chess/models";

export type GameState = {
    gameInfo: GameInfoState;
    board: BoardState<PieceModel>;
    bench: BoardState<PieceModel>;

    playerInfo: PlayerInfoState;
    cardShop: {
        cards: Card[],
        locked: boolean
    };
    playerList: PlayerListPlayer[];
};

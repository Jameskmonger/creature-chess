import { combineReducers } from "redux";
import { BoardSlice } from "@creature-chess/board";
import { playerListReducer } from "../game/features";

import { GameInfoState, PlayerInfoState, playerInfoReducer, PlayerReducers, gameInfoReducer } from "@creature-chess/shared";
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

export const createGameReducer = ({ boardSlice, benchSlice }: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }) =>
    combineReducers({
        gameInfo: gameInfoReducer,
        board: boardSlice.boardReducer,
        bench: benchSlice.boardReducer,
        playerList: playerListReducer,
        playerInfo: playerInfoReducer,
        cardShop: PlayerReducers.cardShopReducer,
    });

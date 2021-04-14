import { combineReducers } from "redux";
import { BoardSlice } from "@creature-chess/board";
import { playerListReducer } from "../game/features";

import { RoundInfoState, PlayerInfoState, playerInfoReducer, PlayerReducers, roundInfoReducer } from "@creature-chess/gamemode";
import { BoardState } from "@creature-chess/board";
import { Card, PieceModel, PlayerListPlayer } from "@creature-chess/models";

export type GameState = {
    roundInfo: RoundInfoState;
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
        roundInfo: roundInfoReducer,
        board: boardSlice.boardReducer,
        bench: benchSlice.boardReducer,
        playerList: playerListReducer,
        playerInfo: playerInfoReducer,
        cardShop: PlayerReducers.cardShopReducer,
    });
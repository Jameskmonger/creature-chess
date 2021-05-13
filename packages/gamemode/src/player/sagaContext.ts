import { Logger } from "winston";
import { BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { Match } from "../game/match";

export type PlayerBoardSlices = {
    boardSlice: BoardSlice<PieceModel>,
    benchSlice: BoardSlice<PieceModel>
};
export type PlayerSagaDependencies = {
    getLogger: () => Logger;
    getMatch: () => Match;
};

export type PlayerSagaContext = {
    playerId: string;
    playerName: string;
    boardSlices: PlayerBoardSlices;
    dependencies: PlayerSagaDependencies;
};

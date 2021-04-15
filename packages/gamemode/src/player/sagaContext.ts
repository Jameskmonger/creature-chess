import { Logger } from "winston";
import { BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";

type PlayerBoardSlices = { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> };

export type PlayerSagaContext = {
    playerId: string;
    playerName: string;
    boardSlices: PlayerBoardSlices;
    dependencies: {
        getLogger: () => Logger;
    };
};

import * as React from "react";

import { PokemonPiece, PiecePosition } from "@common/pokemon-piece";
import { TileRows } from "./tileRows";

interface BoardProps {
    boardSize: number;
    pieces: PokemonPiece[];
}

const Board: React.FunctionComponent<BoardProps> = ({ boardSize, pieces }) => {
    return (
        <TileRows
            boardSize={boardSize}
            pieces={pieces}
        />
    );
};

export {
    Board
};

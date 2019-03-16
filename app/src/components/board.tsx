import * as React from "react";

import { PokemonPiece, PiecePosition } from "../models/pokemon-piece";
import { TileRows } from "./tileRows";

interface BoardProps {
    boardSize: number;
    pieces: PokemonPiece[];
    onMovePiece: (piece: PokemonPiece, position: PiecePosition) => void;
}

const Board: React.FunctionComponent<BoardProps> = ({ boardSize, onMovePiece, pieces }) => {
    return (
        <TileRows
            boardSize={boardSize}
            movePiece={onMovePiece}
            pieces={pieces}
        />
    );
};

export {
    Board
};

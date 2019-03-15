import * as React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import { PokemonPiece, PiecePosition, isSamePiece } from "../models/pokemon-piece";
import { TileRows } from './tileRows';

const boardSize = 8;

interface BoardProps {
    pieces: PokemonPiece[];
}

const BoardUnconnected: React.FunctionComponent<BoardProps> = (props) => {

    const [pieces, setPieces] = React.useState(props.pieces);

    const movePiece = (piece: PokemonPiece, position: PiecePosition) => {
        setPieces(pieces.map(p => isSamePiece(p, piece)
            ? { ...p, position }
            : p));
    };

    return (
        <TileRows 
            boardSize={boardSize}
            movePiece={movePiece}
            pieces={pieces}
        />
    );
};

export const Board = DragDropContext(HTML5Backend)(BoardUnconnected);

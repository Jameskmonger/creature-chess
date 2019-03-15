import * as React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import { PokemonPiece, PiecePosition } from "../models/pokemon-piece";
import { TileRows } from './tileRows';

const boardSize = 8;

interface BoardProps {
    pieces: PokemonPiece[];
    onMovePiece: (piece: PokemonPiece, position: PiecePosition) => void;
}

const BoardUnconnected: React.FunctionComponent<BoardProps> = (props) => {
    return (
        <TileRows
            boardSize={boardSize}
            movePiece={props.onMovePiece}
            pieces={props.pieces}
        />
    );
};

const Board = DragDropContext(HTML5Backend)(BoardUnconnected);

export { Board };

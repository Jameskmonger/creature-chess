import * as React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import { PokemonPiece, PiecePosition, isSamePiece } from "../models/pokemon-piece";
import { TileRow } from './tileRow';


const boardSize = 8;

interface BoardProps {
    pieces: PokemonPiece[]
}

const BoardUnconnected: React.FunctionComponent<BoardProps> = (props) => {

    const [pieces, setPieces] = React.useState(props.pieces);

    const movePiece = (piece: PokemonPiece, position: PiecePosition) => {
        setPieces(pieces.map(p => isSamePiece(p, piece)
            ? { ...p, position }
            : p));
    };

    const tileRows = [];

    for (let y = 0; y < boardSize; y++) {
        const rowPieces = pieces.filter(p => p.position[1] === y);

        const moveRowPiece = (p: PokemonPiece, col: number) => movePiece(p, [col, y]);

        tileRows.push(
            <TileRow 
                key={`tile-row-${y}`} 
                y={y} 
                pieces={rowPieces} 
                boardSize={boardSize}
                movePiece={moveRowPiece}
            />
        );
    }

    return (
        <div className="chessboard">
            {tileRows}
        </div>
    );
};

export const Board = DragDropContext(HTML5Backend)(BoardUnconnected);

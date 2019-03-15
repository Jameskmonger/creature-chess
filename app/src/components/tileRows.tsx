import * as React from "react";

import { PokemonPiece, PiecePosition } from '../models/pokemon-piece';
import { TileRow } from './tileRow';

interface TileRowsProps {
    boardSize: number;
    movePiece: (piece: PokemonPiece, position: PiecePosition) => void;
    pieces: PokemonPiece[];
}

const TileRows: React.FunctionComponent<TileRowsProps> = ({ boardSize, movePiece, pieces }) => {

    const tileRows = [];

    for (let y = 0; y < boardSize; y++) {
        const rowPieces = pieces.filter(p => p.position[1] === y);

        const moveRowPiece = (p: PokemonPiece, col: number) => movePiece(p, [col, y]);
        const isFriendlyRow = y >= boardSize / 2;

        tileRows.push(
            <TileRow
                key={`tile-row-${y}`}
                y={y}
                pieces={rowPieces}
                boardSize={boardSize}
                movePiece={moveRowPiece}
                friendly={isFriendlyRow}
            />
        );
    }

    return (
        <div className="chessboard">
            {tileRows}
        </div>
    );
}

export { TileRows };

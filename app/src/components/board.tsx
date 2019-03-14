import * as React from "react";
import { PokemonPiece } from "../models/pokemon-piece";
import { TileRow } from './tileRow';

const boardSize = 8;

interface BoardProps {
    pieces: PokemonPiece[]
}

const Board: React.FunctionComponent<BoardProps> = (props) => {

    const [pieces, setPieces] = React.useState(props.pieces);

    const tileRows = [];

    for (let y = 0; y < boardSize; y++) {
        const rowPieces = pieces.filter(p => p.position[1] === y);

        tileRows.push(
            <TileRow 
                key={`tile-row-${y}`} 
                y={y} 
                pieces={rowPieces} 
                boardSize={boardSize}
            />
        );
    }

    return (
        <div className="chessboard">
            {tileRows}
        </div>
    );
};

export { Board };

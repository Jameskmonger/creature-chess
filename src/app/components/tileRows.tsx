import * as React from "react";

import { PokemonPiece, PiecePosition } from "@common/pokemon-piece";
import { TileRow } from "./tileRow";

interface TileRowsProps {
    boardSize: number;
    pieces: PokemonPiece[];
}

const TileRows: React.FunctionComponent<TileRowsProps> = ({ boardSize, pieces }) => {

    const tileRows = [];

    for (let y = 0; y < boardSize; y++) {
        const rowPieces = pieces.filter(p => p.position[1] === y);
        const isFriendlyRow = y >= boardSize / 2;

        tileRows.push(
            <TileRow
                key={`tile-row-${y}`}
                y={y}
                pieces={rowPieces}
                boardSize={boardSize}
                friendly={isFriendlyRow}
            />
        );
    }

    return (
        <>
            {tileRows}
        </>
    );
};

export { TileRows };

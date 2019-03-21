import * as React from "react";

import { PokemonPiece } from "@common/pokemon-piece";
import { TileRow } from "./tileRow";

interface TileRowsProps {
    boardSize: number;
}

const TileRows: React.FunctionComponent<TileRowsProps> = ({ boardSize }) => {

    const tileRows = [];

    for (let y = 0; y < boardSize; y++) {
        const isFriendlyRow = y >= boardSize / 2;

        tileRows.push(
            <TileRow
                key={`tile-row-${y}`}
                y={y}
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

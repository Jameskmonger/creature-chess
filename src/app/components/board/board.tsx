import * as React from "react";

import { BoardRow } from "./boardRow";
import { Constants } from "../../../shared";

const Board: React.FunctionComponent = props => {
    const rows = [];

    for (let y = 0; y < Constants.GRID_SIZE; y++) {
        const isFriendlyRow = y >= Constants.GRID_SIZE / 2;

        rows.push(
            <BoardRow
                key={`tile-row-${y}`}
                y={y}
            />
        );
    }

    return (
        <>
            {rows}
        </>
    );
};

export { Board };

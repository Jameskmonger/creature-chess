import * as React from "react";

import { BoardRow } from "./boardRow";
import { Constants } from "@common";

const Board: React.FunctionComponent = props => {
    const rows = [];

    for (let y = 0; y < Constants.GRID_SIZE; y++) {
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

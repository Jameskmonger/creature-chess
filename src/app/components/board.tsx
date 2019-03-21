import * as React from "react";

import { TileRows } from "./tileRows";

interface BoardProps {
    boardSize: number;
}

const Board: React.FunctionComponent<BoardProps> = ({ boardSize }) => {
    return (
        <TileRows
            boardSize={boardSize}
        />
    );
};

export {
    Board
};

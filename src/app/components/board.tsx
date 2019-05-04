import * as React from "react";

import { TileRows } from "./tileRows";
import { Constants } from "../../shared";


const Board: React.FunctionComponent = props => {
    return (
        <TileRows
            boardSize={Constants.GRID_SIZE}
        />
    );
};

export {
    Board
};

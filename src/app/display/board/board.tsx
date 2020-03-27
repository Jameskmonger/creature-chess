import * as React from "react";
import { Constants, GamePhase } from "@common/models";

import { BoardRow } from "./boardRow";
import { OpponentBoardPlaceholder } from "./opponentBoardPlaceholder";
import { useSelector } from "react-redux";
import { AppState } from "@app/store";

const Board: React.FunctionComponent = props => {
    const showOpponentBoardPlaceholder = useSelector<AppState, boolean>(
        state => state.game.phase === GamePhase.WAITING || state.game.phase === GamePhase.PREPARING);

    const rows = [];

    // opponentBoardContents takes up half the board if present
    const startingRow = showOpponentBoardPlaceholder ? (Constants.GRID_SIZE / 2) : 0;

    for (let y = startingRow; y < Constants.GRID_SIZE; y++) {
        rows.push(
            <BoardRow
                key={`tile-row-${y}`}
                y={y}
            />
        );
    }

    return (
        <>
            {showOpponentBoardPlaceholder && <OpponentBoardPlaceholder />}
            {rows}
        </>
    );
};

export { Board };

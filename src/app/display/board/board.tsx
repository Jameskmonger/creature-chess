import * as React from "react";
import { Constants, GamePhase } from "@common/models";

import { BoardRow } from "./boardRow";
import { OpponentBoardPlaceholder } from "./opponentBoardPlaceholder";
import { useSelector } from "react-redux";
import { AppState } from "@app/store";
import { TileStyle } from "@common/models/position";

const Board: React.FunctionComponent = props => {
    const showOpponentBoardPlaceholder = useSelector<AppState, boolean>(
        state => state.game.phase === GamePhase.WAITING || state.game.phase === GamePhase.PREPARING);

    const localPlayerStyle = TileStyle.DEFAULT;
    const opponentStyle = TileStyle.DEFAULT;

    const rows = [];

    if (!showOpponentBoardPlaceholder) {
        for (let y = 0; y < Constants.GRID_SIZE / 2; y++) {
            rows.push(
                <BoardRow
                    key={`tile-row-${y}`}
                    y={y}
                    tileStyle={opponentStyle}
                />
            );
        }
    }

    for (let y = Constants.GRID_SIZE / 2; y < Constants.GRID_SIZE; y++) {
        rows.push(
            <BoardRow
                key={`tile-row-${y}`}
                y={y}
                tileStyle={localPlayerStyle}
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

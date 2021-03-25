import * as React from "react";
import { useSelector } from "react-redux";
import { Constants, GamePhase } from "@creature-chess/models";
import { AppState } from "../../../store";
import { PieceComponent } from "./piece/pieceComponent";
import { BoardRow } from "./boardRow";
import { OpponentBoardPlaceholder } from "./overlays/opponentBoardPlaceholder";
import { Announcement } from "./overlays/announcement";
import { VictoryOverlay } from "./overlays/victoryOverlay";
import { ReconnectModal } from "./overlays/reconnectModal";
import { MatchRewardsOverlay } from "./overlays/matchRewardsOverlay";

const BoardPieces: React.FunctionComponent = props => {
    const inPreparingPhase = useSelector<AppState, boolean>(state => state.game.phase === GamePhase.PREPARING);
    const pieces = useSelector<AppState, { [key: string]: string }>(state => state.board.piecePositions);

    const pieceElements: React.ReactNode[] = [];

    for (const [ position, id ] of Object.entries(pieces)) {
        if (!id) {
            continue;
        }

        const [ x, y ] = position.split(",");

        pieceElements.push(
            <div key={id} className={`positionable-piece x-${x} y-${y}`}>
                <PieceComponent id={id} draggable={inPreparingPhase} animate={!inPreparingPhase} />
            </div>
        );
    }

    return (
        <>
            {pieceElements}
        </>
    );
};

const Board: React.FunctionComponent = props => {
    const showOpponentBoardPlaceholder = useSelector<AppState, boolean>(
        state => state.game.phase === GamePhase.PREPARING);

    const rows = [];

    if (!showOpponentBoardPlaceholder) {
        for (let y = 0; y < Constants.GRID_SIZE.height / 2; y++) {
            rows.push(
                <BoardRow
                    key={`tile-row-${y}`}
                    y={y}
                />
            );
        }
    }

    for (let y = Constants.GRID_SIZE.height / 2; y < Constants.GRID_SIZE.height; y++) {
        rows.push(
            <BoardRow
                key={`tile-row-${y}`}
                y={y}
            />
        );
    }

    return (
        <div className="chessboard">
            {showOpponentBoardPlaceholder && <OpponentBoardPlaceholder />}
            {rows}
            <BoardPieces />

            <Announcement />
            <VictoryOverlay />
            <MatchRewardsOverlay />
            <ReconnectModal />
        </div>
    );
};

export { Board };

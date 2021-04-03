import * as React from "react";
import { useSelector } from "react-redux";
import { Constants, GamePhase, GRID_SIZE } from "@creature-chess/models";
import { AppState } from "../../../store";
import { PieceComponent } from "./piece/pieceComponent";
import { OpponentBoardPlaceholder } from "./overlays/opponentBoardPlaceholder";
import { Announcement } from "./overlays/announcement";
import { VictoryOverlay } from "./overlays/victoryOverlay";
import { ReconnectModal } from "./overlays/reconnectModal";
import { MatchRewardsOverlay } from "./overlays/matchRewardsOverlay";
import { BoardContextProvider } from "../../board/context";
import { BoardState } from "packages/shared/lib";
import { BoardGrid } from "../../board/BoardGrid";
import { PositionablePiece } from "./piece/positionablePiece";

const BoardPieces: React.FunctionComponent = props => {
    const inPreparingPhase = useSelector<AppState, boolean>(state => state.game.phase === GamePhase.PREPARING);
    const pieces = useSelector<AppState, { [key: string]: string }>(state => state.board.piecePositions);
    const selectedPieceId = useSelector<AppState, string>(state => state.ui.selectedPieceId);

    const pieceElements: React.ReactNode[] = [];

    for (const [ position, id ] of Object.entries(pieces)) {
        if (!id) {
            continue;
        }

        const selected = id === selectedPieceId;

        const [ x, y ] = position.split(",");

        pieceElements.push(<PositionablePiece key={id} id={id} x={x} y={y} draggable={inPreparingPhase} animate={!inPreparingPhase} selected={selected} />);
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

    const board = useSelector<AppState, BoardState>(state => state.board);

    return (
        <div className="chessboard">
            {showOpponentBoardPlaceholder && <OpponentBoardPlaceholder />}

            <BoardContextProvider value={board}>
                <BoardGrid showOpponentHalf={!showOpponentBoardPlaceholder} width={GRID_SIZE.width} playerHeight={GRID_SIZE.height / 2} />
            </BoardContextProvider>

            <BoardPieces />

            <Announcement />
            <VictoryOverlay />
            <MatchRewardsOverlay />
            <ReconnectModal />
        </div>
    );
};

export { Board };

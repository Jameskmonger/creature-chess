import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragObjectWithType } from "react-dnd";
import { Dispatch } from "redux";
import { GamePhase, PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { BenchState, BoardState, BoardSelectors, PlayerActions } from "@creature-chess/shared";
import { AppState } from "../../../store";
import { OpponentBoardPlaceholder } from "./overlays/opponentBoardPlaceholder";
import { Announcement } from "./overlays/announcement";
import { VictoryOverlay } from "./overlays/victoryOverlay";
import { ReconnectOverlay } from "./overlays/reconnectOverlay";
import { MatchRewardsOverlay } from "./overlays/matchRewardsOverlay";
import { BoardContextProvider } from "../../board/context";
import { BoardGrid } from "../../board/BoardGrid";
import { PositionablePiece } from "./piece/positionablePiece";
import { clearSelectedPiece } from "./actions";

const BoardPieces: React.FunctionComponent = props => {
    const inPreparingPhase = useSelector<AppState, boolean>(state => state.game.phase === GamePhase.PREPARING);
    const pieces = useSelector<AppState, { [key: string]: string }>(state => state.board.piecePositions);
    const selectedPieceId = useSelector<AppState, string>(state => state.ui.selectedPieceId);

    const pieceElements: React.ReactNode[] = [];

    // this weird code is needed so that React keeps the same DOM elements, thus preserving the CSS animations
    const entries = Object.entries(pieces);
    entries.sort(([ aPosition, aId ], [bPosition, bId]) => aId.localeCompare(bId));

    for (const [position, id] of entries) {
        if (!id) {
            continue;
        }

        const selected = id === selectedPieceId;

        const [x, y] = position.split(",");

        pieceElements.push(<PositionablePiece key={id} id={id} x={x} y={y} draggable={inPreparingPhase} animate={!inPreparingPhase} selected={selected} />);
    }

    return (
        <div className="board-pieces">
            {pieceElements}
        </div>
    );
};

const getLocationForPiece = (pieceId: string, board: BoardState, bench: BenchState): PlayerPieceLocation => {
    if (board) {
        const boardPiecePosition = BoardSelectors.getPiecePosition(board, pieceId);

        if (boardPiecePosition) {
            return {
                type: "board",
                location: boardPiecePosition
            }
        }
    }

    if (bench) {
        const benchSlot = bench.pieces.findIndex(p => p !== null && p.id === pieceId);

        if (benchSlot > -1) {
            return {
                type: "bench",
                location: { slot: benchSlot }
            }
        }
    }

    return null;
};

const onDropPiece = (dispatch: Dispatch<any>, board: BoardState, bench: BenchState) =>
    (item: DragObjectWithType, location: PlayerPieceLocation) => {
        const piece: PieceModel = (item as any).piece;
        const from = getLocationForPiece(piece.id, board, bench);

        // todo `from` is here as a safety check, is it needed?
        dispatch(PlayerActions.playerDropPieceAction(piece.id, from, location));
        dispatch(clearSelectedPiece());
    };

const Board: React.FunctionComponent = props => {
    const dispatch = useDispatch();

    const showOpponentBoardPlaceholder = useSelector<AppState, boolean>(
        state => state.game.phase === GamePhase.PREPARING);

    // todo decouple this, make a playerDropPiece saga
    const board = useSelector<AppState, BoardState>(state => state.board);
    const bench = useSelector<AppState, BenchState>(state => state.bench);

    const onTileClick = (location: PlayerPieceLocation) => dispatch(PlayerActions.playerClickTileAction(location));

    return (
        <div className="chessboard">
            {showOpponentBoardPlaceholder && <OpponentBoardPlaceholder />}

            <div className="board-tiles">
                <BoardContextProvider value={board}>
                    <BoardGrid
                        onDrop={onDropPiece(dispatch, board, bench)}
                        onClick={onTileClick}
                    />
                </BoardContextProvider>

                <BoardPieces />
            </div>

            <Announcement />
            <VictoryOverlay />
            <MatchRewardsOverlay />
            <ReconnectOverlay />
        </div>
    );
};

export { Board };

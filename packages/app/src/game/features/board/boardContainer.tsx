import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragObjectWithType } from "react-dnd";
import { Dispatch } from "redux";
import { GamePhase, PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { BoardState, BoardSelectors, PlayerActions } from "@creature-chess/shared";
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
import { NowPlaying } from "../nowPlaying";

type BoardPiecesProps = {
    piecePositions: { [key: string]: string },
    draggable: boolean;
    animate: boolean;
    pieceIsOnBench?: boolean;
}

const BoardPieces: React.FunctionComponent<BoardPiecesProps> = ({ piecePositions, draggable, animate, pieceIsOnBench = false }) => {
    const selectedPieceId = useSelector<AppState, string>(state => state.ui.selectedPieceId);

    const pieceElements: React.ReactNode[] = [];

    // this weird code is needed so that React keeps the same DOM elements, thus preserving the CSS animations
    const entries = Object.entries(piecePositions);
    entries.sort(([aPosition, aId], [bPosition, bId]) => aId.localeCompare(bId));

    for (const [position, id] of entries) {
        if (!id) {
            continue;
        }

        const selected = id === selectedPieceId;

        const [x, y] = position.split(",");

        pieceElements.push(<PositionablePiece key={id} id={id} x={x} y={y} draggable={draggable} animate={animate} selected={selected} pieceIsOnBench={pieceIsOnBench} />);
    }

    return <div className="board-pieces">{pieceElements}</div>;
};

const getLocationForPiece = (pieceId: string, board: BoardState, bench: BoardState): PlayerPieceLocation => {
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
        const benchPiecePosition = BoardSelectors.getPiecePosition(bench, pieceId);

        if (benchPiecePosition !== undefined) {
            return {
                type: "bench",
                location: benchPiecePosition
            }
        }
    }

    return null;
};

const onDropPiece = (dispatch: Dispatch<any>, locationType: "board" | "bench", board: BoardState, bench: BoardState) =>
    (item: DragObjectWithType, x: number, y: number) => {
        const piece: PieceModel = (item as any).piece;
        const from = getLocationForPiece(piece.id, board, bench);

        const location: PlayerPieceLocation = {
            type: locationType,
            location: { x, y }
        };

        // todo `from` is here as a safety check, is it needed?
        dispatch(PlayerActions.playerDropPieceAction(piece.id, from, location));
        dispatch(clearSelectedPiece());
    };

const onTileClick = (dispatch: Dispatch<any>, locationType: "board" | "bench") =>
    (x: number, y: number) => dispatch(PlayerActions.playerClickTileAction({ type: locationType, location: { x, y } }));

const BoardContainer: React.FunctionComponent<{ showNowPlaying?: boolean }> = ({ showNowPlaying = false }) => {
    const dispatch = useDispatch();

    // todo decouple this, make a playerDropPiece saga
    const board = useSelector<AppState, BoardState>(state => state.board);
    const bench = useSelector<AppState, BoardState>(state => state.bench);

    const inPreparingPhase = useSelector<AppState, boolean>(state => state.game.phase === GamePhase.PREPARING);

    return (
        <div className="group board-container">
            { showNowPlaying && <NowPlaying />}

            <div className="chessboard">
                {inPreparingPhase && <OpponentBoardPlaceholder />}

                <div className="board-tiles">
                    <BoardGrid
                        state={board}
                        onDrop={onDropPiece(dispatch, "board", board, bench)}
                        onClick={onTileClick(dispatch, "board")}
                    />

                    <BoardPieces piecePositions={board.piecePositions} draggable={inPreparingPhase} animate={!inPreparingPhase} />
                </div>

                <Announcement />
                <VictoryOverlay />
                <MatchRewardsOverlay />
                <ReconnectOverlay />
            </div>

            <div className="bench">
                <BoardContextProvider value={bench}>
                    <BoardGrid
                        state={bench}
                        className="bench"
                        onDrop={onDropPiece(dispatch, "bench", board, bench)}
                        onClick={onTileClick(dispatch, "bench")}
                    />
                </BoardContextProvider>

                <BoardPieces piecePositions={bench.piecePositions} draggable animate={false} pieceIsOnBench />
            </div>
        </div>
    );
};

export { BoardContainer };

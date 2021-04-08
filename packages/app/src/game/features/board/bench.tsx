import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { BoardSelectors, BoardState, PlayerActions } from "@creature-chess/shared";
import { AppState } from "../../../store";
import { PositionablePiece } from "./piece/positionablePiece";
import { DragObjectWithType } from "react-dnd";
import { clearSelectedPiece } from "./actions";
import { BoardContextProvider } from "../../board/context";
import { BoardGrid } from "../../board/BoardGrid";

const BenchPieces: React.FunctionComponent = () => {
    const pieces = useSelector<AppState, { [key: string]: string }>(state => state.bench.piecePositions);
    const selectedPieceId = useSelector<AppState, string>(state => state.ui.selectedPieceId);

    const pieceElements: React.ReactNode[] = [];

    const entries = Object.entries(pieces);
    entries.sort(([aPosition, aId], [bPosition, bId]) => aId.localeCompare(bId));

    for (const [position, id] of entries) {
        if (!id) {
            continue;
        }

        const selected = id === selectedPieceId;

        const [x, y] = position.split(",");

        pieceElements.push(<PositionablePiece key={id} id={id} x={x} y={y} draggable animate={false} selected={selected} pieceIsOnBench />);
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

const onDropPiece = (dispatch: Dispatch<any>, board: BoardState, bench: BoardState) =>
    ({ piece }: DragObjectWithType & { piece: PieceModel }, x: number, y: number) => {
        const from = getLocationForPiece(piece.id, board, bench);

        const location: PlayerPieceLocation = {
            type: "bench",
            location: { x, y }
        };

        // todo `from` is here as a safety check, is it needed?
        dispatch(PlayerActions.playerDropPieceAction(piece.id, from, location));
        dispatch(clearSelectedPiece());
    };

const onTileClick = (dispatch: Dispatch<any>) =>
    (x: number, y: number ) => dispatch(PlayerActions.playerClickTileAction({ type: "bench", location: { x, y } }));

const Bench: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const board = useSelector<AppState, BoardState>(state => state.board);
    const bench = useSelector<AppState, BoardState>(state => state.bench);

    return (
        <div className="bench">
            <BoardContextProvider value={bench}>
                <BoardGrid
                    state={bench}
                    className="bench"
                    onDrop={onDropPiece(dispatch, board, bench)}
                    onClick={onTileClick(dispatch)}
                />
            </BoardContextProvider>

            <BenchPieces />
        </div>
    );
};

export { Bench };

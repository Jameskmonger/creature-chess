import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Constants, PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { BoardSelectors, BoardState, PlayerActions } from "@creature-chess/shared";
import { AppState } from "../../../store";
import { PositionablePiece } from "./piece/positionablePiece";
import { UndroppableTile } from "../../board/tile/UndroppableTile";
import { DroppableTile } from "../../board/tile/DroppableTile";
import { DragObjectWithType } from "react-dnd";
import { clearSelectedPiece } from "./actions";

const BenchPieces: React.FunctionComponent = () => {
    const pieces = useSelector<AppState, { [key: string]: string }>(state => state.bench.piecePositions);
    const selectedPieceId = useSelector<AppState, string>(state => state.ui.selectedPieceId);

    const pieceElements: React.ReactNode[] = [];

    const entries = Object.entries(pieces);
    entries.sort(([ aPosition, aId ], [bPosition, bId]) => aId.localeCompare(bId));

    for (const [position, id] of entries) {
        if (!id) {
            continue;
        }

        const selected = id === selectedPieceId;

        const [x, y] = position.split(",");

        pieceElements.push(<PositionablePiece key={id} id={id} x={x} y={y} draggable animate={false} selected={selected} pieceIsOnBench />);
    }

    return (
        <>
            {pieceElements}
        </>
    );
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
    ({ piece }: DragObjectWithType & { piece: PieceModel }, location: PlayerPieceLocation) => {
        const from = getLocationForPiece(piece.id, board, bench);

        // todo `from` is here as a safety check, is it needed?
        dispatch(PlayerActions.playerDropPieceAction(piece.id, from, location));
        dispatch(clearSelectedPiece());
    };

const Bench: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const board = useSelector<AppState, BoardState>(state => state.board);
    const bench = useSelector<AppState, BoardState>(state => state.bench);

    const { locked, pieces } = useSelector<AppState, BoardState>(state => state.bench);
    const tiles = [];

    for (let x = 0; x < Constants.GRID_SIZE.width; x++) {
        const location: PlayerPieceLocation = {
            type: "bench",
            location: {
                x,
                y: 0
            }
        };
        const tileEmpty = !pieces[x];

        const onTileClick = (location: PlayerPieceLocation) => dispatch(PlayerActions.playerClickTileAction(location));

        if (locked || !tileEmpty) {
            tiles.push(
                <UndroppableTile key={`tile-${x}`} className="bench" />
            );
        } else {
            tiles.push(
                <DroppableTile
                    key={`tile-${x}`}
                    className="bench"
                    location={location}
                    onDrop={onDropPiece(dispatch, board, bench)}
                    onClick={onTileClick}
                />
            );
        }
    }

    return (
        <div className="bench">
            {tiles}
            <BenchPieces />
        </div>
    );
};

export { Bench };

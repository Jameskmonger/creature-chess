import * as React from "react";
import { useDrop } from "react-dnd";
import { TileType, TileStyle } from "@common/models/position";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "@app/store";
import { getClassForTileStyle } from "../getClassForTileStyle";
import { selectPiece } from "@app/store/actions/boardActions";
import { GamePhase, PieceModel, PlayerPieceLocation } from "@common/models";
import { getPiece } from "@common/player/pieceSelectors";
import { playerDropPiece } from "@common/player/actions";
import { clearSelectedPiece } from "@app/store/actions/gameActions";
import { PieceComponent } from "../../piece/pieceComponent";
import { ownedPieceSelector, boardTilePieceSelector, benchTilePieceSelector } from "@app/store/pieceSelectors";
import { Dispatch } from "redux";
import { canDropPiece } from "@common/board";

interface TileProps {
    x: number;
    y: number;
    type: TileType;
    tileStyle: TileStyle;
}

// tslint:disable-next-line:no-bitwise
const isBoardTileDark = (x: number, y: number) => ((y ^ x) & 1) !== 0;

const getClassName = (tileType: TileType, x: number, y: number) => {
    if (tileType === TileType.BENCH) {
        return "bench";
    }

    return isBoardTileDark(x, y) ? "dark" : "light";
};

const getOverlayClassName = (isDragging: boolean, canDrop: boolean) => {
    if (isDragging && canDrop === false) {
        return "overlay not-allowed";
    }

    return "overlay";
};

const onDropPiece = (dispatch: Dispatch, piece: PieceModel, type: TileType, x: number, y: number) => {
    const from: PlayerPieceLocation = (
        piece.position.y !== null
            ? ({
                type: "board",
                location: { x: piece.position.x, y: piece.position.y }
            })
            : ({
                type: "bench",
                location: { slot: piece.position.x }
            })
    );

    const to: PlayerPieceLocation = (
        type === TileType.BOARD
            ? ({
                type: "board",
                location: { x, y }
            })
            : ({
                type: "bench",
                location: { slot: x }
            })
    );

    dispatch(playerDropPiece(piece.id, from, to));
    dispatch(clearSelectedPiece());
};

const Tile: React.FunctionComponent<TileProps> = ({ x, y, type, tileStyle }) => {
    const dispatch = useDispatch();

    const piece = useSelector<AppState, PieceModel>(state => (
        type === TileType.BOARD
            ? boardTilePieceSelector(state, { x, y })
            : benchTilePieceSelector(state, { x })
    ));

    const boardLocked = useSelector<AppState, boolean>(state => state.board.locked);
    const belowPieceLimit = useSelector<AppState, boolean>(state => ownedPieceSelector(state).length < state.localPlayer.level);
    const canMovePiece = useSelector<AppState, boolean>(state => state.game.phase === GamePhase.PREPARING || type === TileType.BENCH);
    const selectedPiece = useSelector<AppState, PieceModel>(state => state.game.selectedPieceId ? getPiece(state, state.game.selectedPieceId) : null);
    const isSelected = piece && selectedPiece && piece.id === selectedPiece.id;

    const [{ canDrop, isDragging }, drop] = useDrop({
        accept: "Piece",
        drop: item => onDropPiece(dispatch, (item as any).piece, type, x, y),
        canDrop: (item) => canDropPiece((item as any).piece, x, y, piece === null, boardLocked, belowPieceLimit),
        collect: monitor => ({
            canDrop: !!monitor.canDrop(),
            isDragging: !!monitor.getItem(),
        }),
    });

    // this can be improved by having a piece movement saga
    // that just listens for clicks and drops
    const onClick = () => {
        if (piece && canMovePiece) {
            dispatch(selectPiece(piece.id));
            return;
        }

        if (selectedPiece) {
            onDropPiece(dispatch, selectedPiece, type, x, y);
            return;
        }
    };

    const isBoard = type === TileType.BOARD;

    return (
        <div
            ref={drop}
            className={`tile ${getClassName(type, x, y)}${isSelected ? " selected" : ""} ${getClassForTileStyle(tileStyle)}`}
            touch-action="none"
            onPointerUp={onClick}
        >
            {!isBoard && piece && <PieceComponent key={piece.id} id={piece.id} draggable={canMovePiece} animate={isBoard} />}

            <div className={`${getOverlayClassName(isDragging, canDrop)}`} />
        </div>
    );
};

export { Tile };

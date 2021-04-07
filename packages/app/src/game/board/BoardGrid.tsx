import * as React from "react";
import { PieceModel } from "@creature-chess/models";
import { BoardState } from "@creature-chess/shared";
import { BoardContextProvider, useBoard } from "./context";
import { UndroppableTile } from "./tile/UndroppableTile";
import { DroppableTile } from "./tile/DroppableTile";
import { DragObjectWithType } from "react-dnd";
import { BoardItems, BoardItemRenderFn } from "./BoardItems";

type BoardGridProps = {
    state: BoardState;
    className?: string;
    renderItem: BoardItemRenderFn;
    onDrop: (item: DragObjectWithType & { piece: PieceModel }, x: number, y: number) => void;
    onClick: (x: number, y: number) => void;
}

const isBoardTileDark = (x: number, y: number) => ((y ^ x) & 1) !== 0;
const getClassName = (x: number, y: number) => isBoardTileDark(x, y) ? "dark" : "light";

const BoardRows: React.FunctionComponent<Partial<BoardGridProps>> = ({ className = "", onDrop, onClick }) => {
    const { locked, piecePositions, size: { width, height } } = useBoard();

    const rows = [];

    for (let y = 0; y < height; y++) {
        const tiles = [];

        for (let x = 0; x < width; x++) {
            const tileClassName = `${className} ${getClassName(x, y)}`;
            const piecePositionKey = `${x},${y}`;

            const tileContainsPiece = Boolean(piecePositions[piecePositionKey]);

            tiles.push(
                (!tileContainsPiece && !locked)
                    ? <DroppableTile key={`tile-${x}`} className={tileClassName} x={x} y={y} onDrop={onDrop} onClick={onClick} />
                    : <UndroppableTile key={`tile-${x}`} className={tileClassName} />
            );
        }

        rows.push(<div key={`row-${y}`} className={`tile-row style-default`}>{tiles}</div>);
    }

    return <>{rows}</>;
};

const BoardGrid: React.FunctionComponent<BoardGridProps> = ({ state, className = "", renderItem, onDrop, onClick }) => (
    <BoardContextProvider value={state}>
        <BoardRows className={className} onDrop={onDrop} onClick={onClick} />

        <BoardItems render={renderItem} />
    </BoardContextProvider>
);

export { BoardGrid };

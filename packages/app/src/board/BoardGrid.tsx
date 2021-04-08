import * as React from "react";
import { BoardState, HasId } from "@creature-chess/board";
import { BoardContextProvider, useBoard } from "./context";
import { UndroppableTile } from "./tile/UndroppableTile";
import { DroppableTile } from "./tile/DroppableTile";
import { DragObjectWithType } from "react-dnd";
import { BoardItems, BoardItemRenderFn } from "./BoardItems";

type BoardGridProps = {
    state: BoardState;
    renderItem: BoardItemRenderFn;
    onDrop: <TPiece extends HasId>(item: DragObjectWithType & { piece: TPiece }, x: number, y: number) => void;
    onClick: (x: number, y: number) => void;
}

const isBoardTileDark = (x: number, y: number) => ((y ^ x) & 1) !== 0;
const getTileColourClassName = (x: number, y: number) => isBoardTileDark(x, y) ? "dark" : "light";

const BoardRows: React.FunctionComponent<Partial<BoardGridProps>> = ({ onDrop, onClick }) => {
    const { locked, piecePositions, size: { width, height } } = useBoard();

    const rows = [];

    for (let y = 0; y < height; y++) {
        const tiles = [];

        for (let x = 0; x < width; x++) {
            const className = getTileColourClassName(x, y);
            const piecePositionKey = `${x},${y}`;

            const tileContainsPiece = Boolean(piecePositions[piecePositionKey]);

            tiles.push(
                (!tileContainsPiece && !locked)
                    ? <DroppableTile key={`tile-${x}`} className={className} x={x} y={y} onDrop={onDrop} onClick={onClick} />
                    : <UndroppableTile key={`tile-${x}`} className={className} />
            );
        }

        rows.push(<div key={`row-${y}`} className="tile-row">{tiles}</div>);
    }

    return <>{rows}</>;
};

const BoardGrid: React.FunctionComponent<BoardGridProps> = ({ state, renderItem, onDrop, onClick }) => (
    <BoardContextProvider value={state}>
        <BoardRows onDrop={onDrop} onClick={onClick} />

        <BoardItems render={renderItem} />
    </BoardContextProvider>
);

export { BoardGrid };

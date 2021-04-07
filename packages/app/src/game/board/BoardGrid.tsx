import * as React from "react";
import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { useBoard } from "./context";
import { UndroppableTile } from "./tile/UndroppableTile";
import { DroppableTile } from "./tile/DroppableTile";
import { DragObjectWithType } from "react-dnd";

type BoardGridProps = {
    onDrop: (item: DragObjectWithType & { piece: PieceModel }, location: PlayerPieceLocation) => void;
    onClick: (location: PlayerPieceLocation) => void;
}

const isBoardTileDark = (x: number, y: number) => ((y ^ x) & 1) !== 0;
const getClassName = (x: number, y: number) => isBoardTileDark(x, y) ? "dark" : "light";

const BoardGrid: React.FunctionComponent<BoardGridProps> = ({ onDrop, onClick }) => {
    const { locked, piecePositions, size: { width, height } } = useBoard();

    const rows = [];

    for (let y = 0; y < height; y++) {
        const tiles = [];

        for (let x = 0; x < width; x++) {
            const className = getClassName(x, y);
            const piecePositionKey = `${x},${y}`;
            const location: PlayerPieceLocation = {
                type: "board",
                location: { x, y }
            };

            const tileContainsPiece = Boolean(piecePositions[piecePositionKey]);

            tiles.push(
                (!tileContainsPiece && !locked)
                    ? <DroppableTile key={`tile-${x}`} className={className} location={location} onDrop={onDrop} onClick={onClick} />
                    : <UndroppableTile key={`tile-${x}`} className={className} />
            );
        }

        rows.push(<div key={`row-${y}`} className={`tile-row style-default`}>{tiles}</div>);
    }

    return <>{rows}</>;
};

export { BoardGrid };

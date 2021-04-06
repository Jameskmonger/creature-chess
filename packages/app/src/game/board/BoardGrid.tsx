import * as React from "react";
import { PlayerPieceLocation } from "@creature-chess/models";
import { useBoard } from "./context";
import { UndroppableTile } from "./tile/UndroppableTile";
import { DroppableTile } from "./tile/DroppableTile";

const isBoardTileDark = (x: number, y: number) => ((y ^ x) & 1) !== 0;

const getClassName = (x: number, y: number) => isBoardTileDark(x, y) ? "dark" : "light";

const BoardGrid: React.FunctionComponent<{ showOpponentHalf: boolean, width: number, playerHeight: number }> = ({ showOpponentHalf, width, playerHeight }) => {
    const { locked, piecePositions } = useBoard();

    const rows = [];

    if (showOpponentHalf) {
        for (let y = 0; y < playerHeight; y++) {
            const tiles = [];

            for (let x = 0; x < width; x++) {
                tiles.push(<UndroppableTile key={`tile-${x}`} className={getClassName(x, y)} />);
            }

            rows.push(<div key={`row-${y}`} className={`tile-row style-default`}>{tiles}</div>);
        }
    }

    for (let y = playerHeight; y < playerHeight * 2; y++) {
        const tiles = [];

        for (let x = 0; x < width; x++) {
            const className = getClassName(x, y);
            const piecePositionKey = `${x},${y}`;
            const location: PlayerPieceLocation = {
                type: "board",
                location: { x, y }
            };

            const tileEmpty = !piecePositions[piecePositionKey];

            tiles.push(
                (tileEmpty && !locked)
                    ? <DroppableTile key={`tile-${x}`} className={className} location={location} />
                    : <UndroppableTile key={`tile-${x}`} className={className} />
            );
        }

        rows.push(<div key={`row-${y}`} className={`tile-row style-default`}>{tiles}</div>);
    }

    return <>{rows}</>;
};

export { BoardGrid };

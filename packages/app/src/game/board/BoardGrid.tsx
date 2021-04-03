import * as React from "react";
import { PlayerPieceLocation } from "@creature-chess/models";
import { useBoard } from "./context";
import { UndroppableTile } from "./tile/UndroppableTile";
import { DroppableTile } from "./tile/DroppableTile";

const BoardGrid: React.FunctionComponent<{ showOpponentHalf: boolean, width: number, playerHeight: number }> = ({ showOpponentHalf, width, playerHeight }) => {
    const { piecePositions } = useBoard();

    const rows = [];

    if (showOpponentHalf) {
        for (let y = 0; y < playerHeight; y++) {
            const tiles = [];

            for (let x = 0; x < width; x++) {
                tiles.push(<UndroppableTile key={`tile-${x}`} className="" />);
            }

            rows.push(<div className={`tile-row style-default`}>{tiles}</div>);
        }
    }

    for (let y = playerHeight; y < playerHeight * 2; y++) {
        const tiles = [];

        for (let x = 0; x < width; x++) {
            const piecePositionKey = `${x},${y}`;
            const location: PlayerPieceLocation = {
                type: "board",
                location: { x, y }
            };

            const tileEmpty = !piecePositions[piecePositionKey];

            tiles.push(
                tileEmpty
                    ? <DroppableTile key={`tile-${x}`} className="" location={location} />
                    : <UndroppableTile key={`tile-${x}`} className="" />
            );
        }

        rows.push(<div className={`tile-row style-default`}>{tiles}</div>);
    }

    return <>{rows}</>;
};

export { BoardGrid };

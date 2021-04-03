import * as React from "react";
import { useSelector } from "react-redux";
import { Constants, PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { BenchState } from "@creature-chess/shared";
import { AppState } from "../../../store";
import { PositionablePiece } from "./piece/positionablePiece";
import { UndroppableTile } from "../../board/tile/UndroppableTile";
import { DroppableTile } from "../../board/tile/DroppableTile";

const BenchPieces: React.FunctionComponent = () => {
    const pieces = useSelector<AppState, (PieceModel | null)[]>(state => state.bench.pieces);

    const pieceElements: React.ReactNode[] = [];

    pieces.forEach((piece) => {
        if (!piece) {
            return;
        }

        pieceElements.push(<PositionablePiece key={piece.id} id={piece.id} x={piece.position.x} y={0} draggable animate={false} />);
    });

    return (
        <>
            {pieceElements}
        </>
    );
};

const Bench: React.FunctionComponent = () => {
    const { locked, pieces } = useSelector<AppState, BenchState>(state => state.bench);
    const tiles = [];

    for (let x = 0; x < Constants.GRID_SIZE.width; x++) {
        const location: PlayerPieceLocation = {
            type: "bench",
            location: {
                slot: x
            }
        };
        const tileEmpty = !pieces[x];

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

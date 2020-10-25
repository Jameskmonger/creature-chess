import * as React from "react";
import { useSelector } from "react-redux";
import { Constants, PieceModel } from "@creature-chess/models";
import { AppState } from "../../../store";
import { BenchTile } from "./tile/benchTile";
import { PositionablePiece } from "./piece/positionablePiece";

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
    const tiles = [];

    for (let x = 0; x < Constants.GRID_SIZE.width; x++) {
        tiles.push(
            <BenchTile
                key={`tile-${x}`}
                slot={x}
            />
        );
    }

    return (
        <div className="bench">
            {tiles}
            <BenchPieces />
        </div>
    );
};

export { Bench };

import * as React from "react";
import { TileStyle } from "@common/models/position";
import { Constants, PieceModel } from "@common/models";
import { BenchTile } from "./board/tile/benchTile";
import { useSelector } from "react-redux";
import { AppState } from "@app/store";
import { PieceComponent } from "./piece/pieceComponent";
import { PositionablePiece } from "./piece/positionablePiece";

const BenchPieces: React.FunctionComponent = () => {
    const pieces = useSelector<AppState, (PieceModel | null)[]>(state => state.bench.pieces);

    const pieceElements: React.ReactNode[] = [];

    pieces.forEach((piece, index) => {
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
    // get this from local player style
    const tileStyle = TileStyle.DEFAULT;

    const tiles = [];

    for (let x = 0; x < Constants.GRID_SIZE; x++) {
        tiles.push(
            <BenchTile
                key={`tile-${x}`}
                slot={x}
                tileStyle={tileStyle}
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

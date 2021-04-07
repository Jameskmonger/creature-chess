import * as React from "react";
import { PieceComponent } from "./pieceComponent";

interface PositionablePieceProps {
    id: string;
    x: number | string;
    y: number | string;
    draggable: boolean;
    animate: boolean;
    selected: boolean;

    pieceIsOnBench?: boolean;
}

const PositionablePiece: React.FunctionComponent<PositionablePieceProps> = ({ id, x, y, draggable, animate, selected, pieceIsOnBench = false }) => {
    return (
        <div className={`positionable-piece x-${x} y-${y}`}>
            <PieceComponent id={id} draggable={draggable} animate={animate} selected={selected} pieceIsOnBench={pieceIsOnBench} />
        </div>
    );
};

export { PositionablePiece };

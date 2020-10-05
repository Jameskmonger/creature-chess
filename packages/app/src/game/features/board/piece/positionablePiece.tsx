import * as React from "react";
import { PieceComponent } from "./pieceComponent";

interface PositionablePieceProps {
    id: string;
    x: number;
    y: number;
    draggable: boolean;
    animate: boolean;
}

const PositionablePiece: React.FunctionComponent<PositionablePieceProps> = ({ id, x, y, draggable, animate }) => {
    return (
        <div className={`positionable-piece x-${x} y-${y}`}>
            <PieceComponent id={id} draggable={draggable} animate={animate} />
        </div>
    );
};

export { PositionablePiece };

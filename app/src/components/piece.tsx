import * as React from "react";
import { ConnectDragSource, DragSource, DragSourceConnector, DragSourceMonitor } from "react-dnd";

import { PokemonPiece } from "../models/pokemon-piece";

const getPercentage = (current: number, max: number) => {
    return Math.floor((current / max) * 100) + "%";
};

interface PieceProps {
    piece: PokemonPiece;
}

interface DragSourceProps {
    connectDragSource: ConnectDragSource;
    isDragging: boolean;
}

export const PieceUnconnected: React.FunctionComponent<PieceProps & DragSourceProps> = ({ 
    piece,
    connectDragSource
}) => {

    const { facingAway, pokemonId, friendly, currentHealth, maxHealth } = piece;

    return connectDragSource(
        <div className="piece">
            <img src={`/images/${facingAway ? "back" : "front"}/${pokemonId}.png`} />

            <div className="info">
                <div className={`healthbar ${friendly ? "friendly" : "enemy"}`}>
                    <div className="fill" style={{ width: getPercentage(currentHealth, maxHealth) }} />
                </div>
            </div>
        </div>
    );
};

const itemSource = {
    beginDrag(props: PieceProps) {
        return props.piece;
    },
    isDragging(props: PieceProps, monitor: DragSourceMonitor) {
        return props.piece === monitor.getItem();
    }
};

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

export const Piece = DragSource<PieceProps>(typeof PieceUnconnected, itemSource, collect)(PieceUnconnected);
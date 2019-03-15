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

const PieceUnconnected: React.FunctionComponent<PieceProps & DragSourceProps> = ({
    piece,
    connectDragSource
}) => {

    const { facingAway, pokemonId, friendly, currentHealth, maxHealth } = piece;

    return connectDragSource(
        <div className="piece">
            <img className="image" src={`/images/${facingAway ? "back" : "front"}/${pokemonId}.png`} />

            <div className="info">
                <div className={`healthbar ${friendly ? "friendly" : "enemy"}`}>
                    {/* need to figure out how we handle setting the healthbar */}
                    {/* tslint:disable-next-line:jsx-ban-props */}
                    <div className="fill" style={{ width: getPercentage(currentHealth, maxHealth) }} />
                </div>
            </div>
        </div>
    );
};

const selectedPiece = {
    beginDrag(props: PieceProps) {
        return props.piece;
    },
    isDragging(props: PieceProps, monitor: DragSourceMonitor) {
        return props.piece === monitor.getItem();
    },
    canDrag(props: PieceProps, monitor: DragSourceMonitor) {
        return props.piece.friendly;
    }
};

const collect = (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
});

const Piece = DragSource<PieceProps>(typeof PieceUnconnected, selectedPiece, collect)(PieceUnconnected);

export {
    PieceUnconnected,
    Piece
};

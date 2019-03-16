import * as React from "react";
import { ConnectDragSource, DragSource, DragSourceConnector, DragSourceMonitor } from "react-dnd";

import { PokemonPiece, initialCoolDown } from "../models/pokemon-piece";

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

interface State {
    attackAnimationInProgress: boolean;
    hitAnimationInProgress: boolean;
}

class PieceUnconnected extends React.Component<PieceProps & DragSourceProps, State> {
    public state = { attackAnimationInProgress: false, hitAnimationInProgress: false };

    public render() {
        const { piece, connectDragSource} = this.props;
        const { facingAway, pokemonId, friendly, currentHealth, maxHealth, coolDown } = piece;

        return connectDragSource(
            <div className={`piece ${this.getAnimationClasses()}`} onAnimationEnd={this.onAnimationEnd}>
                <img className="image" src={`/images/${facingAway ? "back" : "front"}/${pokemonId}.png`} />

                <div className="info">
                    <div className={`healthbar ${friendly ? "friendly" : "enemy"}`}>
                        {/* tslint:disable-next-line:jsx-ban-props */}
                        <div className="fill" style={{ width: getPercentage(currentHealth, maxHealth) }} />
                    </div>
                    <div className="cooldownbar">
                        {/* tslint:disable-next-line:jsx-ban-props */}
                        <div className="fill" style={{ width: getPercentage(coolDown, initialCoolDown) }} />
                    </div>
                </div>
            </div>
        );
    }

    public componentDidUpdate(oldProps: PieceProps) {
        if (!oldProps.piece.attacking && this.props.piece.attacking) {
            this.setState({ attackAnimationInProgress: true });
        }

        if (!oldProps.piece.hit && this.props.piece.hit) {
            this.setState({ hitAnimationInProgress: true });
        }
    }

    private onAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
        switch (event.animationName) {
            case "attack":
                this.setState({ attackAnimationInProgress: false });
                break;
            case "hit":
                this.setState({ hitAnimationInProgress: false });
                break;
            default:
        }
    }

    private getAnimationClasses = () => `${this.state.attackAnimationInProgress ? "attacking" : ""} ${this.state.hitAnimationInProgress ? "hit" : ""}`;
}

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

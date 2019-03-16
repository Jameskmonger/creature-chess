import * as React from "react";
import { ConnectDragSource, DragSource, DragSourceConnector, DragSourceMonitor } from "react-dnd";

import { PokemonPiece, initialCoolDown } from "../models/pokemon-piece";

const getPercentage = (current: number, max: number) => {
    return Math.floor((current / max) * 100) + "%";
};

const dyingAnimation = "dying";

interface PieceProps {
    piece: PokemonPiece;
}

interface DragSourceProps {
    connectDragSource: ConnectDragSource;
    isDragging: boolean;
}

interface State {
    currentAnimations: string[];
    dead: boolean;
}

class PieceUnconnected extends React.Component<PieceProps & DragSourceProps, State> {
    public state = { currentAnimations: [], dead: this.props.piece.currentHealth === 0 };

    public render() {
        if (this.state.dead) {
            return null;
        }

        const { piece, connectDragSource} = this.props;
        const { facingAway, pokemonId, friendly, currentHealth, maxHealth, coolDown } = piece;

        return connectDragSource(
            <div className={`piece ${this.state.currentAnimations.join(" ")}`} onAnimationEnd={this.onAnimationEnd}>
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
            this.runAnimation(`attack-${this.props.piece.attacking.direction}`);
        }

        if (!oldProps.piece.hit && this.props.piece.hit) {
            this.runAnimation("hit");
        }

        if (oldProps.piece.currentHealth > 0 && this.props.piece.currentHealth === 0) {
            this.runAnimation(dyingAnimation);
        }
    }

    private runAnimation = (animationName: string) => {
        this.setState((prevState => ({ ...prevState, currentAnimations: [ ...prevState.currentAnimations, animationName ] })));
    }

    private onAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
        const { animationName } = event;
        this.setState(prevState => ({ ...prevState, currentAnimations: [ ...prevState.currentAnimations.filter(a => a !== animationName) ] }));
        if (animationName === dyingAnimation) {
            this.setState({ dead: true });
        }
    }
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

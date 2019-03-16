import * as React from "react";
import { ConnectDragSource, DragSource, DragSourceConnector, DragSourceMonitor } from "react-dnd";

import { PokemonPiece, initialCoolDown } from "../models/pokemon-piece";
import { assign, keys } from "lodash";

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

interface Animation {
    name: string;
    variables?: { [key: string]: string | number };
}

interface State {
    currentAnimations: Animation[];
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
        const { currentAnimations } = this.state;

        return connectDragSource(
            <div
                className={`piece ${currentAnimations.map(a => a.name).join(" ")}`}
                // tslint:disable-next-line: jsx-ban-props
                style={getAnimationCssVariables(currentAnimations) as React.CSSProperties}
                onAnimationEnd={this.onAnimationEnd}
            >
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
        const { attacking, hit, celebrating, currentHealth } = this.props.piece;
        if (!oldProps.piece.attacking && attacking) {
            this.runAnimation({ name: `attack-${attacking.direction}`, variables: { attackPower: attacking.damage } });
        }

        if (!oldProps.piece.hit && hit) {
            this.runAnimation({ name: "hit", variables: { hitPower: hit.damage } });
        }

        if (!oldProps.piece.celebrating && celebrating) {
            this.runAnimation({ name: "celebrate" });
        }

        if (oldProps.piece.currentHealth > 0 && currentHealth === 0) {
            this.runAnimation({ name: dyingAnimation });
        }
    }

    private runAnimation = (animation: Animation) => {
        this.setState((prevState => ({ ...prevState, currentAnimations: [ ...prevState.currentAnimations, animation ] })));
    }

    private onAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
        const { animationName } = event;
        this.setState(prevState => ({ ...prevState, currentAnimations: [ ...prevState.currentAnimations.filter(a => a.name !== animationName) ] }));
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

const getAnimationCssVariables = (animations: Animation[]) => {
    const variables = assign({}, ...animations.filter(a => a.variables).map(a => a.variables));
    return assign({}, ...keys(variables).map(key => ({ [`--${key}`]: variables[key] })));
};

export {
    PieceUnconnected,
    Piece
};

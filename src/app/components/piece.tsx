import * as React from "react";
import { ConnectDragSource, DragSource, DragSourceConnector, DragSourceMonitor } from "react-dnd";
import { compose } from "recompose";
import { PokemonPiece, initialCoolDown } from "@common/pokemon-piece";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { pieceSelected } from "../actions/pieceActions";
import { ProgressBar } from "./progressBar";
import { getAnimationCssVariables, AnimationVariables, Animation } from "./animation";
import { PokemonImage } from "./pokemonImage";
import { AppState } from "../store/store";

const dyingAnimation = "dying";

interface PieceOwnProps {
    piece: PokemonPiece;
}

interface PieceStateProps {
    localPlayerId: string;
}

interface PieceDispatchProps {
    onPieceSelected: () => void;
}

type PieceProps = PieceOwnProps & PieceStateProps & PieceDispatchProps;

interface DragSourceProps {
    connectDragSource: ConnectDragSource;
    isDragging: boolean;
}

interface State {
    currentAnimations: Animation[];
    dead: boolean;
}

const isFriendly = (props: PieceProps) => props.localPlayerId === props.piece.ownerId;

class PieceUnconnected extends React.Component<PieceProps & DragSourceProps, State> {
    public state = {
        currentAnimations: [],
        dead: this.props.piece.currentHealth === 0
    };

    public render() {
        if (this.state.dead) {
            return null;
        }

        const { piece, connectDragSource} = this.props;
        const { facingAway, pokemonId, currentHealth, maxHealth, coolDown } = piece;
        const { currentAnimations } = this.state;

        const friendly = isFriendly(this.props);

        return connectDragSource(
            <div
                className={`piece ${currentAnimations.map(a => a.name).join(" ")}`}
                // tslint:disable-next-line: jsx-ban-props
                style={getAnimationCssVariables(currentAnimations) as React.CSSProperties}
                onAnimationEnd={this.onAnimationEnd}
                onClick={this.props.onPieceSelected}
            >
                <PokemonImage pokemonId={pokemonId} facing={facingAway ? "back" : "front"} />

                <div className="info">
                    <ProgressBar
                        className={`healthbar ${friendly ? "friendly" : "enemy"}`}
                        current={currentHealth}
                        max={maxHealth}
                    />
                    <ProgressBar
                        className="cooldownbar"
                        current={coolDown}
                        max={initialCoolDown}
                    />
                </div>
            </div>
        );
    }

    public componentDidUpdate(oldProps: PieceProps) {
        this.runAnimations(oldProps);
    }

    public componentDidMount() {
        const { moving, attacking, hit, celebrating, ...piece } = this.props.piece;
        this.runAnimations({ ...this.props, piece });
    }

    private runAnimations = (oldProps: PieceProps) => {
        const { moving, attacking, hit, celebrating, currentHealth } = this.props.piece;
        if (!oldProps.piece.moving && moving) {
            this.runAnimation(`move-${moving.direction}`);
        }

        if (!oldProps.piece.attacking && attacking) {
            this.runAnimation(`attack-${attacking.direction}`, { attackPower: attacking.damage });
        }

        if (!oldProps.piece.hit && hit) {
            this.runAnimation("hit", { hitPower: hit.damage });
        }

        if (!oldProps.piece.celebrating && celebrating) {
            this.runAnimation("celebrate");
        }

        if (oldProps.piece.currentHealth > 0 && currentHealth === 0) {
            this.runAnimation(dyingAnimation);
        }
    }

    private runAnimation = (name: string, variables?: AnimationVariables) => {
        this.setState(prevState => ({
            ...prevState,
            currentAnimations: [ ...prevState.currentAnimations, { name, variables } ]
        }));
    }

    private onAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
        const { animationName } = event;
        this.setState(prevState => ({
            ...prevState,
            currentAnimations: [ ...prevState.currentAnimations.filter(a => a.name !== animationName && !a.name.startsWith("move-")) ]
        }));
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
        return isFriendly(props);
    }
};

const collect = (connectToDragSource: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connectToDragSource.dragSource(),
    isDragging: monitor.isDragging()
});

const mapStateToProps: MapStateToProps<PieceStateProps, {}, AppState> = state => ({
    localPlayerId: state.game.localPlayerId
});

const mapDispatchToProps: MapDispatchToProps<PieceDispatchProps, PieceOwnProps> = (dispatch, ownProps) => ({
    onPieceSelected: () => dispatch(pieceSelected(ownProps.piece))
});

const Piece = compose<PieceProps, PieceOwnProps>(
    connect(mapStateToProps, mapDispatchToProps),
    DragSource<PieceOwnProps>(typeof PieceUnconnected, selectedPiece, collect)
)(PieceUnconnected);

export {
    PieceUnconnected,
    Piece
};

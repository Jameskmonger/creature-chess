import * as React from "react";
import { initialCoolDown } from "@common/pokemon-piece";
import { ProgressBar } from "../../progressBar";
import { getAnimationCssVariables, AnimationVariables, Animation } from "../../animation";
import { PokemonImage } from "../../pokemonImage";
import { BoardPieceProps, isFriendly } from "./boardPieceProps";
import { DragSourceProps } from "../../draggable/drag-source-props";

const dyingAnimation = "dying";

interface State {
    currentAnimations: Animation[];
    dead: boolean;
}

class BoardPieceUnconnected extends React.Component<BoardPieceProps & DragSourceProps, State> {
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

    public componentDidUpdate(oldProps: BoardPieceProps) {
        this.runAnimations(oldProps);
    }

    public componentDidMount() {
        const { moving, attacking, hit, celebrating, ...piece } = this.props.piece;
        this.runAnimations({ ...this.props, piece });
    }

    private runAnimations = (oldProps: BoardPieceProps) => {
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

export {
    BoardPieceUnconnected
};

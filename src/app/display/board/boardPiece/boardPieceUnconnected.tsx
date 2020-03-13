import * as React from "react";
import { ProgressBar } from "../../../display/progressBar";
import { getAnimationCssVariables, AnimationVariables, Animation } from "../../../display/animation";
import { CreatureImage } from "../../../display/creatureImage";
import { BoardPieceProps, isFriendly } from "./boardPieceProps";
import { DragSourceProps } from "../../../draggable/drag-source-props";
import { Constants } from "@common";

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

        const { piece, connectDragSource, showDamagePerTurn, showHealthbar } = this.props;
        const { facingAway, definitionId, currentHealth, maxHealth, coolDown, stage, damagePerTurn } = piece;
        const { currentAnimations } = this.state;

        const friendly = isFriendly(this.props);

        return connectDragSource(
            <div
                className={`piece ${currentAnimations.map(a => a.name).join(" ")}`}
                // tslint:disable-next-line: jsx-ban-props
                style={getAnimationCssVariables(currentAnimations) as React.CSSProperties}
                onAnimationEnd={this.onAnimationEnd}
            >
                <CreatureImage definitionId={definitionId} facing={facingAway ? "back" : "front"} />

                {
                    showDamagePerTurn
                    && damagePerTurn !== null
                    && <div className="damage-per-turn">{damagePerTurn.toFixed(0)} dpt</div>
                }

                <div className="piece-stage">{stage + 1}</div>

                {
                    showHealthbar
                    && (
                        <div className="info">
                            <ProgressBar
                                className={`healthbar ${friendly ? "friendly" : "enemy"}`}
                                current={currentHealth}
                                max={maxHealth}
                            />
                            <ProgressBar
                                className="cooldownbar"
                                current={coolDown}
                                max={Constants.INITIAL_COOLDOWN}
                            />
                        </div>
                    )
                }
            </div>
        );
    }

    public componentDidUpdate(oldProps: BoardPieceProps) {
        this.runAnimations(oldProps);

        if (this.state.dead && this.props.piece.currentHealth > 0) {
            this.setState({ dead: false });
        }
    }

    public componentDidMount() {
        const { moving, attacking, hit, celebrating, ...piece } = this.props.piece;
        this.runAnimations({ ...this.props, piece });
    }

    private runAnimations = (oldProps: BoardPieceProps) => {
        const { moving, attacking, hit, celebrating, currentHealth } = this.props.piece;
        if (!oldProps.piece.moving && moving) {
            this.runAnimation(`move`, { moveXDirection: moving.direction.x, moveYDirection: moving.direction.y });
        }

        if (!oldProps.piece.attacking && attacking) {
            this.runAnimation(
                `attack-${attacking.attackType.name}`,
                { attackPower: attacking.damage, attackXDirection: attacking.direction.x, attackYDirection: attacking.direction.y }
            );
        }

        if (!oldProps.piece.hit && hit) {
            this.runAnimation("hit", { hitPower: hit.damage });
        }

        if (!oldProps.piece.celebrating && celebrating) {
            this.runAnimation("celebrate");
        } else if (oldProps.piece.celebrating && !celebrating) {
            this.stopCelebrateAnimation();
        }

        if (oldProps.piece.currentHealth > 0 && currentHealth === 0) {
            if (this.props.animate === false) {
                this.setState({ dead: true });
            } else {
                this.runAnimation(dyingAnimation);
            }
        }
    }

    private runAnimation = (name: string, variables?: AnimationVariables) => {
        if (this.props.animate === false) {
            return;
        }

        this.setState(prevState => ({
            ...prevState,
            currentAnimations: [...prevState.currentAnimations, { name, variables }]
        }));
    }

    private stopCelebrateAnimation() {
        if (this.props.animate === false) {
            return;
        }

        this.setState(prevState => ({
            ...prevState,
            currentAnimations: prevState.currentAnimations.filter(a => a.name !== "celebrate")
        }));
    }

    private onAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
        const { animationName } = event;
        this.setState(prevState => ({
            ...prevState,
            currentAnimations: [...prevState.currentAnimations.filter(a => a.name !== animationName && !a.name.startsWith("move-"))]
        }));
        if (animationName === dyingAnimation) {
            this.setState({ dead: true });
        }
    }
}

export {
    BoardPieceUnconnected
};

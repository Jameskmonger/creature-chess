import * as React from "react";
import { useDrag } from "react-dnd";
import { PieceImage } from "./components/pieceImage";
import { StageIndicator } from "./components/stageIndicator";
import { Healthbar } from "./components/healthbar";
import { AnimationVariables, getAnimationCssVariables } from "../animation";
import { useSelector, useDispatch } from "react-redux";
import { PieceModel as PieceComponent, GamePhase } from "@common/models";
import { getPiece } from "@common/player/pieceSelectors";
import { AppState } from "@app/store";
import { arePositionsEqual, getRelativeDirection } from "@common/models/position";
import { selectPiece } from "@app/store/actions/boardActions";
import { Projectile } from "../projectile";

const dyingAnimation = "dying";

interface DraggableBoardPieceProps {
    id: string;
    draggable: boolean;
    animate: boolean;
}

interface Animation {
    name: string;
    variables?: AnimationVariables;
}

const PieceComponent: React.FunctionComponent<DraggableBoardPieceProps> = (props) => {
    const { id, draggable, animate } = props;
    const dispatch = useDispatch();
    const [currentAnimations, setCurrentAnimations] = React.useState<Animation[]>([]);
    const [oldPiece, setOldPiece] = React.useState<PieceComponent | null>(null);
    const localPlayerId = useSelector<AppState, string>(state => state.localPlayer.id);
    const piece = useSelector<AppState, PieceComponent>(state => getPiece(state, id));
    const inPreparingPhase = useSelector<AppState, boolean>(state => state.game.phase === GamePhase.PREPARING);

    const [{ }, drag] = useDrag({
        item: { type: "Piece", piece },
        canDrag: () => draggable && piece.ownerId === localPlayerId
    });

    const runAnimation = (name: string, variables?: AnimationVariables) => setCurrentAnimations(oldAnimations => [...oldAnimations, { name, variables }]);

    const onAnimationEnd = ({ animationName }: React.AnimationEvent<HTMLDivElement>) => {
        setCurrentAnimations(oldAnimations => oldAnimations.filter(a => a.name !== animationName && !a.name.startsWith("move-")));
    };

    const runAnimations = (newPiece: PieceComponent) => {
        if (!animate) {
            return;
        }

        const { attacking, hit } = newPiece;

        if (!oldPiece) {
            setOldPiece(newPiece);
            return;
        }

        if (attacking && !oldPiece.attacking) {
            runAnimation(
                `attack-${attacking.attackType.name}`,
                {
                    attackPower: attacking.damage,
                    attackXDirection: attacking.direction.x,
                    attackYDirection: attacking.direction.y,
                    attackDistance: attacking.distance
                }
            );
        }

        if (hit && !oldPiece.hit) {
            runAnimation("hit", { hitPower: hit.damage });
        }

        setOldPiece(newPiece);
    };

    const onClick = () => {
        const pieceIsOnBoard = piece.position.y !== null;

        // can only select a board piece in preparing phase
        if (pieceIsOnBoard && !inPreparingPhase) {
            return;
        }

        dispatch(selectPiece(id));
    };

    React.useEffect(() => {
        if (piece) {
            runAnimations(piece);
        } else {
            setOldPiece(null);
        }
    }, [piece]);

    const isDead = piece.currentHealth === 0;

    return (
        <div
            ref={drag}
            className={`piece ${currentAnimations.map(a => a.name).join(" ")} ${isDead ? dyingAnimation : ""}`}
            // tslint:disable-next-line: jsx-ban-props
            style={getAnimationCssVariables(currentAnimations) as React.CSSProperties}
            onClick={onClick}
            onAnimationEnd={onAnimationEnd}
        >
            <div className="piece-meta">
                <StageIndicator pieceId={id} />

                <Healthbar pieceId={id} vertical />
            </div>

            <PieceImage pieceId={id} />

            <Projectile />
        </div>
    );
};

export { PieceComponent };

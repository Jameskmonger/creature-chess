import * as React from "react";
import { DragObjectWithType, useDrag } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { GamePhase, PieceModel } from "@creature-chess/models";
import { getPiece } from "@creature-chess/gamemode";
import { AppState } from "../../../../store";
import { AnimationVariables, getAnimationCssVariables } from "../../../../ui/display/animation";
import { Projectile } from "../../../../ui/display/projectile";
import { selectPiece } from "../../../../ui/actions";
import { PieceImage } from "./components/pieceImage";
import { getUserId } from "../../../../menu/auth/store/selectors";
import { PieceMeta } from "./pieceMeta";

const dyingAnimation = "dying";

interface DraggableBoardPieceProps {
    id: string;
    draggable: boolean;
    animate: boolean;
    selected: boolean;

    pieceIsOnBench?: boolean;
}

interface Animation {
    name: string;
    variables?: AnimationVariables;
}

type PieceDragObject = DragObjectWithType & { piece: PieceModel }

const PieceComponent: React.FunctionComponent<DraggableBoardPieceProps> = (props) => {
    const { id, draggable, animate, selected, pieceIsOnBench = false } = props;
    const dispatch = useDispatch();
    const [currentAnimations, setCurrentAnimations] = React.useState<Animation[]>([]);
    const [oldPiece, setOldPiece] = React.useState<PieceModel | null>(null);
    const localPlayerId = useSelector<AppState, string>(getUserId);
    const piece = useSelector<AppState, PieceModel>(state => getPiece(state.game, id));
    const inPreparingPhase = useSelector<AppState, boolean>(state => state.game.roundInfo.phase === GamePhase.PREPARING);

    const [{ }, drag] = useDrag<PieceDragObject, void, { }>({
        item: { type: "Piece", piece },
        canDrag: () => draggable && piece.ownerId === localPlayerId
    });

    const runAnimation = (name: string, variables?: AnimationVariables) => setCurrentAnimations(oldAnimations => [...oldAnimations, { name, variables }]);

    const onAnimationEnd = ({ animationName }: React.AnimationEvent<HTMLDivElement>) => {
        setCurrentAnimations(oldAnimations => oldAnimations.filter(a => a.name !== animationName && !a.name.startsWith("move-")));
    };

    const runAnimations = (newPiece: PieceModel) => {
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
        // can only select a board piece in preparing phase
        if (!pieceIsOnBench && !inPreparingPhase) {
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

    const className = `piece ${currentAnimations.map(a => a.name).join(" ")} ${isDead ? dyingAnimation : ""} ${selected ? "selected" : ""}`;

    return (
        <div
            ref={drag}
            className={className}
            // tslint:disable-next-line: jsx-ban-props
            style={getAnimationCssVariables(currentAnimations) as React.CSSProperties}
            onClick={onClick}
            onAnimationEnd={onAnimationEnd}
        >
            <PieceMeta id={id} pieceIsOnBench={pieceIsOnBench} />

            <PieceImage pieceId={id} />

            <Projectile />
        </div>
    );
};

export { PieceComponent };

import * as React from "react";
import { useSelector } from "react-redux";
import { usePlayerId } from "@creature-chess/auth-web";
import { PieceModel } from "@creature-chess/models";
import { BoardSelectors } from "@shoki/board";
import { Piece } from "@creature-chess/ui";
import { AppState } from "../../../store";
import { AnimationVariables, getAnimationCssVariables } from "../../animation";
import { Projectile } from "../projectile";

const dyingAnimation = "dying";

interface Animation {
	name: string;
	variables?: AnimationVariables;
}

const getHealthbar = (ownerId: string, localId: string, spectatingId: string | null) => (
	ownerId === localId
		? "friendly"
		: (
			ownerId === spectatingId
				? "spectating"
				: "enemy"
		)
);

export const AnimatedPiece: React.FunctionComponent<{ id: string }> = (props) => {
	const { id } = props;
	const playerId = usePlayerId();
	const [currentAnimations, setCurrentAnimations] = React.useState<Animation[]>([]);
	const [oldPiece, setOldPiece] = React.useState<PieceModel | null>(null);
	const piece = useSelector<AppState, PieceModel | null>(state => BoardSelectors.getPiece(state.game.match.board!, id));
	const spectatingId = useSelector<AppState, string | null>(state => state.game.spectating.id);

	const runAnimation = (name: string, variables?: AnimationVariables) => setCurrentAnimations(oldAnimations => [...oldAnimations, { name, variables }]);

	const onAnimationEnd = ({ animationName }: React.AnimationEvent<HTMLDivElement>) => {
		setCurrentAnimations(oldAnimations => oldAnimations.filter(a => a.name !== animationName && !a.name.startsWith("move-")));
	};

	const runAnimations = (newPiece: PieceModel) => {
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

	React.useEffect(() => {
		if (piece) {
			runAnimations(piece);
		} else {
			setOldPiece(null);
		}
	}, [piece]);

	if (!piece) {
		console.log("no AnimatedPiece found for id ", id);
		return null;
	}

	const isDead = piece.currentHealth === 0;

	const className = `piece ${currentAnimations.map(a => a.name).join(" ")} ${isDead ? dyingAnimation : ""}`;


	return (
		<div
			className={className}
			style={getAnimationCssVariables(currentAnimations) as React.CSSProperties}
			// eslint-disable-next-line react/jsx-no-bind
			onAnimationEnd={onAnimationEnd}
		>
			<Piece
				className={className}
				piece={piece}
				healthbar={getHealthbar(piece.ownerId, playerId, spectatingId)}
			>
				<Projectile />
			</Piece>
		</div>
	);
};

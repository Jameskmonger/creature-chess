import { PieceModel } from "@creature-chess/models";
import classNames from "classnames";
import * as React from "react";
import { Piece, Projectile } from "../../src/piece";
import { usePiece } from "../PieceContext";
import { useAnimationStyles, usePieceStyles } from "./AnimatedPiece.styles";
import { Animation, AnimationVariables, getAnimationCssVariables } from "./animation";

const getHealthbar = (ownerId: string, viewingPlayerId: string) =>
	ownerId === viewingPlayerId ? "friendly" : "enemy";

export const AnimatedPiece: React.FC = () => {
	const { piece, viewingPlayerId } = usePiece();
	const animationStyles = useAnimationStyles();
	const styles = usePieceStyles();

	const [currentAnimations, setCurrentAnimations] = React.useState<Animation[]>([]);
	const [lastRenderedPiece, setLastRenderedPiece] = React.useState<PieceModel | null>(null);

	const runAnimation = (name: string, variables?: AnimationVariables) =>
		setCurrentAnimations(oldAnimations => {
			const newAnimation: Animation = { name, variables };

			return [...oldAnimations, newAnimation];
		});

	const onAnimationEnd = ({ animationName }: React.AnimationEvent<HTMLDivElement>) => {
		setCurrentAnimations(oldAnimations => oldAnimations.filter(a => a.name !== animationName && !a.name.startsWith("move-")));
	};

	const runAnimations = (newPiece: PieceModel) => {
		const { attacking, hit } = newPiece;

		if (!lastRenderedPiece) {
			setLastRenderedPiece(newPiece);
			return;
		}

		if (attacking && !lastRenderedPiece.attacking) {
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

		if (hit && !lastRenderedPiece.hit) {
			runAnimation("hit", { hitPower: hit.damage });
		}

		setLastRenderedPiece(newPiece);
	};

	React.useEffect(() => {
		if (piece) {
			runAnimations(piece);
		} else {
			setLastRenderedPiece(null);
		}
	}, [piece]);

	if (!piece) {
		return null;
	}

	const animationClasses = currentAnimations.map(a => (animationStyles as any)[a.name]);

	if (piece.currentHealth === 0) {
		animationClasses.push(animationStyles.dying);
	}

	const className = classNames(
		styles.piece,
		...animationClasses
	);

	return (
		<div
			className={className}
			style={getAnimationCssVariables(currentAnimations)}
			// eslint-disable-next-line react/jsx-no-bind
			onAnimationEnd={onAnimationEnd}
		>
			<Piece
				className={className}
				piece={piece}
				healthbar={getHealthbar(piece.ownerId, viewingPlayerId)}
			>
				<Projectile />
			</Piece>
		</div>
	);
};

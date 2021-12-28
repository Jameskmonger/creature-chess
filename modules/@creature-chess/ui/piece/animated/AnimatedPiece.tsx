import * as React from "react";
import { attackTypes, PieceModel } from "@creature-chess/models";
import classNames from "classnames";
import { Projectile } from "../../src/piece";
import { Piece } from "../Piece";
import { usePiece } from "../PieceContext";
import { useAnimationStyles, usePieceStyles } from "./AnimatedPiece.styles";
import { Animation, AnimationVariables, getAnimationCssVariables } from "./animation";

const getHealthbar = (ownerId: string, viewingPlayerId: string) =>
	ownerId === viewingPlayerId ? "friendly" : "enemy";

const animationEventMatchesAnimation = (event: React.AnimationEvent<HTMLDivElement>, animation: Animation): boolean =>
	event.animationName.includes(`piece-${animation.keyframesName}-anim`);

export const AnimatedPiece: React.FC = () => {
	const { piece, viewingPlayerId } = usePiece();
	const animationStyles = useAnimationStyles();
	const styles = usePieceStyles();

	const [currentAnimations, setCurrentAnimations] = React.useState<Animation[]>([]);
	const [lastRenderedPiece, setLastRenderedPiece] = React.useState<PieceModel | null>(null);

	const runAnimation = (name: string, keyframesName: string, variables?: AnimationVariables) =>
		setCurrentAnimations(oldAnimations => {
			// dont apply styles twice
			if (oldAnimations.some(a => a.name === name)) {
				return oldAnimations;
			}

			const newAnimation: Animation = { name, keyframesName, variables };

			return [...oldAnimations, newAnimation];
		});

	const removeAnimation = (name: string) =>
		setCurrentAnimations(oldAnimations => oldAnimations.filter(animation => animation.name !== name));

	const onAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
		setCurrentAnimations(oldAnimations => oldAnimations.filter(a => !animationEventMatchesAnimation(event, a)));
	};

	const runAnimations = (newPiece: PieceModel) => {
		const { attacking, hit, currentHealth } = newPiece;

		if (!lastRenderedPiece) {
			setLastRenderedPiece(newPiece);
			return;
		}

		if (attacking && !lastRenderedPiece.attacking) {
			if (attacking.attackType === attackTypes.basic) {
				runAnimation(
					animationStyles.attackBasic,
					"attack-basic",
					{
						attackPower: attacking.damage,
						attackXDirection: attacking.direction.x,
						attackYDirection: attacking.direction.y,
					}
				);
			} else {
				// runAnimation(
				// 	`attack-${attacking.attackType.name}`,
				// 	{
				// 		attackPower: attacking.damage,
				// 		attackXDirection: attacking.direction.x,
				// 		attackYDirection: attacking.direction.y,
				// 		attackDistance: attacking.distance
				// 	}
				// );
			}
		}

		if (hit && !lastRenderedPiece.hit) {
			runAnimation(
				animationStyles.receiveHit,
				"receive-hit",
				{
					hitPower: hit.damage
				}
			);
		}

		if (currentHealth === 0) {
			if (lastRenderedPiece.currentHealth !== 0) {
				runAnimation(animationStyles.dying, "dying");
			}
		} else {
			removeAnimation(animationStyles.dying);
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

	const animationClasses = currentAnimations.map(a => a.name);

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
			<Piece healthbar={getHealthbar(piece.ownerId, viewingPlayerId)}>
				<Projectile />
			</Piece>
		</div>
	);
};

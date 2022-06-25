import * as React from "react";

import classNames from "classnames";

import { attackTypes, PieceModel } from "@creature-chess/models";

import { Piece } from "../Piece";
import { usePiece } from "../PieceContext";
import { Projectile } from "../Projectile";
import { useAnimationStyles, usePieceStyles } from "./MatchPiece.styles";
import {
	Animation,
	AnimationVariables,
	getAnimationCssVariables,
} from "./animation";

const getHealthbar = (ownerId: string, viewingPlayerId: string) =>
	ownerId === viewingPlayerId ? "friendly" : "enemy";

const animationEventMatchesAnimation = (
	event: React.AnimationEvent<HTMLDivElement>,
	animation: Animation
): boolean =>
	event.animationName.includes(`piece-${animation.keyframesName}-anim`);

export const MatchPiece: React.FC = () => {
	const { piece, viewingPlayerId } = usePiece();
	const animationStyles = useAnimationStyles();
	const styles = usePieceStyles();

	const [currentAnimations, setCurrentAnimations] = React.useState<Animation[]>(
		[]
	);
	const [lastRenderedPiece, setLastRenderedPiece] =
		React.useState<PieceModel | null>(null);

	const runAnimation = (
		name: string,
		keyframesName: string,
		variables?: AnimationVariables
	) =>
		setCurrentAnimations((oldAnimations) => {
			const newAnimation: Animation = { name, keyframesName, variables };

			return [
				// replace previous instance of this animation
				...oldAnimations.filter((a) => a.name !== name),
				newAnimation,
			];
		});

	const removeAnimation = (name: string) =>
		setCurrentAnimations((oldAnimations) =>
			oldAnimations.filter((animation) => animation.name !== name)
		);

	const onAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
		setCurrentAnimations((oldAnimations) =>
			oldAnimations.filter((a) => !animationEventMatchesAnimation(event, a))
		);
	};

	const runAnimations = (newPiece: PieceModel) => {
		const { attacking, hit, currentHealth } = newPiece;

		if (!lastRenderedPiece) {
			setLastRenderedPiece(newPiece);
			return;
		}

		if (attacking && !lastRenderedPiece.attacking) {
			if (attacking.attackType.name === attackTypes.basic.name) {
				runAnimation(animationStyles.attackBasic, "attack-basic", {
					attackPower: attacking.damage,
					attackXDirection: attacking.direction.x,
					attackYDirection: attacking.direction.y,
				});
			} else if (attacking.attackType.name === attackTypes.shoot.name) {
				runAnimation(animationStyles.attackShoot, "attack-shoot", {
					attackPower: attacking.damage,
					attackXDirection: attacking.direction.x,
					attackYDirection: attacking.direction.y,
					attackDistance: attacking.distance,
				});
			}
		}

		if (hit && !lastRenderedPiece.hit) {
			runAnimation(animationStyles.receiveHit, "receive-hit", {
				hitPower: hit.damage,
			});
		}

		if (currentHealth === 0) {
			if (lastRenderedPiece.currentHealth !== 0) {
				runAnimation(animationStyles.dying, "dying");
			}
		} else {
			if (lastRenderedPiece.currentHealth === 0) {
				removeAnimation(animationStyles.dying);
			}
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

	const animationClasses = currentAnimations.map((a) => a.name);

	const className = classNames(styles.piece, ...animationClasses);

	return (
		<div
			className={className}
			style={getAnimationCssVariables(currentAnimations)}
			// eslint-disable-next-line react/jsx-no-bind
			onAnimationEnd={onAnimationEnd}
		>
			<Piece healthbar={getHealthbar(piece.ownerId, viewingPlayerId)}>
				<Projectile className={animationStyles.projectile} />
			</Piece>
		</div>
	);
};

import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { Piece } from "../Piece";
import { Projectile } from "../Projectile";
import { usePiece } from "../PieceContext";
import { AnimationLayerDiv } from "./AnimationLayerDiv";
import { useGameAnimationEventStore } from "../../hooks/selectors";
import { useAnimationLayers } from "./useAnimationLayers";

const getHealthbar = (ownerId: string, viewingPlayerId: string) =>
	ownerId === viewingPlayerId ? "friendly" : "enemy";

const getCssVariableStyle = (
	cssVariables?: Record<string, string | number>
): React.CSSProperties => {
	if (!cssVariables) {
		return {};
	}

	const result: Record<string, string | number> = {};
	for (const [key, value] of Object.entries(cssVariables)) {
		result[`--${key}`] = value;
	}
	return result as React.CSSProperties;
};

const useStyles = createUseStyles({
	pieceContainer: {
		position: "relative",
		zIndex: 50,
		width: "100%",
		height: "100%",
	},
});

export function MatchPiece() {
	const { piece, viewingPlayerId } = usePiece();
	const styles = useStyles();
	const animationEventStore = useGameAnimationEventStore();

	const {
		layers,
		isDying,
		dyingClassName,
		projectile,
		onLayerAnimationEnd,
		onProjectileAnimationEnd,
	} = useAnimationLayers(piece.id, animationEventStore);

	// Nest animation layers around <Piece/> — each layer owns its own div/transform
	let content: React.ReactNode = (
		<Piece healthbar={getHealthbar(piece.ownerId, viewingPlayerId)} />
	);

	for (let i = layers.length - 1; i >= 0; i--) {
		content = (
			<AnimationLayerDiv
				layer={layers[i]}
				onEnd={onLayerAnimationEnd}
			>
				{content}
			</AnimationLayerDiv>
		);
	}

	return (
		<div className={classNames(styles.pieceContainer, isDying && dyingClassName)}>
			{content}
			{projectile && (
				<Projectile
					className={projectile.className}
					// eslint-disable-next-line react/forbid-component-props
					style={getCssVariableStyle(projectile.cssVariables)}
					onAnimationEnd={onProjectileAnimationEnd}
				/>
			)}
		</div>
	);
}

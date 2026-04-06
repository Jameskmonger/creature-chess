import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { Piece } from "../Piece";
import { usePiece } from "../PieceContext";
import { AnimationLayerDiv } from "./AnimationLayerDiv";
import { useGameAnimationEventStore } from "../../hooks/selectors";
import { useAnimationLayers } from "./useAnimationLayers";

const getHealthbar = (ownerId: string, viewingPlayerId: string) =>
	ownerId === viewingPlayerId ? "friendly" : "enemy";

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
		onLayerAnimationEnd,
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
		</div>
	);
}

import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { PieceModel } from "@creature-chess/models";

import { useGameAnimationEventStore } from "../../hooks/selectors";
import { Piece } from "../Piece";
import { usePieceCombatState } from "../usePieceCombatState";
import { AnimationLayerDiv } from "./AnimationLayerDiv";
import { ANIMATION_LAYER_DEPTH } from "./constants";
import { useAnimationLayers } from "./useAnimationLayers";

type Props = {
	piece: PieceModel;
	viewingPlayerId: string;
};

const useStyles = createUseStyles({
	pieceContainer: {
		position: "relative",
		zIndex: 50,
		width: "100%",
		height: "100%",
	},
});

export function MatchPiece({ piece, viewingPlayerId }: Props) {
	const styles = useStyles();
	const animationEventStore = useGameAnimationEventStore();
	const combat = usePieceCombatState(piece.id);

	const { layers, isDying, dyingClassName, onLayerAnimationEnd } =
		useAnimationLayers(piece.id, animationEventStore);

	const color = piece.ownerId === viewingPlayerId ? "friendly" : "enemy";
	const currentHealth = combat?.currentHealth ?? piece.maxHealth;
	const facing = combat?.facingAway ? "back" : "front";

	// Always render a fixed number of wrapper divs so the DOM tree shape
	// never changes - only className/style toggle when animations are active.
	let content: React.ReactNode = (
		<Piece
			piece={piece}
			healthbar={{ color, current: currentHealth }}
			facing={facing}
		/>
	);

	for (let i = ANIMATION_LAYER_DEPTH - 1; i >= 0; i--) {
		content = (
			<AnimationLayerDiv layer={layers[i]} onEnd={onLayerAnimationEnd}>
				{content}
			</AnimationLayerDiv>
		);
	}

	return (
		<div
			className={classNames(styles.pieceContainer, isDying && dyingClassName)}
		>
			{content}
		</div>
	);
}

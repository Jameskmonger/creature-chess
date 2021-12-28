import { createUseStyles } from "react-jss";

const ATTACK_DURATION_MS = 200;
const ATTACK_MOVEMENT_MULTIPLIER_PX = 3;

export const useAnimationStyles = createUseStyles({
	"@keyframes piece-dying-anim": {
		"100%": {
			transform: "scale(0)"
		}
	},
	"dying": {
		animationName: "$piece-dying-anim",
		animationDuration: "1000ms",
		animationFillMode: "forwards",
		animationIterationCount: "1"
	},
	"@keyframes piece-attack-basic-anim": {
		"0%": {
			top: "0",
			left: "0",
		},

		"50%": {
			top: `calc(calc(${ATTACK_MOVEMENT_MULTIPLIER_PX}px * var(--attackPower)) * var(--attackYDirection))`,
			left: `calc(calc(${ATTACK_MOVEMENT_MULTIPLIER_PX}px * var(--attackPower)) * var(--attackXDirection))`,
		},

		"100%": {
			top: "0",
			left: "0",
		},
	},
	"attack-basic": {
		animationName: "$piece-attack-basic-anim",
		animationDuration: `${ATTACK_DURATION_MS}ms`,
	},
});

export const usePieceStyles = createUseStyles({
	piece: {
		position: "relative",
		zIndex: 50,
		width: "100%",
		height: "100%",
	}
});

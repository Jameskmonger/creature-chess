import { createUseStyles } from "react-jss";

const ATTACK_DURATION_MS = 200;
const ATTACK_MOVEMENT_MULTIPLIER_PX = 3;
const HIT_ROTATION_MULTIPLIER_DEG = 1;

const projectileSize = "10px";

export const useAnimationStyles = createUseStyles({
	"@keyframes piece-dying-anim": {
		"100%": {
			transform: "scale(0)",
		},
	},
	dying: {
		animationName: "$piece-dying-anim",
		animationDuration: "1000ms",
		animationFillMode: "forwards",
		animationIterationCount: "1",
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
	attackBasic: {
		animationName: "$piece-attack-basic-anim",
		animationDuration: `${ATTACK_DURATION_MS}ms`,
	},

	"@keyframes piece-attack-shoot-anim": {
		"0%": {
			top: `calc(50% - (${projectileSize} / 2))`,
			left: `calc(50% - (${projectileSize} / 2))`,
		},

		"100%": {
			top: `calc(
				((100% * var(--attackDistance) * var(--attackYDirection)) + 50%) -
				  (${projectileSize} / 2)
			  )`,
			left: `calc(
				((100% * var(--attackDistance) * var(--attackXDirection)) + 50%) -
				  (${projectileSize} / 2)
			  )`,
		},
	},
	projectile: {
		display: "none",
		position: "absolute",
		top: `calc(50% - (${projectileSize} / 2))`,
		left: `calc(50% - (${projectileSize} / 2))`,
	},
	attackShoot: {
		"& $projectile": {
			display: "block",
			animationName: "$piece-attack-shoot-anim",
			animationDuration: `${ATTACK_DURATION_MS}ms`,
		},
	},

	"@keyframes piece-receive-hit-anim": {
		"0%": {
			transform: "rotate(0deg)",
		},
		"25%": {
			transform: `rotate(calc(${HIT_ROTATION_MULTIPLIER_DEG}deg * var(--hitPower) * -1))`,
		},
		"75%": {
			transform: `rotate(calc(${HIT_ROTATION_MULTIPLIER_DEG}deg * var(--hitPower)))`,
		},
		"100%": {
			transform: "rotate(0deg)",
		},
	},
	receiveHit: {
		animationName: "$piece-receive-hit-anim",
		animationDuration: `${ATTACK_DURATION_MS}ms`,
	},
});

export const usePieceStyles = createUseStyles({
	piece: {
		position: "relative",
		zIndex: 50,
		width: "100%",
		height: "100%",
	},
});

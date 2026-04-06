import { createUseStyles } from "react-jss";

import { PieceHitEvent } from "@creature-chess/battle";

import { AnimationLayer } from "./types";

const ATTACK_DURATION_MS = 200;
const HIT_ROTATION_MULTIPLIER_DEG = 1;

export const useReceiveHitStyles = createUseStyles({
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
	"receiveHit": {
		animationName: "$piece-receive-hit-anim",
		animationDuration: `${ATTACK_DURATION_MS}ms`,
	},
});

export function createReceiveHitLayer(
	event: PieceHitEvent,
	className: string
): AnimationLayer {
	return {
		name: "receiveHit",
		className,
		cssVariables: {
			hitPower: event.damage,
		},
	};
}

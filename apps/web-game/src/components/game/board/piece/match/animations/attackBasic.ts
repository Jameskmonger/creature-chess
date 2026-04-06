import { createUseStyles } from "react-jss";

import { PieceAttackEvent } from "@creature-chess/battle";

import { AnimationLayer } from "./types";

const ATTACK_DURATION_MS = 200;
const ATTACK_MOVEMENT_MULTIPLIER_PX = 3;

export const useAttackBasicStyles = createUseStyles({
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
	"attackBasic": {
		position: "relative",
		animationName: "$piece-attack-basic-anim",
		animationDuration: `${ATTACK_DURATION_MS}ms`,
	},
});

export function createAttackBasicLayer(
	event: PieceAttackEvent,
	className: string
): AnimationLayer {
	return {
		name: "attackBasic",
		className,
		cssVariables: {
			attackPower: event.damage,
			attackXDirection: event.direction.x,
			attackYDirection: event.direction.y,
		},
	};
}

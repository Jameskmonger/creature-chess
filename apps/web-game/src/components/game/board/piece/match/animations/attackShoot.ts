import { createUseStyles } from "react-jss";

import { PieceAttackEvent } from "@creature-chess/battle";

const ATTACK_DURATION_MS = 200;
const projectileSize = "10px";

export const useAttackShootStyles = createUseStyles({
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
	"projectile": {
		position: "absolute",
		top: `calc(50% - (${projectileSize} / 2))`,
		left: `calc(50% - (${projectileSize} / 2))`,
		animationName: "$piece-attack-shoot-anim",
		animationDuration: `${ATTACK_DURATION_MS}ms`,
	},
});

export type ProjectileAnimation = {
	className: string;
	cssVariables: Record<string, string | number>;
};

export function createProjectileAnimation(
	event: PieceAttackEvent,
	className: string
): ProjectileAnimation {
	return {
		className,
		cssVariables: {
			attackDistance: event.distance,
			attackXDirection: event.direction.x,
			attackYDirection: event.direction.y,
		},
	};
}

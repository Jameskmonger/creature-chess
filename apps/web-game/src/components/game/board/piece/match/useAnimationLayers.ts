import * as React from "react";

import {
	BattleEvent,
	PieceAttackEvent,
	PieceHitEvent,
} from "@creature-chess/battle";

import { PieceAnimationEventStore } from "./animationEventStore";
import {
	AnimationLayer,
	createAttackBasicLayer,
	createReceiveHitLayer,
	useAttackBasicStyles,
	useDyingStyles,
	useReceiveHitStyles,
} from "./animations";
import { ANIMATION_LAYER_DEPTH } from "./constants";

const EMPTY_LAYERS: (AnimationLayer | undefined)[] = new Array(
	ANIMATION_LAYER_DEPTH
).fill(undefined);

/**
 * Assign each layer a stable slot index so animations don't jump between
 * DOM nodes when other layers are added or removed.
 */
function assignLayer(
	prev: (AnimationLayer | undefined)[],
	layer: AnimationLayer
): (AnimationLayer | undefined)[] {
	const next = [...prev];

	// replace existing layer with the same name (keeps its slot)
	const existingIdx = next.findIndex((l) => l?.name === layer.name);
	if (existingIdx !== -1) {
		next[existingIdx] = layer;
		return next;
	}

	// assign to first empty slot
	const emptyIdx = next.findIndex((l) => l === undefined);
	if (emptyIdx !== -1) {
		next[emptyIdx] = layer;
	}

	return next;
}

function removeLayer(
	prev: (AnimationLayer | undefined)[],
	name: string
): (AnimationLayer | undefined)[] {
	return prev.map((l) => (l?.name === name ? undefined : l));
}

export function useAnimationLayers(
	pieceId: string,
	animationEventStore: PieceAnimationEventStore
) {
	const attackBasicStyles = useAttackBasicStyles();
	const receiveHitStyles = useReceiveHitStyles();
	const dyingStyles = useDyingStyles();

	const [layers, setLayers] = React.useState(EMPTY_LAYERS);
	const [isDying, setIsDying] = React.useState(false);

	const processEvents = React.useCallback(
		(events: BattleEvent[]) => {
			const newLayers: AnimationLayer[] = [];

			for (const event of events) {
				switch (event.type) {
					case "piece_attack": {
						if (event.attackTypeName === "basic") {
							newLayers.push(
								createAttackBasicLayer(
									event as PieceAttackEvent,
									attackBasicStyles.attackBasic
								)
							);
						}
						break;
					}
					case "piece_hit": {
						newLayers.push(
							createReceiveHitLayer(
								event as PieceHitEvent,
								receiveHitStyles.receiveHit
							)
						);
						break;
					}
					case "piece_dying": {
						setIsDying(true);
						break;
					}
					default: {
						console.warn("Unhandled animation event type:", event);
						break;
					}
				}
			}

			if (newLayers.length > 0) {
				setLayers((prev) => {
					let next = prev;
					for (const layer of newLayers) {
						next = assignLayer(next, layer);
					}
					return next;
				});
			}
		},
		[attackBasicStyles.attackBasic, receiveHitStyles.receiveHit]
	);

	// subscribe to the animation event store
	React.useEffect(() => {
		const unsubscribe = animationEventStore.subscribe(() => {
			const events = animationEventStore.consumeEventsForPiece(pieceId);
			if (events.length > 0) {
				processEvents(events);
			}
		});

		return unsubscribe;
	}, [pieceId, animationEventStore, processEvents]);

	const onLayerAnimationEnd = React.useCallback((name: string) => {
		setLayers((prev) => removeLayer(prev, name));
	}, []);

	return {
		layers,
		isDying,
		dyingClassName: dyingStyles.dying,
		onLayerAnimationEnd,
	};
}

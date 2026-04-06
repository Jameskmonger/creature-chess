import * as React from "react";

import { BattleEvent, PieceAttackEvent, PieceHitEvent } from "@creature-chess/battle";

import {
	AnimationLayer,
	createAttackBasicLayer,
	createReceiveHitLayer,
	useAttackBasicStyles,
	useDyingStyles,
	useReceiveHitStyles,
} from "./animations";
import { PieceAnimationEventStore } from "./animationEventStore";

export function useAnimationLayers(
	pieceId: string,
	animationEventStore: PieceAnimationEventStore
) {
	const attackBasicStyles = useAttackBasicStyles();
	const receiveHitStyles = useReceiveHitStyles();
	const dyingStyles = useDyingStyles();

	const [layers, setLayers] = React.useState<AnimationLayer[]>([]);
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
					// replace layers with the same name, add new ones
					const filtered = prev.filter(
						(existing) => !newLayers.some((n) => n.name === existing.name)
					);
					return [...filtered, ...newLayers];
				});
			}
		},
		[
			attackBasicStyles.attackBasic,
			receiveHitStyles.receiveHit,
		]
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
		setLayers((prev) => prev.filter((l) => l.name !== name));
	}, []);

	return {
		layers,
		isDying,
		dyingClassName: dyingStyles.dying,
		onLayerAnimationEnd,
	};
}

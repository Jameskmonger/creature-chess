import { AnimationLayer } from "./animations";
import { ANIMATION_LAYER_DEPTH } from "./constants";

export type LayerSlots = (AnimationLayer | undefined)[];

export const EMPTY_LAYER_SLOTS: LayerSlots = new Array(
	ANIMATION_LAYER_DEPTH
).fill(undefined);

/**
 * Place a layer in the slots array. If a layer with the same name already
 * occupies a slot, replace it in-place — that keeps the slot stable so the
 * animation doesn't jump between DOM nodes when other layers come and go.
 * Otherwise the layer takes the first empty slot. If every slot is full the
 * layer is dropped.
 */
export function assignLayer(prev: LayerSlots, layer: AnimationLayer): LayerSlots {
	const next = [...prev];

	const existingIdx = next.findIndex((l) => l?.name === layer.name);
	if (existingIdx !== -1) {
		next[existingIdx] = layer;
		return next;
	}

	const emptyIdx = next.findIndex((l) => l === undefined);
	if (emptyIdx !== -1) {
		next[emptyIdx] = layer;
	}

	return next;
}

export function removeLayer(prev: LayerSlots, name: string): LayerSlots {
	return prev.map((l) => (l?.name === name ? undefined : l));
}

import {
	EMPTY_LAYER_SLOTS,
	LayerSlots,
	assignLayer,
	removeLayer,
} from "./animationLayerSlots";
import { AnimationLayer } from "./animations";

const layer = (name: string, className = `cls-${name}`): AnimationLayer => ({
	name,
	className,
});

describe("animationLayerSlots", () => {
	describe("assignLayer", () => {
		it("places a new layer in the first empty slot", () => {
			const result = assignLayer(EMPTY_LAYER_SLOTS, layer("attack"));

			expect(result[0]).toEqual(layer("attack"));
			expect(result[1]).toBeUndefined();
		});

		it("places the second new layer in the next empty slot", () => {
			const after1 = assignLayer(EMPTY_LAYER_SLOTS, layer("attack"));
			const after2 = assignLayer(after1, layer("hit"));

			expect(after2[0]).toEqual(layer("attack"));
			expect(after2[1]).toEqual(layer("hit"));
		});

		it("replaces an existing layer with the same name in its current slot", () => {
			const initial: LayerSlots = [layer("attack", "old"), layer("hit")];

			const result = assignLayer(initial, layer("attack", "new"));

			expect(result[0]).toEqual(layer("attack", "new"));
			expect(result[1]).toEqual(layer("hit"));
		});

		it("preserves slot order when replacing - name keeps its slot index", () => {
			const initial: LayerSlots = [layer("hit"), layer("attack", "old")];

			const result = assignLayer(initial, layer("attack", "new"));

			expect(result[0]).toEqual(layer("hit"));
			expect(result[1]).toEqual(layer("attack", "new"));
		});

		it("drops the layer when all slots are full and no name matches", () => {
			const initial: LayerSlots = [layer("attack"), layer("hit")];

			const result = assignLayer(initial, layer("dying"));

			expect(result).toEqual(initial);
		});

		it("returns a new array - does not mutate the input", () => {
			const initial: LayerSlots = [...EMPTY_LAYER_SLOTS];

			const result = assignLayer(initial, layer("attack"));

			expect(result).not.toBe(initial);
			expect(initial).toEqual(EMPTY_LAYER_SLOTS);
		});
	});

	describe("removeLayer", () => {
		it("clears the slot whose layer matches the name", () => {
			const initial: LayerSlots = [layer("attack"), layer("hit")];

			const result = removeLayer(initial, "attack");

			expect(result[0]).toBeUndefined();
			expect(result[1]).toEqual(layer("hit"));
		});

		it("is a no-op when no slot has that name", () => {
			const initial: LayerSlots = [layer("attack"), layer("hit")];

			const result = removeLayer(initial, "missing");

			expect(result).toEqual(initial);
		});

		it("returns a new array - does not mutate the input", () => {
			const initial: LayerSlots = [layer("attack"), layer("hit")];

			const result = removeLayer(initial, "attack");

			expect(result).not.toBe(initial);
			expect(initial[0]).toEqual(layer("attack"));
		});
	});
});

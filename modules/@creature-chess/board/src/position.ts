/* eslint-disable no-bitwise */
declare const PackedPositionBrand: unique symbol;

export type PackedPosition = number & { readonly [PackedPositionBrand]: true };

const X_BITS = 4;
const Y_MASK = (1 << X_BITS) - 1;

export function packPosition(x: number, y: number): PackedPosition {
	return ((x << X_BITS) | (y & Y_MASK)) as PackedPosition;
}

export function unpackX(position: PackedPosition): number {
	return (position >> X_BITS) & Y_MASK;
}

export function unpackY(position: PackedPosition): number {
	return position & Y_MASK;
}

export function unpackPosition(
	position: PackedPosition
): readonly [number, number] {
	return [unpackX(position), unpackY(position)];
}

export function getDelta(a: PackedPosition, b: PackedPosition): { x: number; y: number } {
	const [ax, ay] = unpackPosition(a);
	const [bx, by] = unpackPosition(b);

	return {
		x: Math.abs(ax - bx),
		y: Math.abs(ay - by),
	};
}

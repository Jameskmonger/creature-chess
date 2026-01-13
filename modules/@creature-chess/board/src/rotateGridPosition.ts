import { PackedPosition, packPosition, unpackX, unpackY } from "./position";

export const rotateGridPosition = (
	gridSize: { width: number; height: number },
	position: PackedPosition
): PackedPosition =>
	packPosition(
		gridSize.width - 1 - unpackX(position),
		gridSize.height - 1 - unpackY(position),
	);

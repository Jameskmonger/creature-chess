import React from "react";

import { useAppSelector } from "../state";
import { PiecePicker } from "./PiecePicker";
import { SelectedPiece } from "./SelectedPiece";

export function SelectedTileInfo() {
	const tile = useAppSelector((state) => state.controls.selectedTile);

	if (!tile) {
		return null;
	}

	return (
		<>
			<h2>Selected Tile</h2>

			{tile && <div>{`${tile.x}, ${tile.y}`}</div>}

			<SelectedPiece />

			<PiecePicker />
		</>
	);
}

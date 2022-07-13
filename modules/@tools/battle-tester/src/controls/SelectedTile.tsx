import React from "react";

import { BoardSelectors } from "@shoki/board";

import { useAppSelector } from "../state";

export function SelectedTileInfo() {
	const tile = useAppSelector((state) => state.controls.selectedTile);
	const selectedPiece = useAppSelector((state) => {
		if (!tile) {
			return null;
		}

		return BoardSelectors.getPieceForPosition(state.board, tile.x, tile.y);
	});

	if (!tile) {
		return null;
	}

	return (
		<>
			<h2>Selected Tile</h2>

			{tile && <div>{`${tile.x}, ${tile.y}`}</div>}

			{selectedPiece && <div>{selectedPiece.definition.name}</div>}
		</>
	);
}

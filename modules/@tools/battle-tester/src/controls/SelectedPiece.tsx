import React from "react";

import { BoardSelectors } from "@shoki/board";

import { useAppSelector } from "../state";

export function SelectedPiece() {
	const tile = useAppSelector((state) => state.controls.selectedTile);
	const selectedPiece = useAppSelector((state) => {
		if (!tile) {
			return null;
		}

		return BoardSelectors.getPieceForPosition(state.board, tile.x, tile.y);
	});

	if (!selectedPiece) {
		return null;
	}

	// put definition at the bottom because it's the same for most pieces
	const { definition, ...pieceProps } = selectedPiece;
	const pieceToPrint = JSON.stringify({ ...pieceProps, definition }, null, 2);

	return (
		<>
			<h2>Selected Piece</h2>

			<p>
				{selectedPiece.definition.name} ({selectedPiece.id})
			</p>
			<pre
				style={{
					height: "240px",
					overflowY: "scroll",
					fontSize: "0.9em",
					background: "#ccc",
				}}
			>
				{pieceToPrint}
			</pre>
		</>
	);
}

import React from "react";

import { BoardSelectors } from "@shoki/board";

import { useAppSelector } from "../state";
import { PieceCombatInfo } from "./PieceCombatInfo";

export function SelectedPiece() {
	const combatStore = useAppSelector((state) => state.combatStore);
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

			<div
				style={{
					width: "100%",
					height: "240px",
					fontSize: "0.9em",
					display: "flex",
					flexDirection: "row",
				}}
			>
				<div
					style={{
						width: "49%",
						height: "100%",
						background: "#ccc",
					}}
				>
					<pre
						style={{
							height: "100%",
							overflowY: "scroll",
						}}
					>
						{pieceToPrint}
					</pre>
				</div>

				<div
					style={{
						width: "49%",
						height: "100%",
						overflowY: "scroll",
						background: "#ccc",
					}}
				>
					<PieceCombatInfo piece={selectedPiece} />
				</div>
			</div>
		</>
	);
}

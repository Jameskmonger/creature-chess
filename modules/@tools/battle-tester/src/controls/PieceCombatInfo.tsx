import React from "react";

import { PieceModel } from "@creature-chess/models";

import { useAppSelector } from "../state";

export function PieceCombatInfo({ piece }: { piece: PieceModel }) {
	const combatStore = useAppSelector((state) => state.combatStore);

	if (!combatStore || !piece) {
		return null;
	}

	const pieceToPrint = JSON.stringify(combatStore.getPiece(piece.id), null, 2);

	return (
		<>
			<h2>Combat Info</h2>

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

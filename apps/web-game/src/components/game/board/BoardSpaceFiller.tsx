import React from "react";

import { createUseStyles } from "react-jss";

import { BoardState } from "@shoki/board";

import { SelectedPieceInfo } from "../SelectedPieceInfo";
import { useSelectedPiece } from "../hooks/useSelectedPiece";
import { useGameBoard } from "./GameBoardContext";
import { SellPieceButton } from "./overlays/controls/SellPieceButton";

const useStyles = createUseStyles<string, { size: BoardState["size"] }>({
	filler: ({ size }) => ({
		aspectRatio: `${size.width} / ${size.height}`,
		display: "flex",
		flexDirection: "row",
		gap: "8px",
	}),
	half: {
		display: "flex",
		flexDirection: "column",
		flex: 1,

		// very dirty - 48px is the height of the "piece count" and "ready button" overlays
		height: "calc(100% - 48px)",
	},
});

export function BoardSpaceFiller() {
	const { board } = useGameBoard();
	const styles = useStyles({ size: board.size });

	const selectedPiece = useSelectedPiece();

	return (
		<div className={styles.filler}>
			<div className={styles.half}>
				{selectedPiece && <SelectedPieceInfo />}
			</div>
			<div className={styles.half}>{selectedPiece && <SellPieceButton />}</div>
		</div>
	);
}

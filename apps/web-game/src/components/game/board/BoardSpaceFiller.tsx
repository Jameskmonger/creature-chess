import React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { BoardState } from "@shoki/board";

import { SelectedPieceInfo } from "../SelectedPieceInfo";
import { useSelectedPiece } from "../hooks/useSelectedPiece";
import { useGameBoard } from "./GameBoardContext";
import { PieceCount } from "./overlays/PieceCount";
import { ReadyUpButton } from "./overlays/controls/ReadyUpButton";
import { SellPieceButton } from "./overlays/controls/SellPieceButton";

const useStyles = createUseStyles<string, { size: BoardState["size"] }>({
	filler: ({ size }) => ({
		"aspectRatio": `${size.width} / ${size.height}`,
		"display": "flex",
		"flexDirection": "column",

		"gap": "8px",
		"paddingBottom": "8px",
		"boxSizing": "border-box",

		"@media (orientation: portrait) and (max-width: 400px)": {
			paddingBottom: "4px",
			gap: "4px",
		},
	}),
	row: {
		"display": "flex",
		"flexDirection": "row",
		"justifyContent": "space-between",

		"gap": "8px",

		"@media (orientation: portrait) and (max-width: 400px)": {
			gap: "4px",
		},
	},
	grow: {
		flex: 1,
	},
	half: {
		display: "flex",
		flexDirection: "column",
		flex: 1,
	},
	selectedPiece: {
		"display": "flex",
		"flexDirection": "column",

		"gap": "8px",

		"@media (orientation: portrait) and (max-width: 400px)": {
			gap: "4px",
		},
	},
});

export function BoardSpaceFiller() {
	const { board } = useGameBoard();
	const styles = useStyles({ size: board.size });

	const selectedPiece = useSelectedPiece();

	return (
		<div className={styles.filler}>
			<div className={classNames(styles.row, styles.grow)}>
				<div className={classNames(styles.half, styles.selectedPiece)}>
					{selectedPiece && <SelectedPieceInfo />}
					{selectedPiece && <SellPieceButton />}
				</div>
				<div className={styles.half}></div>
			</div>
			<div className={styles.row}>
				<div className={styles.half}>
					<PieceCount />
				</div>
				<div className={styles.half}>
					<ReadyUpButton />
				</div>
			</div>
		</div>
	);
}

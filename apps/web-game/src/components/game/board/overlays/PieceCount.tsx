import React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { useLocalPlayerId } from "~/auth/context";
import { AppState } from "~/store";

import { BoardSelectors } from "@shoki/board";

import { getPlayerLevel } from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";

const useStyles = createUseStyles({
	pieceCount: {
		"fontSize": "14px",
		"fontStyle": "italic",
		"textAlign": "center",
		"width": "fit-content",
		"fontWeight": "700",

		"padding": "8px",

		"letterSpacing": "2px",

		"color": "#fff",
		"background": "#1d1d1d",
		"border": "2px solid #121212",

		"@media (orientation: portrait) and (max-width: 400px)": {
			fontSize: "10px",
			padding: "4px",
			letterSpacing: "1px",
		},
	},
	pieceCountWarning: {
		color: "#ff6464",
		background: "#ffd2d2",
		border: "2px solid #ff6464",
	},
});

export function PieceCount() {
	const styles = useStyles();

	const playerId = useLocalPlayerId();

	const pieceCount = useSelector<AppState, number>(
		(state) =>
			BoardSelectors.getAllPieces(state.game.board).filter(
				(p) => p.ownerId === playerId
			).length
	);
	const level = useSelector<AppState, number>((state) =>
		getPlayerLevel(state.game)
	);

	const inPreparingPhase = useSelector<AppState, boolean>(
		(state) => state.game.roundInfo.phase === GamePhase.PREPARING
	);

	if (!inPreparingPhase) {
		return null;
	}

	if (pieceCount < level) {
		return (
			<p className={classNames(styles.pieceCount, styles.pieceCountWarning)}>
				{pieceCount} / {level} pieces
			</p>
		);
	}

	return (
		<p className={styles.pieceCount}>
			{pieceCount} / {level} pieces
		</p>
	);
}

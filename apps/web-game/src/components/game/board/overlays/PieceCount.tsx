import React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";

import { BoardSelectors } from "@shoki/board";

import { getPlayerLevel } from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";

import { useLocalPlayerId } from "../../../../auth/context";
import { AppState } from "../../../../store";

const useStyles = createUseStyles({
	pieceCount: {
		fontSize: "14px",
		fontStyle: "italic",
		textAlign: "center",

		position: "absolute",
		top: "4px",
		left: "4px",
		padding: "4px 8px",

		zIndex: 400,

		fontFamily: '"Roboto", sans-serif',
		letterSpacing: "2px",
	},
	pieceCountWarning: {
		width: "fit-content",
		fontWeight: "700",
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
				{pieceCount} / {level} pieces (board not full!)
			</p>
		);
	}

	return (
		<p className={styles.pieceCount}>
			{pieceCount} / {level} pieces
		</p>
	);
}

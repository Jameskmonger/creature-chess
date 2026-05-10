import React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { useAccountId } from "~/auth/context";
import { useBoardSubscription } from "~/components/board/useBoard";
import { AppState } from "~/store";
import { useLocalPlayer } from "~/store/game/players";

import { GamePhase } from "@creature-chess/models";

import { useGameSession } from "~/game/sessionContext";

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

	const { board, pieceRegistry } = useGameSession();
	const b = useBoardSubscription(board);

	const playerId = useAccountId();

	const pieceCount = b
		.getAllPieces()
		.filter(
			(p) => pieceRegistry.getPieceById(p.id)?.ownerId === playerId
		).length;

	const level = useLocalPlayer()?.level ?? 0;

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

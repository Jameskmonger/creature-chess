import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "~/store";

import { BoardSelectors } from "@shoki/board";

import { PlayerActions } from "@creature-chess/gamemode";
import { getPiecesForStage } from "@creature-chess/gamemode/src/game/evolution";
import { GamePhase, PieceModel } from "@creature-chess/models";
import { PIECES_TO_EVOLVE } from "@creature-chess/models/config";

import { COLOR_READY_BUTTON_TEXT, COLOR_READY_BUTTON } from "./colors";

const useStyles = createUseStyles({
	controlButton: {
		"box-sizing": "border-box",
		"font-size": "1rem",
		"color": COLOR_READY_BUTTON_TEXT,
		"cursor": "pointer",
		"background": COLOR_READY_BUTTON,
		"border": "none",
		"letterSpacing": "2px",
		"fontSize": "14px",
		"fontWeight": "700",
		"padding": "8px 8px",
	},
});

export function SellPieceButton() {
	const dispatch = useDispatch();
	const styles = useStyles();

	const selectedPiece = useSelector<AppState, PieceModel | null>((state) => {
		const inPreparingPhase = state.game.roundInfo.phase === GamePhase.PREPARING;
		const id = state.game.ui.selectedPieceId;

		if (!inPreparingPhase || !id) {
			return null;
		}

		return (
			BoardSelectors.getPiece(state.game.board, id) ||
			BoardSelectors.getPiece(state.game.bench, id) ||
			null
		);
	});

	const onSell = React.useCallback(() => {
		if (!selectedPiece) {
			return;
		}

		dispatch(
			PlayerActions.sellPiecePlayerAction({ pieceId: selectedPiece.id })
		);
	}, [dispatch, selectedPiece]);

	if (!selectedPiece) {
		return null;
	}

	const piecesUsed = getPiecesForStage(selectedPiece.stage, PIECES_TO_EVOLVE);
	const pieceCost = selectedPiece.definition.cost;

	return (
		<button className={styles.controlButton} onClick={onSell}>
			Sell (${pieceCost * piecesUsed})
		</button>
	);
}

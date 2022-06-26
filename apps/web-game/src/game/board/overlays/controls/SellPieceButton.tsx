import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSelector, useDispatch } from "react-redux";

import { BoardSelectors } from "@shoki/board";

import { PlayerActions } from "@creature-chess/gamemode";
import { GamePhase, PieceModel } from "@creature-chess/models";

import { AppState } from "../../../../store";
import { COLOR_READY_BUTTON_TEXT, COLOR_READY_BUTTON } from "./colors";

const useStyles = createUseStyles({
	sellPieceButton: {
		"box-sizing": "border-box",
		padding: "2rem",
		"font-size": "1.6rem",
		color: COLOR_READY_BUTTON_TEXT,
		cursor: "pointer",
		background: COLOR_READY_BUTTON,
		border: "none",
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

	if (!selectedPiece) {
		return null;
	}

	const onSell = React.useCallback(
		() =>
			dispatch(
				PlayerActions.sellPiecePlayerAction({ pieceId: selectedPiece.id })
			),
		[]
	);

	return (
		<button className={styles.sellPieceButton} onClick={onSell}>
			Sell (${selectedPiece.definition.cost})
		</button>
	);
}

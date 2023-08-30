import * as React from "react";

import { useSelector, useDispatch } from "react-redux";

import { BoardSelectors } from "@shoki/board";

import { PlayerActions } from "@creature-chess/gamemode";
import { getPiecesForStage } from "@creature-chess/gamemode/src/game/evolution";
import { GamePhase, PieceModel } from "@creature-chess/models";
import { DEFAULT_GAME_OPTIONS } from "@creature-chess/models/config";

import { AppState } from "../../../../store";
import { useStyles } from "./styles";

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

	const piecesUsed = getPiecesForStage(
		selectedPiece.stage,
		DEFAULT_GAME_OPTIONS.game.piecesToEvolve
	);
	const pieceCost = selectedPiece.definition.cost;

	return (
		<button className={styles.controlButton} onClick={onSell}>
			Sell (${pieceCost * piecesUsed})
		</button>
	);
}

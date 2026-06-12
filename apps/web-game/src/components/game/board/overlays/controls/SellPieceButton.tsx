import * as React from "react";

import { getPiecesForStage } from "@creature-chess/models";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { Button } from "~/components/ui";
import { BalanceIcon } from "~/components/ui/icon/BalanceIcon";
import { useGameSession } from "~/game/sessionContext";
import { useGameActions } from "~/networking";
import { getCreatureDefinitionById } from "~/networking/creatureDefinitions";
import { AppState } from "~/store";

import { GamePhase } from "@creature-chess/models";
import { PIECES_TO_EVOLVE } from "@creature-chess/models";

import { COLOR_READY_BUTTON_TEXT } from "./colors";

const useStyles = createUseStyles({
	balanceIcon: {
		color: COLOR_READY_BUTTON_TEXT,
	},
});

export function SellPieceButton() {
	const gameActions = useGameActions();
	const styles = useStyles();

	const gamePhase = useSelector<AppState, GamePhase>(
		(state) => state.game.roundInfo.phase
	);

	const selectedPieceId = useSelector<AppState, string | null>(
		(state) => state.game.ui.selectedPieceId
	);

	const { pieceRegistry } = useGameSession();

	const selectedPiece = React.useMemo(() => {
		if (gamePhase !== GamePhase.PREPARING || !selectedPieceId) {
			return null;
		}

		return pieceRegistry.getPieceById(selectedPieceId);
	}, [gamePhase, selectedPieceId, pieceRegistry]);

	const onSell = React.useCallback(() => {
		if (!selectedPiece) {
			return;
		}

		gameActions.sellPiece(selectedPiece.id);
	}, [gameActions, selectedPiece]);

	if (!selectedPiece) {
		return null;
	}

	const piecesUsed = getPiecesForStage(selectedPiece.stage, PIECES_TO_EVOLVE);
	const pieceCost =
		getCreatureDefinitionById(selectedPiece.definitionId)?.cost ?? 0;

	return (
		<Button color="secondary" size="small" onClick={onSell}>
			Sell&nbsp;-&nbsp;
			<BalanceIcon
				amount={pieceCost * piecesUsed}
				className={styles.balanceIcon}
			/>
		</Button>
	);
}

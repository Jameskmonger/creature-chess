import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";

import { Piece, usePiece } from "@cc-web/ui";

import { AppState } from "../../../store";
import { playerClickPieceAction } from "../sagas/clickPieceSaga";

const useStyles = createUseStyles({
	selectablePiece: {
		width: "100%",
		height: "100%",
	},
	selected: {
		boxSizing: "border-box",
		border: "2px solid #ff5200",
	},
});

export const SelectablePiece: React.FC = () => {
	const styles = useStyles();

	const { piece } = usePiece();

	const dispatch = useDispatch();
	const selectedPieceId = useSelector<AppState, string | null>(
		(state) => state.game.ui.selectedPieceId
	);

	const onClick = () => {
		console.log(
			`[SelectablePiece] just clicked piece ${piece.id} , selected was: ${selectedPieceId}`
		);
		dispatch(playerClickPieceAction({ pieceId: piece.id }));
	};

	const isSelected = selectedPieceId === piece.id;

	if (!piece) {
		return null;
	}

	const className = classNames(styles.selectablePiece, {
		[styles.selected]: isSelected,
	});

	return (
		<div className={className}>
			<Piece healthbar="none" onClick={onClick} />
		</div>
	);
};

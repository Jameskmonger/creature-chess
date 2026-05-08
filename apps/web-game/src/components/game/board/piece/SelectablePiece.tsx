import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { AppState } from "~/store";

import { useOnClickPiece } from "../hooks/clickPiece";
import { Piece } from "./Piece";
import { usePiece } from "./PieceContext";

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

export function SelectablePiece() {
	const styles = useStyles();

	const { piece } = usePiece();

	const onClickPiece = useOnClickPiece();
	const selectedPieceId = useSelector<AppState, string | null>(
		(state) => state.game.ui.selectedPieceId
	);

	const onClick = () => {
		onClickPiece(piece.id);
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
}

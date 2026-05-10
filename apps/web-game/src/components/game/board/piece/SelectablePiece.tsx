import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { AppState } from "~/store";

import { PieceModel } from "@creature-chess/models";

import { useOnClickPiece } from "../hooks/clickPiece";
import { Piece } from "./Piece";

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

export function SelectablePiece({ piece }: { piece: PieceModel }) {
	const styles = useStyles();

	const onClickPiece = useOnClickPiece();
	const selectedPieceId = useSelector<AppState, string | null>(
		(state) => state.game.ui.selectedPieceId
	);

	const onClick = () => {
		onClickPiece(piece.id);
	};

	const isSelected = selectedPieceId === piece.id;

	const className = classNames(styles.selectablePiece, {
		[styles.selected]: isSelected,
	});

	return (
		<div className={className}>
			<Piece piece={piece} onClick={onClick} />
		</div>
	);
}

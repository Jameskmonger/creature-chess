import React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";

import { getDefinitionById } from "@creature-chess/gamemode";
import { PieceModel } from "@creature-chess/models";

import { Layout } from "@cc-web/ui";

import { AppState } from "../../../store";

const useStyles = createUseStyles({
	info: {
		border: "1px solid #fff",
		borderRadius: "4px",
		marginBottom: "0.25em",
		padding: "0.5em",
		color: "#fff",
		fontFamily: "Arial, sans-serif",
	},
	name: {
		fontWeight: "700",
	},
	highlight: {
		textTransform: "uppercase",
	},
	price: {
		color: "#ffcd75",
		fontStyle: "italic",
	},
	stage: {
		color: "#d1d1d1",
		fontSize: "0.875em",
		fontStyle: "italic",
	},
	stat: {},
});

export function SelectedPieceInfo() {
	const styles = useStyles();

	const selectedPieceId = useSelector<AppState, string | null>(
		(state) => state.game.ui.selectedPieceId
	);

	const selectedPiece = useSelector<AppState, PieceModel | null>((state) =>
		selectedPieceId ? state.game.board.pieces[selectedPieceId] : null
	);

	if (selectedPiece === null) {
		return null;
	}

	const definition = getDefinitionById(selectedPiece.definitionId);

	if (!definition) {
		return null;
	}

	const stats = definition.stages[selectedPiece.stage];

	return (
		<div className={styles.info}>
			<Layout direction="row" justifyContent="left">
				<span className={styles.name}>{definition.name}</span>&nbsp;
				<span className={styles.price}>${definition.cost}</span>
				&nbsp;&mdash;&nbsp;
				<span className={styles.highlight}>{definition.type}</span>
				&nbsp;&mdash;&nbsp;
				<span className={styles.highlight}>{definition.class}</span>
			</Layout>
			<Layout direction="row" justifyContent="left">
				<span className={styles.stage}>
					( stage {selectedPiece.stage + 1} ):
				</span>
				&nbsp;
				<span className={styles.stat}>[ ATK: {stats.attack} ]</span>
				&nbsp;&mdash;&nbsp;
				<span className={styles.stat}>[ DEF: {stats.defense} ]</span>
				&nbsp;&mdash;&nbsp;
				<span className={styles.stat}>[ SPD: {stats.speed} ]</span>
				&nbsp;&mdash;&nbsp;
				<span className={styles.stat}>[ HP: {stats.hp} ]</span>
			</Layout>
		</div>
	);
}

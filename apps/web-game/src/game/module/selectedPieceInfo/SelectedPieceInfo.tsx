import React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";

import { BoardSelectors } from "@shoki/board";

import { getDefinitionById } from "@creature-chess/gamemode";
import { PieceModel } from "@creature-chess/models";

import { Layout } from "@cc-web/ui";

import { AppState } from "../../../store";

const useStyles = createUseStyles({
	info: {
		border: "1px solid #fff",
		borderRadius: "4px",
		marginBottom: "0.25em",
		padding: "0.25em",
		color: "#fff",
		fontFamily: "Arial, sans-serif",
		height: "3.2em",
	},
	hidden: {
		visibility: "hidden",
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
		marginRight: "0.25em",
	},
	stat: {
		fontSize: "0.75em",
		marginRight: "0.25em",
	},
});

export function SelectedPieceInfo() {
	const styles = useStyles();

	const selectedPieceId = useSelector<AppState, string | null>(
		(state) => state.game.ui.selectedPieceId
	);

	const selectedPiece = useSelector<AppState, PieceModel | null>((state) =>
		selectedPieceId
			? BoardSelectors.getPiece(state.game.board, selectedPieceId) ||
				BoardSelectors.getPiece(state.game.bench, selectedPieceId) ||
				null
			: null
	);

	if (selectedPiece === null) {
		return <div className={classNames(styles.info, styles.hidden)} />;
	}

	const definition = getDefinitionById(selectedPiece.definitionId);

	if (!definition) {
		return <div className={classNames(styles.info, styles.hidden)} />;
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
				<span className={styles.stat}>[ ATK: {stats.attack} ]</span>
				<span className={styles.stat}>[ DEF: {stats.defense} ]</span>
				<span className={styles.stat}>[ SPD: {stats.speed} ]</span>
				<span className={styles.stat}>[ HP: {stats.hp} ]</span>
			</Layout>
		</div>
	);
}

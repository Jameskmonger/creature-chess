import React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { AppState } from "~/store";

import { BoardSelectors } from "@shoki/board";

import { getDefinitionById } from "@creature-chess/gamemode";
import { PieceModel } from "@creature-chess/models";

import { TraitIcon } from "../ui/TraitIcon";
import { Layout } from "../ui/layout";
import { useSelectedPiece } from "./hooks/useSelectedPiece";

const useStyles = createUseStyles({
	info: {
		border: "1px solid #fff",
		borderRadius: "4px",
		marginBottom: "0.25em",
		padding: "0.25em",
		color: "#fff",
	},
	hidden: {
		visibility: "hidden",
	},
	name: {
		fontWeight: "700",
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
	traits: {
		"height": "48px",
		"paddingBottom": "8px",

		"display": "flex",
		"flexDirection": "row",

		"& > *:not(:last-child)": {
			marginRight: "0.25em",
		},

		"@media (max-width: 414px)": {
			height: "32px",
		},
	},
});

export function SelectedPieceInfo() {
	const styles = useStyles();
	const selectedPiece = useSelectedPiece();

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
				<div className={styles.traits}>
					{selectedPiece.traits.map((trait) => (
						<TraitIcon key={trait} trait={trait} label />
					))}
				</div>
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

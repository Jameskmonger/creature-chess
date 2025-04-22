import React from "react";

import { createUseStyles } from "react-jss";

import { getDefinitionById } from "@creature-chess/gamemode";

import { TraitIcon } from "../ui/TraitIcon";
import { BalanceIcon } from "../ui/icon/BalanceIcon";
import { useSelectedPiece } from "./hooks/useSelectedPiece";

const useStyles = createUseStyles({
	root: {
		border: "1px solid #fff",
		borderRadius: "4px",
		padding: "4px",
		color: "#fff",

		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",

		gap: "8px",

		flex: 1,
	},
	info: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	nameContainer: {
		display: "flex",
		flexDirection: "column",
		gap: "4px",
	},
	hidden: {
		visibility: "hidden",
	},
	name: {
		"fontFamily": '"Caveat Brush", cursive',
		"fontSize": "20px",

		"@media (orientation: portrait) and (max-width: 400px)": {
			fontSize: "18px",
		},
	},
	price: {
		color: "#ffcd75",
		fontStyle: "italic",
	},
	stats: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	stat: {
		"fontSize": "14px",

		"@media (orientation: portrait) and (max-width: 430px)": {
			fontSize: "10px",
		},
	},
	traits: {
		"height": "48px",
		"paddingBottom": "8px",

		"display": "flex",
		"flexDirection": "row",

		"& > *:not(:last-child)": {
			marginRight: "8px",
		},

		"@media (orientation: portrait) and (max-width: 430px)": {
			height: "32px",
		},
	},
	balanceIcon: {
		"@media (orientation: portrait) and (max-width: 430px)": {
			fontSize: "12px",
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
		<div className={styles.root}>
			<div className={styles.info}>
				<div className={styles.nameContainer}>
					<span className={styles.name}>{definition.name}</span>
					<BalanceIcon
						amount={definition.cost}
						className={styles.balanceIcon}
					/>
				</div>
				<div className={styles.traits}>
					{selectedPiece.traits.map((trait) => (
						<TraitIcon key={trait} trait={trait} label />
					))}
				</div>
			</div>
			<div className={styles.stats}>
				<span className={styles.stat}>ATK {stats.attack}</span>
				<span className={styles.stat}>DEF {stats.defense}</span>
				<span className={styles.stat}>SPD {stats.speed}</span>
				<span className={styles.stat}>HP {stats.hp}</span>
			</div>
		</div>
	);
}

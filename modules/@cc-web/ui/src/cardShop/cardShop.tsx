import React from "react";

import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUseStyles } from "react-jss";

import { Card as CardModel } from "@creature-chess/models";

import { useGamemodeSettings } from "@cc-web/ui/GamemodeSettingsContext";

import { Button } from "../button";
import { Card } from "./card";

type Props = {
	cards: (CardModel | null)[];
	ownedDefinitionIds: number[];
	money: number;
	isLocked?: boolean;
	onReroll?: () => void;
	onToggleLock?: () => void;
	onBuy?: (index: number) => void;
};

const useStyles = createUseStyles({
	shop: {
		display: "flex",
		flexDirection: "column",

		height: "100%",
		boxSizing: "border-box",

		fontFamily: "Arial, sans-serif",
	},
	cards: {
		display: "flex",
		flexDirection: "column",
		padding: "2%",
		background: "#797979",
		height: "100%",
	},
	card: {
		"height": "18%",

		"&:not(:last-child)": {
			marginBottom: "2%",
		},
	},
	controls: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: "2%",
		background: "#303030",
	},
	control: {
		"border": "none",

		"cursor": "pointer",
		"background": "#38b764",
		"borderRadius": "4px",

		"fontFamily": '"Roboto", "sans-serif"',
		"fontOpticalSizing": "auto",
		"fontWeight": 700,
		"fontStyle": "normal",
		"fontSize": "16px",

		"padding": "4% 6%",

		"&[disabled]": {
			background: "#303030",
			cursor: "not-allowed",
		},

		"&:hover": {
			background: "#4aeb82",
		},

		"transition": "background 0.2s ease-in-out",
	},
});

export function CardShop({
	cards,
	money,
	onReroll,
	onToggleLock,
	onBuy,
	isLocked,
}: Props) {
	const classes = useStyles();

	const { rerollCost } = useGamemodeSettings();

	return (
		<div className={classes.shop}>
			<div className={classes.cards}>
				{cards.map((card, index) => (
					<div className={classes.card} key={card ? card.id : `empty-${index}`}>
						{card !== null && (
							<Card
								key={card!.id}
								card={card}
								money={money}
								onBuy={() => onBuy?.(index)}
							/>
						)}
					</div>
				))}
			</div>

			<div className={classes.controls}>
				<button className={classes.control} onClick={onToggleLock}>
					{isLocked ? "Unlock" : "Lock (1 turn)"}
				</button>

				<button
					className={classes.control}
					onClick={onReroll}
					disabled={money < rerollCost}
				>
					<FontAwesomeIcon icon={faArrowsRotate} />
					&nbsp;${rerollCost}
				</button>
			</div>
		</div>
	);
}

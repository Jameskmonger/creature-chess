import React from "react";

import {
	faArrowsRotate,
	faCoins,
	faLock,
	faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUseStyles } from "react-jss";
import { useGamemodeSettings } from "~/contexts/GamemodeSettingsContext";

import { Card as CardModel } from "@creature-chess/models";

import { BalanceIcon } from "../../../ui/icon/BalanceIcon";
import { Card2D as Card } from "./card";

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
	},
	cards: {
		display: "flex",
		flexDirection: "column",
		padding: "2%",
		background: "#404040",
		height: "100%",
		justifyContent: "space-between",
	},
	bottomBar: {
		"display": "flex",
		"flexDirection": "row",
		"justifyContent": "space-between",
		"padding": "2%",
		"background": "#303030",
		"gap": "16px",

		"& > button": {
			flex: 1,
		},
	},
	balance: {
		"flex": 1,
		"display": "flex",
		"justifyContent": "center",
		"alignItems": "center",
		"color": "#ffffff",
		"fontSize": "32px",
		"letterSpacing": "3px",

		"@media (orientation: portrait) and (max-width: 376px)": {
			fontSize: "24px",
		},
	},
	balanceIcon: {
		marginRight: "8px",
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
		"fontSize": "24px",

		"padding": "4% 6%",

		"&[disabled]": {
			background: "#303030",
			cursor: "not-allowed",
		},

		"&:hover": {
			background: "#4aeb82",
		},

		"transition": "background 0.2s ease-in-out",

		"& > span": {
			fontSize: "14px",
			marginLeft: "6px",
		},

		"@media (orientation: portrait) and (max-width: 376px)": {
			"fontSize": "16px",
			"& > span": {
				fontSize: "10px",
			},
		},
	},
});

export function CardShop({
	cards,
	money,
	ownedDefinitionIds,
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
				{cards.map(
					(card, index) =>
						card !== null && (
							<Card
								key={card!.id}
								card={card}
								money={money}
								owned={ownedDefinitionIds.includes(card.definitionId)}
								onBuy={() => onBuy?.(index)}
							/>
						)
				)}
			</div>

			<div className={classes.bottomBar}>
				<div className={classes.balance}>
					<span>
						<BalanceIcon className={classes.balanceIcon} /> {money}
					</span>
				</div>
				<button className={classes.control} onClick={onToggleLock}>
					{isLocked ? (
						<FontAwesomeIcon icon={faLockOpen} />
					) : (
						<>
							<FontAwesomeIcon icon={faLock} />
							<span>(1 turn)</span>
						</>
					)}
				</button>

				<button
					className={classes.control}
					onClick={onReroll}
					disabled={money < rerollCost}
				>
					<FontAwesomeIcon icon={faArrowsRotate} />
					<span>${rerollCost}</span>
				</button>
			</div>
		</div>
	);
}

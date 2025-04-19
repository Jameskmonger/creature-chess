import React, { useCallback, useEffect, useState } from "react";

import { createUseStyles } from "react-jss";

import { Card } from "@creature-chess/models";

import { IMAGE_BASE_URL } from "@cc-web/shared/constants";

import { CreatureImage } from "../../display";
import { TraitIcon } from "../../display/TraitIcon";

type CardShopCardProps = {
	card: Card | null;
	money: number;
	owned: boolean;
	onBuy?: () => void;
};

const useStyles = createUseStyles<string, CardShopCardProps>({
	card: {
		display: "flex",
		flexDirection: "row",

		userSelect: "none",
	},
	imageContainer: {
		aspectRatio: "1/1",
		background: "#303030",
		padding: "2% 4% 2% 2%",

		position: "relative",
	},
	image: {
		width: "64px",
		height: "64px",

		zIndex: 10,

		position: "relative",
	},
	shadow: {
		position: "absolute",

		width: "64px",
		height: "64px",

		backgroundColor: "#1c1c1c",
		borderRadius: "50%",

		filter: "blur(4px)",
		zIndex: 9,
	},
	info: {
		flex: 1,

		display: "flex",
		flexDirection: "column",

		background: "#303030",
	},
	nameBar: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "1% 5%",
		background: "#101010",
		zIndex: 11,
		borderBottom: (props) =>
			`6px solid ${
				["", "#b4b4b4", "#4eba4e", "#4690ff", "#993899", "#e09429"][
					props.card!.cost
				] || "#ff0000"
			}`,
	},
	name: {
		color: "#fff",

		fontFamily: '"Caveat Brush", cursive',
		fontWeight: 400,
		fontStyle: "normal",
		fontSize: "24px",
	},
	traits: {
		"display": "flex",
		"flexDirection": "row",
		"alignItems": "center",

		"height": "64px",
		"paddingBottom": "8px",

		"@media (max-width: 375px)": {
			height: "32px",
			paddingBottom: 0,
		},

		"@media (min-width: 376px) and (max-width: 430px)": {
			height: "48px",
		},
	},
	traitIcon: {
		"height": "70%",

		"&:not(:last-child)": {
			marginRight: "16px",
		},

		"@media (max-width: 375px)": {
			"&:not(:last-child)": {
				marginRight: "8px",
			},
		},
	},
	buyContainer: {
		background: "#101010",
		width: "20%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	buy: {
		"border": "none",

		"height": "75%",
		"width": "75%",

		"cursor": "pointer",
		"background": "#38b764",
		"borderRadius": "12.5%",

		"fontFamily": '"Roboto", "sans-serif"',
		"fontOpticalSizing": "auto",
		"fontWeight": 700,
		"fontStyle": "normal",
		"fontSize": "18px",
		"letterSpacing": "-1px",

		"&[disabled]": {
			background: "#303030",
			cursor: "not-allowed",
		},

		"&:hover": {
			background: "#4aeb82",
		},

		"transition": "background 0.2s ease-in-out",
	},
	ownedIcon: {
		width: "24px",
		height: "24px",
	},
});

export function Card2D(props: CardShopCardProps) {
	const classes = useStyles(props);

	const { card, money } = props;

	const [shuffleAmount, setShuffleAmount] = useState(0);

	useEffect(() => {
		if (card) {
			const multiplier = card.cost * 4;
			const amount = Math.random() * multiplier - multiplier / 2;

			setShuffleAmount(amount);
		}
	}, [card]);

	const onBuy = useCallback(() => {
		if (!props.onBuy || !card || card.cost > money) {
			return;
		}

		props.onBuy();
	}, [props, card, money]);

	if (!card) {
		return null;
	}

	return (
		<div className={classes.card}>
			<div className={classes.imageContainer}>
				<div className={classes.shadow} />
				<div className={classes.image}>
					<CreatureImage definitionId={card.definitionId} />
				</div>
			</div>

			<div className={classes.info}>
				<div className={classes.nameBar}>
					<span className={classes.name}>{card.name}</span>
					{props.owned && (
						<img
							className={classes.ownedIcon}
							src={`${IMAGE_BASE_URL}/ui/arrow_up_green.png`}
						/>
					)}
				</div>

				<div className={classes.traits}>
					{card.traits.map((trait) => (
						<TraitIcon
							key={trait}
							className={classes.traitIcon}
							trait={trait}
							label
						/>
					))}
				</div>
			</div>

			<div className={classes.buyContainer}>
				<button
					className={classes.buy}
					disabled={card.cost > money}
					onClick={onBuy}
				>
					<div style={{ rotate: `${shuffleAmount}deg` }}>$ {card.cost}</div>
				</button>
			</div>
		</div>
	);
}

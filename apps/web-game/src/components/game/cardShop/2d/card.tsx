import React, { useCallback, useEffect, useState } from "react";

import { createUseStyles } from "react-jss";

import { Card } from "@creature-chess/models";

import { TraitIcon } from "../../../ui/TraitIcon";
import { CreatureImage } from "../../../ui/creatureImage";

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
		alignItems: "center",

		userSelect: "none",

		containerType: "inline-size",
		containerName: "card",
		background: (props) =>
			["", "#696969", "#2e762e", "#2e89ff", "#931093", "#e09429"][
				props.card!.cost
			] || "#ff0000",
	},
	imageContainer: {
		aspectRatio: "1/1",
		height: "100%",

		display: "flex",
		justifyContent: "center",
		alignItems: "center",

		position: "relative",
	},
	image: {
		"width": "64px",
		"height": "64px",

		"zIndex": 10,

		"position": "relative",

		"@media (orientation: portrait) and (max-width: 375px)": {
			width: "48px",
			height: "48px",
		},
	},
	shadow: {
		"position": "absolute",

		"width": (props) =>
			["0px", "10px", "24px", "36px", "52px", "62px"][props.card!.cost] ||
			"0px",
		"height": (props) =>
			["0px", "10px", "24px", "36px", "52px", "62px"][props.card!.cost] ||
			"0px",

		"@media (orientation: portrait) and (max-width: 375px)": {
			width: (props) =>
				["0px", "6px", "10px", "20px", "36px", "46px"][props.card!.cost] ||
				"0px",
			height: (props) =>
				["0px", "6px", "10px", "20px", "36px", "46px"][props.card!.cost] ||
				"0px",
		},

		"aspectRatio": "1/1",

		"background":
			"radial-gradient(hsl(0 0% 60% / 1), hsl(0 0% 20% / 1), hsl(0 0% 12% / 1))",
		"borderRadius": "50%",

		"filter": (props) =>
			`blur(${
				["0px", "12px", "8px", "4px", "2px", "0px"][props.card!.cost] || "0px"
			})`,
		"zIndex": 9,
	},
	info: {
		flex: 1,

		display: "flex",
		flexDirection: "column",
	},
	nameBar: {
		"display": "flex",
		"justifyContent": "space-between",
		"alignItems": "center",
		"padding": "2px 8px",

		"@container card (min-height: 112px)": {
			padding: "4px 8px",
			borderBottomWidth: "6px",
		},

		"background": "#101010",
		"zIndex": 11,
		"borderBottom": (props) =>
			`4px solid ${
				["", "#b4b4b4", "#4eba4e", "#0258d9", "#c94fbd", "#b86d05"][
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

		"@container card (min-height: 112px)": {
			height: "64px",
		},

		"@media (orientation: portrait) and (max-width: 374px)": {
			height: "32px",
			paddingBottom: 0,
		},

		"@media (orientation: portrait) and (min-width: 375px) and (max-width: 429px)":
			{
				height: "48px",
			},

		"@media (orientation: portrait) and (min-width: 430px)": {
			height: "64px",
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
		height: "100%",
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
				<CreatureImage
					definitionId={card.definitionId}
					className={classes.image}
				/>
			</div>

			<div className={classes.info}>
				<div className={classes.nameBar}>
					<span className={classes.name}>{card.name}</span>
					{props.owned && (
						<img
							className={classes.ownedIcon}
							src={`${APP_IMAGE_ROOT}/ui/arrow_up_green.png`}
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

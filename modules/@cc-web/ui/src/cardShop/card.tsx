import React, { useCallback, useEffect, useState } from "react";

import { createUseStyles } from "react-jss";

import { Card, DefinitionClass } from "@creature-chess/models";

import { CreatureImage, TypeIndicator } from "../display";
import { IMAGE_BASE_URL } from "@cc-web/shared/constants";


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
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",

		paddingLeft: "5%",
		marginLeft: "-5%",
		background: "#101010",
		paddingBottom: "2%",

		zIndex: 11,

		borderWidth: "0 0 2px",
		borderStyle: "solid",
		borderBottomWidth: "3px",
		borderBottomColor: (props) => {
			switch (props.card!.cost) {
				case 1:
					return "#b4b4b4";
				case 2:
					return "#4eba4e";
				case 3:
					return "#4690ff";
				case 4:
					return "#993899";
				case 5:
					return "#e09429";
				default:
					return "#ff0000";
			}
		},
	},
	name: {
		color: "#fff",

		fontFamily: '"Caveat Brush", cursive',
		fontWeight: 400,
		fontStyle: "normal",
		fontSize: "24px",
	},
	traits: {
		"flex": 1,
		"display": "flex",
		"flexDirection": "row",
		"alignItems": "center",
		"justifyContent": "space-between",

		"& > img": {
			height: "24px",
		},
	},
	class: {
		color: "#d7d7d7",

		fontFamily: '"Roboto", "sans-serif"',
		fontOpticalSizing: "auto",
		fontWeight: 400,
		fontStyle: "normal",
		fontSize: "14px",
		marginRight: "5%",
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

export function Card(props: CardShopCardProps) {
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

	return (
		<div key={card!.id} className={classes.card}>
			<div className={classes.imageContainer}>
				<div className={classes.shadow} />

				<div className={classes.image}>
					<CreatureImage definitionId={card!.definitionId} />
				</div>
			</div>
			<div className={classes.info}>
				<div className={classes.nameBar}>
					<span className={classes.name}>{card!.name}</span>
					{props.owned && (
						<img
							className={classes.ownedIcon}
							src={`${IMAGE_BASE_URL}/ui/arrow_up_green.png`}
						/>
					)}
				</div>
				<div className={classes.traits}>
					<TypeIndicator type={card!.type} />

					<span className={classes.class}>
						{card!.class === DefinitionClass.VALIANT && "Valiant"}
						{card!.class === DefinitionClass.CUNNING && "Cunning"}
						{card!.class === DefinitionClass.ARCANE && "Arcane"}
					</span>
				</div>
			</div>
			<div className={classes.buyContainer}>
				<button
					className={classes.buy}
					disabled={card!.cost > money}
					onClick={onBuy}
				>
					<div style={{ rotate: `${shuffleAmount}deg` }}>$ {card!.cost}</div>
				</button>
			</div>
		</div>
	);
}

import * as React from "react";

import { createUseStyles } from "react-jss";

import { Card as CardModel } from "@creature-chess/models";

import { Layout } from "../../layout";
import { Button } from "../button";
import { CreatureImage } from "../display";

type Props = {
	card: CardModel;
	alreadyOwned: boolean;
	onBuy?: () => void;
};

const useStyles = createUseStyles({
	buyCard: {
		textAlign: "center",
		padding: "1em",
		background: "#4e4e4e",
		display: "flex",
		flexDirection: "column",
	},
	currentCard: {
		background: "#2f2f2f",
	},
	cardText: {
		padding: "1em",
		fontFamily: "Arial, sans-serif",
		fontWeight: 700,
		color: "#fff",
		fontSize: "0.7em",
		textTransform: "uppercase",
	},
	cardName: {
		textTransform: "none",
		marginBottom: "0.35em",
	},
});

const CurrentCard: React.FunctionComponent<Props> = ({
	card,
	alreadyOwned,
	onBuy,
}) => {
	const classes = useStyles();

	return (
		<>
			<Layout
				direction="row"
				justifyContent="center"
				noSpacer
				className={classes.currentCard}
			>
				<div>
					<CreatureImage definitionId={card.definitionId} />
				</div>
				<Layout direction="column" className={classes.cardText}>
					<h2 className={classes.cardName}>{card.name}</h2>
					<span>{card.type}</span>
					<span>{card.class}</span>
				</Layout>
			</Layout>

			<div className={classes.buyCard}>
				<Button type="primary" onClick={onBuy}>
					Buy (${card.cost})
				</Button>
				{alreadyOwned && <span>Already owned</span>}
			</div>
		</>
	);
};

export { CurrentCard };

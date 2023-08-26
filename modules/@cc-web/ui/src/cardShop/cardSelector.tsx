import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { Card as CardModel } from "@creature-chess/models";

import { Layout } from "../../layout";
import { Card } from "./card";

type Props = {
	cards: (CardModel | null)[];
	money: number;
	selectedCardIndex: number | null;
	onSelectCard?: (index: number | null) => void;
};

const useStyles = createUseStyles({
	container: {
		position: "relative",
		marginBottom: "1em",
	},
	tray: {
		position: "absolute",
		bottom: "5%",
		width: "100%",
		height: "70%",
		background: "#2b2b2b",
	},
	cardContainer: {
		zIndex: 10,
		width: "15%",
	},
	selected: {
		marginTop: "-1em",
	},
});

const CardSelector: React.FunctionComponent<Props> = ({
	cards,
	money,
	selectedCardIndex,
	onSelectCard,
}) => {
	const classes = useStyles();

	const createCard = (card: CardModel | null, index: number) => {
		if (card === null) {
			return null;
		}

		const isSelected = selectedCardIndex === index;

		const onClick = () => {
			if (!onSelectCard) {
				return;
			}

			onSelectCard(isSelected ? null : index);
		};

		return (
			<div
				className={classNames(classes.cardContainer, {
					[classes.selected]: isSelected,
				})}
			>
				<Card
					key={`${index}-${card.definitionId}`}
					disabled={money < card.cost}
					card={card}
					onClick={onSelectCard ? onClick : undefined}
				/>
			</div>
		);
	};

	return (
		<Layout
			className={classes.container}
			direction="row"
			justifyContent="space-around"
			noSpacer
		>
			<div className={classes.tray} />

			{cards.map(createCard)}
		</Layout>
	);
};

export { CardSelector };

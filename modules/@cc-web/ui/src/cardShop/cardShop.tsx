import * as React from "react";

import { createUseStyles } from "react-jss";

import { Card as CardModel } from "@creature-chess/models";
import { DEFAULT_GAME_OPTIONS } from "@creature-chess/models/config";

import { Layout } from "../../layout";
import { Button } from "../button";
import { Label } from "../display";
import { CardSelector } from "./cardSelector";
import { CurrentCard } from "./currentCard";

type Props = {
	cards: (CardModel | null)[];
	money: number;
	isLocked?: boolean;
	onReroll?: () => void;
	onToggleLock?: () => void;
	onBuy?: (index: number) => void;
	showSelectedCard?: boolean;
};

const useStyles = createUseStyles({
	container: {
		width: "100%",
		height: "100%",
	},
	grow: {
		flex: 1,
		marginBottom: "2em",
	},
	balance: {
		background: "#2f2f2f",
		padding: "0 1em",
		lineHeight: "1.5em",
	},
});

const CardShop: React.FunctionComponent<Props> = ({
	cards,
	money,
	isLocked = false,
	onReroll,
	onToggleLock,
	onBuy,
	showSelectedCard = true,
}) => {
	const classes = useStyles();
	const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

	const onBuyCurrentCard = () =>
		onBuy && selectedIndex !== null && onBuy(selectedIndex);

	const selectedCard = selectedIndex !== null ? cards[selectedIndex] : null;

	React.useEffect(() => {
		if (!selectedCard) {
			return;
		}

		const canAfford = selectedCard.cost <= money;

		if (!canAfford) {
			setSelectedIndex(null);
		}
	}, [selectedCard, money]);

	return (
		<Layout className={classes.container} direction="column">
			<Layout
				direction="column"
				justifyContent="center"
				className={classes.grow}
			>
				{selectedCard && showSelectedCard && (
					<CurrentCard card={selectedCard} onBuy={onBuyCurrentCard} />
				)}
			</Layout>

			<CardSelector
				cards={cards}
				money={money}
				selectedCardIndex={selectedIndex}
				onSelectCard={setSelectedIndex}
			/>

			<Layout direction="row" justifyContent="space-between">
				<Button
					type="primary"
					onClick={onReroll}
					disabled={money < DEFAULT_GAME_OPTIONS.game.rerollCost}
				>
					New (${DEFAULT_GAME_OPTIONS.game.rerollCost})
				</Button>

				<div className={classes.balance}>
					<Label>Balance:</Label> <Label type="highlight">${money}</Label>
				</div>

				<Button type="primary" onClick={onToggleLock}>
					{isLocked ? "Unlock" : "Lock (1 turn)"}
				</Button>
			</Layout>
		</Layout>
	);
};

export { CardShop };

import * as React from "react";
import { createUseStyles } from "react-jss";
import { Card as CardModel, REROLL_COST } from "@creature-chess/models";
import { Layout } from "../layout";
import { CardSelector } from "./cardSelector";
import { CurrentCard } from "./currentCard";
import { Button } from "../button";
import { Label } from "../display";

type Props = {
	cards: CardModel[];
	money: number;
	isLocked?: boolean;
	onReroll?: () => void;
	onToggleLock?: () => void;
	onBuy?: (index: number) => void;
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
	}
});

const CardShop: React.FunctionComponent<Props> = ({ cards, money, isLocked = false, onReroll, onToggleLock, onBuy }) => {
	const classes = useStyles();
	const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

	const onBuyCurrentCard = () => onBuy && selectedIndex !== null && onBuy(selectedIndex);

	React.useEffect(() => {
		if (selectedIndex === null || !cards[selectedIndex]) {
			return;
		}

		const canAfford = cards[selectedIndex].cost <= money;

		if (!canAfford) {
			setSelectedIndex(null);
		}
	}, [money]);

	return (
		<Layout className={classes.container} direction="column" >
			<Layout direction="column" justifyContent="center" className={classes.grow}>
				{
					selectedIndex !== null
					&& cards[selectedIndex]
					&& <CurrentCard card={cards[selectedIndex]} onBuy={onBuyCurrentCard} />
				}
			</Layout>

			<CardSelector
				cards={cards}
				money={money}
				selectedCardIndex={selectedIndex}
				onSelectCard={setSelectedIndex}
			/>

			<Layout direction="row" justifyContent="space-between">
				<Button type="primary" onClick={onReroll} disabled={money < REROLL_COST}>New (${REROLL_COST})</Button>

				<div className={classes.balance}>
					<Label>Balance:</Label> <Label type="highlight">${money}</Label>
				</div>

				<Button type="primary" onClick={onToggleLock}>{isLocked ? "Unlock" : "Lock (1 turn)"}</Button>
			</Layout>
		</Layout>
	);
};

export { CardShop };

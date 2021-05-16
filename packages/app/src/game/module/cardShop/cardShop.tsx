import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card as CardModel } from "@creature-chess/models";
import { getPlayerMoney, PlayerActions } from "@creature-chess/gamemode";
import { Card } from "./components/card";
import { AppState } from "../../../store";
import { RerollButton } from "./components/rerollButton";
import { BalanceDisplay } from "./components/balanceDisplay";
import { ToggleLockButton } from "./components/toggleLockButton";
import { CreatureImage } from "../../../display";

interface CardShopProps {
	showBalance: boolean;
}

const CurrentCard: React.FunctionComponent<{ card: CardModel, onBuy: () => void }> = ({ card, onBuy }) => {
	if (!card) {
		return null;
	}

	return (
		<>
			<div className="current-card-detail">
				<div className="card-image">
					<CreatureImage definitionId={card.definitionId} />
				</div>
				<div className="card-text">
					<h2>{card.name}</h2>
					<span>{card.type}</span>
					<span>{card.class}</span>
				</div>
			</div>
			<div className="current-card-buy">
				<button onClick={onBuy}>Buy (${card.cost})</button>
			</div>
		</>
	);
};

const CardShop: React.FunctionComponent<CardShopProps> = ({ showBalance }) => {
	const dispatch = useDispatch();

	const cards = useSelector<AppState, CardModel[]>(state => state.game.cardShop.cards);
	const money = useSelector<AppState, number>(state => getPlayerMoney(state.game));
	const canUseShop = useSelector<AppState, boolean>(state => state.game.playerInfo.health > 0);

	const [currentCardIndex, setCurrentCardIndex] = React.useState<number>(null);

	const createCard = (card: CardModel, index: number) => {
		if (card === null) {
			return null;
		}

		const onClick = () => {
			if (currentCardIndex === index) {
				setCurrentCardIndex(null);
			} else {
				setCurrentCardIndex(index);
			}
		};

		return (
			<Card
				key={`${index}-${card.definitionId}`}
				card={card}
				selected={index === currentCardIndex}
				onClick={onClick}
			/>
		);
	};

	if (cards === null || canUseShop === false) {
		return null;
	}

	const onBuy = () => {
		if (currentCardIndex === null) {
			return;
		}

		dispatch(PlayerActions.buyCardPlayerAction({ index: currentCardIndex }));
		setCurrentCardIndex(null);
	};

	const afterReroll = () => setCurrentCardIndex(null);

	return (
		<div className="card-selector">
			<div className="shop-actions">
				<div className="third">
					{
						showBalance
						&& (
							<div className="balance">
								<BalanceDisplay value={money} />
							</div>
						)
					}
				</div>
				<div className="two-thirds">
					<RerollButton afterReroll={afterReroll} />

					<ToggleLockButton />
				</div>
			</div>

			<div className="current-card">
				<CurrentCard card={cards[currentCardIndex]} onBuy={onBuy} />
			</div>

			<div className="cards">
				<div className="tray" />
				{cards.map(createCard)}
			</div>
		</div>
	);
};

export {
	CardShop
};

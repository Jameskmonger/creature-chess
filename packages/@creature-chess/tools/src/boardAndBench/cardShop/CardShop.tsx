import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card as CardModel } from "@creature-chess/models";
import { PlayerActions } from "@creature-chess/gamemode";
import { CardShop as CardShopModule } from "@creature-chess/ui";
import { DevState } from "../../store/store";

type Props = {
	devMode: boolean;
};


const CardShop: React.FunctionComponent<Props> = ({ devMode }) => {
	const dispatch = useDispatch();

	const cards = useSelector<DevState, CardModel[]>(state => state.scenario.cardShop.cards);
	const money = useSelector<DevState, number>(state => state.scenario.playerInfo.money);
	const canUseShop = useSelector<DevState, boolean>(state => state.scenario.playerInfo.health > 0);
	const shopLocked = useSelector<DevState, boolean>(state => state.scenario.cardShop.locked);

	if (canUseShop === false) {
		return null;
	}

	const onBuy = (index: number) => dispatch(PlayerActions.buyCardPlayerAction({ index }));
	const onReroll = () => dispatch(PlayerActions.rerollCardsPlayerAction());
	const onToggleLock = () => dispatch(PlayerActions.toggleShopLockPlayerAction());

	return (
		<CardShopModule
			cards={cards}
			money={money}
			isLocked={shopLocked}
			onToggleLock={onToggleLock}
			onReroll={onReroll}
			onBuy={onBuy}
			devMode={devMode}
		/>
	);
};

export { CardShop };

import * as React from "react";
import { Card } from "./card";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { Card as CardModel, Constants, GamePhase } from "@creature-chess/models";
import { RerollButton } from "./rerollButton";
import { BalanceDisplay } from "./balanceDisplay";
import { PlayerActions } from "@creature-chess/shared/player";
import { getPlayerMoney } from "@creature-chess/shared/player/playerSelectors";

interface CardShopProps {
    showBalance: boolean;
}

const CardShop: React.FunctionComponent<CardShopProps> = ({ showBalance }) => {
    const dispatch = useDispatch();

    const cards = useSelector<AppState, CardModel[]>(state => state.cards);
    const money = useSelector<AppState, number>(getPlayerMoney);
    const canUseShop = useSelector<AppState, boolean>(state => state.game.phase !== GamePhase.WAITING && state.game.phase !== GamePhase.DEAD);
    const shopLocked = useSelector<AppState, boolean>(state => state.game.shopLocked);

    const createCard = (card: CardModel, index: number) => {
        if (card === null) {
            return null;
        }

        const onClick = () => dispatch(PlayerActions.buyCard(index));

        return (
            <Card
                key={`${index}-${card.definitionId}`}
                definitionId={card.definitionId}
                buyable={money >= card.cost}
                onClick={onClick}
            />
        );
    };

    if (canUseShop === false) {
        return null;
    }

    // todo move this inside RerollButton
    const rerollBuyable = money >= Constants.REROLL_COST;
    const onBuyReroll = () => dispatch(PlayerActions.rerollCards());
    const onToggleLock = () => dispatch(PlayerActions.toggleShopLock());

    return (
        <div className="card-selector">
            {
                showBalance
                && (
                    <div className="balance">
                        <BalanceDisplay value={money} />
                    </div>
                )
            }

            <div className="cards">
                {cards.map(createCard)}

                <div className="shop-actions">
                    <RerollButton buyable={rerollBuyable} cost={Constants.REROLL_COST} onBuy={onBuyReroll} />

                    <button className="shop-action" onClick={onToggleLock}>
                        {
                            shopLocked
                                ? "Unlock"
                                : "Lock"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export {
    CardShop
};

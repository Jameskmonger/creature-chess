import * as React from "react";
import { Card } from "./card";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import { Card as CardModel, GamePhase } from "@creature-chess/models";
import { RerollButton } from "./rerollButton";
import { BalanceDisplay } from "./balanceDisplay";
import { PlayerActions, getPlayerMoney } from "@creature-chess/shared";
import { ToggleLockButton } from "./toggleLockButton";

interface CardShopProps {
    showBalance: boolean;
}

const CardShop: React.FunctionComponent<CardShopProps> = ({ showBalance }) => {
    const dispatch = useDispatch();

    const cards = useSelector<AppState, CardModel[]>(state => state.playerInfo.cards);
    const money = useSelector<AppState, number>(getPlayerMoney);
    const canUseShop = useSelector<AppState, boolean>(state => state.game.phase !== GamePhase.DEAD);

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
                <div className="shop-actions">
                    <RerollButton />

                    <ToggleLockButton />
                </div>

                {cards.map(createCard)}
            </div>
        </div>
    );
};

export {
    CardShop
};

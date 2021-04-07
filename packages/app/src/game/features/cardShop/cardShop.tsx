import * as React from "react";
import { Card } from "./card";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store";
import { Card as CardModel } from "@creature-chess/models";
import { RerollButton } from "./rerollButton";
import { BalanceDisplay } from "./balanceDisplay";
import { getPlayerMoney, DefinitionProvider, PlayerActions } from "@creature-chess/shared";
import { ToggleLockButton } from "./toggleLockButton";
import { CreatureImage } from "../../../ui/display";

interface CardShopProps {
    showBalance: boolean;
}

const CurrentCard: React.FunctionComponent<{ definitionProvider: DefinitionProvider, card: CardModel, onBuy: () => void }> = ({ definitionProvider, card, onBuy }) => {
    if (!card) {
        return null;
    }

    const creature = definitionProvider.get(card.definitionId);

    return (
        <>
            <div className="current-card-detail">
                <div className="card-image">
                    <CreatureImage definitionId={card.definitionId} />
                </div>
                <div className="card-text">
                    <h2>{creature.name}</h2>
                    <span>{creature.type}</span>
                    <span>{creature.class}</span>
                </div>
            </div>
            <div className="current-card-buy">
                <button onClick={onBuy}>Buy (${creature.cost})</button>
            </div>
        </>
    )
};

const definitionProvider = new DefinitionProvider();

const CardShop: React.FunctionComponent<CardShopProps> = ({ showBalance }) => {
    const dispatch = useDispatch();

    const cards = useSelector<AppState, CardModel[]>(state => state.cardShop.cards);
    const money = useSelector<AppState, number>(getPlayerMoney);
    const canUseShop = useSelector<AppState, boolean>(state => state.playerInfo.dead === false);

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
                definitionProvider={definitionProvider}
                definitionId={card.definitionId}
                selected={index === currentCardIndex}
                buyable={money >= card.cost}
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

        dispatch(PlayerActions.buyCardAction(currentCardIndex));
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
                <CurrentCard definitionProvider={definitionProvider} card={cards[currentCardIndex]} onBuy={onBuy} />
            </div>

            <div className="cards">
                <div className="tray"></div>
                {cards.map(createCard)}
            </div>
        </div>
    );
};

export {
    CardShop
};

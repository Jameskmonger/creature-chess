import * as React from "react";
import { Card } from "./card";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { AppState } from "@app/store";
import { Card as CardModel, Constants, GamePhase } from "@common/models";
import { rerollCards, buyCard } from "./cardActions";
import { DropToSell } from "./dropToSell/dropToSell";
import { RerollButton } from "./rerollButton";
import { BalanceDisplay } from "./balanceDisplay";
import { LockButton } from "./lockButton";
import { toggleShopLock } from "../../store/actions/gameActions";

interface StateProps {
    cards: CardModel[];
    money: number;
    canUseShop: boolean;
    shopLocked: boolean;
}

interface DispatchProps {
    onReroll: () => void;
    onBuyCard: (index: number) => void;
    onToggleLock: () => void;
}

type Props = StateProps & DispatchProps;

const CardShopDivider: React.FunctionComponent = () => <span className="item">&nbsp;|&nbsp;</span>;

const CardShopUnconnected: React.FunctionComponent<Props> = props => {
    const { cards, money, onReroll, onBuyCard, canUseShop, shopLocked, onToggleLock } = props;

    const onCardClick = (index: number) => {
        return () => onBuyCard(index);
    };

    const createCard = (card: CardModel, index: number) => {
        if (card === null) {
            return null;
        }

        return (
            <Card
                key={`${index}-${card.definitionId}`}
                definitionId={card.definitionId}
                cost={card.cost}
                name={card.name}
                buyable={money >= card.cost}
                onClick={onCardClick(index)}
            />
        );
    };

    if (canUseShop === false) {
        return null;
    }

    const rerollBuyable = money >= Constants.REROLL_COST;

    return (
        <div className="card-selector">
            <div className="balance">
                <BalanceDisplay value={money} />

                <CardShopDivider />

                <RerollButton buyable={rerollBuyable} cost={Constants.REROLL_COST} onBuy={onReroll} />

                <CardShopDivider />

                <LockButton locked={shopLocked} onToggle={onToggleLock} />
            </div>
            <div className="cards">
                <div className="shop">
                    {cards.map(createCard)}
                </div>
                <DropToSell />
            </div>
        </div>
    );
};

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = state => ({
    cards: state.cards,
    money: state.game.money,
    canUseShop: state.game.phase !== GamePhase.WAITING && state.game.phase !== GamePhase.DEAD,
    shopLocked: state.game.shopLocked
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    onReroll: () => dispatch(rerollCards()),
    onBuyCard: (index: number) => dispatch(buyCard(index)),
    onToggleLock: () => dispatch(toggleShopLock())
});

const CardShop = connect(mapStateToProps, mapDispatchToProps)(CardShopUnconnected);

export {
    CardShop
};

import * as React from "react";
import { PokemonCard } from "@common";
import { take } from "lodash";
import { Card, RerollCard } from "./card";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { AppState } from "../store/store";
import { ClientToServerPacketOpcodes } from "../../shared/packet-opcodes";
import { sendPacket } from "../actions/networkActions";

interface StateProps {
    cards: PokemonCard[];
    money: number;
}

interface DispatchProps {
    onShuffle: () => void;
}

type Props = StateProps & DispatchProps;

const CardSelectorUnconnected: React.FunctionComponent<Props> = props => {
    const { cards, onShuffle, money } = props;
    const topCards = take(cards, 5);

    return (
        <div className="card-selector">
            <div className="balance">Balance: ${money}</div>
            <div className="cards">
                {topCards.map((card, index) => <Card key={`${index}-${card.id}`} pokemonId={card.id} cost={card.cost} name={card.name} />)}

                <RerollCard onClick={onShuffle} />
            </div>
        </div>
    );
};

const mapStateToProps: MapStateToProps<StateProps, {}, AppState> = state => ({
    cards: state.cards,
    money: state.game.money
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    onShuffle: () => dispatch(sendPacket(ClientToServerPacketOpcodes.REFRESH_CARDS))
});

const CardSelector = connect(mapStateToProps, mapDispatchToProps)(CardSelectorUnconnected);

export {
    CardSelector
};

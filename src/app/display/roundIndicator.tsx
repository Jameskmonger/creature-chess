import * as React from "react";
import { GamePhase } from "@common";
import { MapStateToProps, connect } from "react-redux";
import { AppState } from "@app/store";

interface Props {
    round: number | null;
}

const RoundIndicatorUnconnected: React.FunctionComponent<Props> = ({ round }) => {
    if (round === null) {
        return null;
    }

    return <div className="round-indicator">Round {round}</div>;
};

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    round: state.game.round
});

const RoundIndicator = connect(mapStateToProps)(RoundIndicatorUnconnected);

export { RoundIndicator };

import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";

const RoundIndicator: React.FunctionComponent = () => {
    const round = useSelector<AppState, number>(state => state.game.round);

    if (round === null) {
        return null;
    }

    return <div className="round-indicator">Round <span className="highlight">{round}</span></div>;
};

export { RoundIndicator };

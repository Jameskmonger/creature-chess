import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "@app/store";

const VictoryOverlay: React.FunctionComponent = () => {
    const winnerName = useSelector<AppState, string>(state => state.game.winnerName);

    if (!winnerName) {
        return null;
    }

    return (
        <div className="victory">
            <h2 className="game-over">Game Over</h2>
            <p><span className="winner">{winnerName}</span> wins!</p>
        </div>
    );
};

export { VictoryOverlay };

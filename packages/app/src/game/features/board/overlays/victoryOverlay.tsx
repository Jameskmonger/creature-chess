import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../store";

const VictoryOverlay: React.FunctionComponent = () => {
    const winnerName = useSelector<AppState, string>(state => state.ui.winnerName);

    if (!winnerName) {
        return null;
    }

    return (
        <div className="victory">
            <h2 className="game-over">Game Over</h2>
            <p><span className="winner">{winnerName}</span> wins!</p>

            <div className="discord-link">
                <p>Join us on Discord to receive notifications when someone starts a lobby, and more!</p>

                <a href="https://discord.gg/FhMm6saehb"><img src="https://i.imgur.com/YNyTNuw.png" className="discord-button" /></a>
            </div>
        </div >
    );
};

export { VictoryOverlay };

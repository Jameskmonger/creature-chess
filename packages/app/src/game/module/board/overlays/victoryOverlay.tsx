import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../store";
import { BoardOverlay } from "./boardOverlay";

const VictoryOverlay: React.FunctionComponent = () => {
    const winnerName = useSelector<AppState, string>(state => state.game.ui.winnerName);

    if (!winnerName) {
        return null;
    }

    return (
        <BoardOverlay>
            <div className="victory-overlay">
                <h2 className="game-over">Game Over</h2>
                <p className="winner"><span className="highlight">{winnerName}</span> wins!</p>

                <div className="discord-link">
                    <p>Join us on Discord to receive notifications when someone starts a lobby, and more!</p>

                    <a href="https://discord.gg/FhMm6saehb"><img src="https://i.imgur.com/YNyTNuw.png" className="discord-button" /></a>
                </div>
            </div>
        </BoardOverlay>
    );
};

export { VictoryOverlay };

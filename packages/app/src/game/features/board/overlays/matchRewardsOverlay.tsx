import * as React from "react";
import { useSelector } from "react-redux";
import { PlayerMatchRewards } from "@creature-chess/shared";
import { AppState } from "../../../../store";

const MatchRewardsOverlay: React.FunctionComponent = () => {
    const matchRewards = useSelector<AppState, PlayerMatchRewards>(state => state.playerInfo.matchRewards);
    const victoryOverlayShowing = useSelector<AppState, boolean>(state => state.ui.winnerName !== null);

    if (!matchRewards || victoryOverlayShowing) {
        return null;
    }

    const { damage, justDied, rewardMoney } = matchRewards;

    if (justDied) {
        return (
            <div className="victory">
                <h2 className="game-over">You Died</h2>
                <p><span className="winner">{damage}</span> health lost</p>

                <div className="discord-link">
                    <p>Join us on Discord to receive notifications when someone starts a lobby, and more!</p>

                    <a href="https://discord.gg/FhMm6saehb"><img src="https://i.imgur.com/YNyTNuw.png" className="discord-button" /></a>
                </div>
            </div >
        );
    }

    if (damage === 0) {
        return (
            <div className="victory">
                <h2 className="game-over">Round Won</h2>
                <p><span className="winner">${rewardMoney}</span> gained</p>
            </div >
        );
    }

    return (
        <div className="victory">
            <h2 className="game-over">Round Lost</h2>
            <p><span className="winner">${rewardMoney}</span> gained</p>
            <p><span className="winner">{damage}</span> health lost</p>
        </div >
    );
};

export { MatchRewardsOverlay };

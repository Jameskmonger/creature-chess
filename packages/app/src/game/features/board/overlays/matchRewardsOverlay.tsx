import * as React from "react";
import { useSelector } from "react-redux";
import { PlayerMatchRewards } from "@creature-chess/gamemode";
import { AppState } from "../../../../store";
import { BoardOverlay } from "./boardOverlay";

const MatchRewardsOverlay: React.FunctionComponent = () => {
    const matchRewards = useSelector<AppState, PlayerMatchRewards>(state => state.game.playerInfo.matchRewards);
    const victoryOverlayShowing = useSelector<AppState, boolean>(state => state.ui.winnerName !== null);

    if (!matchRewards || victoryOverlayShowing) {
        return null;
    }

    const {
        damage,
        justDied,
        rewardMoney: {
            total, base, winBonus, streakBonus, interest
        }
    } = matchRewards;

    if (justDied) {
        return (
            <BoardOverlay>
                <div className="match-rewards-content">
                    <h2>You Died</h2>

                    <p className="health"><span className="highlight">{damage}</span> health lost</p>

                    <div className="discord-link">
                        <p>Join us on Discord to receive notifications when someone starts a lobby, and more!</p>

                        <a href="https://discord.gg/FhMm6saehb"><img src="https://i.imgur.com/YNyTNuw.png" className="discord-button" /></a>
                    </div>
                </div>
            </BoardOverlay>
        );
    }

    if (damage === 0) {
        return (
            <BoardOverlay>
                <div className="match-rewards-content">
                    <h2>Round Won</h2>

                    <div className="money">
                        <h3><span className="highlight">${total}</span> gained</h3>

                        <ul>
                            <li>Base: <span className="highlight">${base}</span></li>
                            <li>Win Bonus: <span className="highlight">${winBonus}</span></li>
                            <li>Streak Bonus: <span className="highlight">${streakBonus}</span></li>
                            <li>Interest (10%): <span className="highlight">${interest}</span></li>
                        </ul>
                    </div>
                </div>
            </BoardOverlay>
        )
    }

    return (
        <BoardOverlay>
            <div className="match-rewards-content">
                <h2>Round Lost</h2>
                <p className="health"><span className="highlight">{damage}</span> health lost</p>

                <div className="money">
                    <h3><span className="highlight">${total}</span> gained</h3>

                    <ul>
                        <li>Base: <span className="highlight">${base}</span></li>
                        <li>Win Bonus: <span className="highlight">${winBonus}</span></li>
                        <li>Streak Bonus: <span className="highlight">${streakBonus}</span></li>
                        <li>Interest (10%): <span className="highlight">${interest}</span></li>
                    </ul>
                </div>
            </div>
        </BoardOverlay>
    );
};

export { MatchRewardsOverlay };

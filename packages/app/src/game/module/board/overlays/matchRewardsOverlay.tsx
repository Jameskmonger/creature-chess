import * as React from "react";
import { useSelector } from "react-redux";
import { PlayerActions, PlayerMatchRewards } from "@creature-chess/gamemode";
import { AppState } from "../../../../store";
import { BoardOverlay } from "./boardOverlay";
import { QuickChatValue, QuickChatOption } from "@creature-chess/models";
import { usePlayerId } from "../../../../auth";
import { quickChatPlayerAction } from "../../../../../../gamemode/lib/playerActions";

const MatchRewardsOverlay: React.FunctionComponent = () => {
	const matchRewards = useSelector<AppState, PlayerMatchRewards>(state => state.game.playerInfo.matchRewards);
	const victoryOverlayShowing = useSelector<AppState, boolean>(state => state.game.ui.winnerId !== null);
	const spectatingPlayer = useSelector<AppState, boolean>(state => state.game.spectating.id !== null);

	const sendingPlayerId = usePlayerId();
	const receivingPlayerId = useSelector<AppState, string>(state => state.game.playerInfo.opponentId);

	if (!matchRewards || victoryOverlayShowing || spectatingPlayer) {
		return null;
	}
	const sendQuickChat = (chatOption: QuickChatOption) => {
		const chatValue: QuickChatValue = {
			phrase: chatOption
		};
		console.log(`sending: ${sendingPlayerId}, receiving: ${receivingPlayerId}, value: ${chatValue}`);
		PlayerActions.quickChatPlayerAction({ sendingPlayerId, receivingPlayerId, chatValue });
	};
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

						<a href="https://discord.gg/FhMm6saehb"><img src="https://i.imgur.com/OBo2QRd.png" className="discord-button" /></a>
					</div>
					<button onClick={() => sendQuickChat(QuickChatOption.GG)}>chat</button>
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
						<button onClick={() => sendQuickChat(QuickChatOption.GG)}>chat</button>
					</div>
				</div>
			</BoardOverlay>
		);
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
					<button onClick={() => sendQuickChat(QuickChatOption.GG)}>chat</button>
				</div>
			</div>
		</BoardOverlay>
	);
};

export { MatchRewardsOverlay };

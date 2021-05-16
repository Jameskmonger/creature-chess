import React from "react";
import { useSelector } from "react-redux";
import { PlayerListPlayer, StreakType } from "packages/models/lib";
import { AppState } from "../../../../../store";

const getPositionModifier = (position: number): string => {
	if (position === 1) {
		return "st";
	}
	if (position === 2) {
		return "nd";
	}
	if (position === 3) {
		return "rd";
	}
	return "th";
};

const getPosition = (player: PlayerListPlayer, playerList: PlayerListPlayer[]): string => {
	const position = playerList.indexOf(player) + 1;
	return `${position}${getPositionModifier(position)}`;
};

const getStreak = (player: PlayerListPlayer) => {
	const streakModifier = getStreakModifier(player);
	return `${player.streakAmount} ${streakModifier}`;
};

const getStreakModifier = (player: PlayerListPlayer): string => {
	const streakType = player?.streakType;
	const streakAmount = player?.streakAmount;

	if (!player || streakAmount === 0) {
		return "";
	}
	if (streakType === StreakType.WIN) {
		return streakAmount === 1 ? "Win" : "Wins";
	}
	return streakAmount === 1 ? "Loss" : "Losses";
};

const HeadToHeadStats = ({ player, opponent }) => {

	const playerList = useSelector((state: AppState) => {
		return state.game.playerList;
	});

	return (
		<div className="head-to-head-stats">
			<div className="h2h-stat-div">
				<p className="h2h-info-header">Position</p>
				<div className="h2h-position">
					<p className="h2h-info-text">{getPosition(player, playerList)} vs {getPosition(opponent, playerList)}</p>
				</div>
			</div>
			<div className="h2h-stat-div">
				<p className="h2h-info-header">Streak</p>
				<div className="h2h-streak">
					<p className="h2h-info-text">{getStreak(player)} vs {getStreak(opponent)}</p>
				</div>
			</div>
			<div className="h2h-stat-div">
				<p className="h2h-info-header">Level</p>
				<div className="h2h-level">
					<p className="h2h-info-text">{player.level} vs {opponent.level}</p>
				</div>
			</div>
		</div>
	);
};

export { HeadToHeadStats };

import React from "react";
import { useSelector } from "react-redux";
import { PlayerListPlayer, StreakType } from "packages/models/lib";
import { AppState } from "../../../../../store";

const getPosition = (player: PlayerListPlayer, playerList: PlayerListPlayer[]): number => {
	return playerList.indexOf(player) + 1;
};

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

const getStreakType = (player: PlayerListPlayer): string => {
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
	const playerPosition = getPosition(player, playerList);
	const opponentPosition = getPosition(opponent, playerList);
	return (
		<div className="head-to-head-stats">
			<div className="h2h-stat-div">
				<p className="h2h-info-header">Position</p>
				<div className="h2h-position">
					<p className="h2h-info-text">{playerPosition}{getPositionModifier(playerPosition)} vs {opponentPosition}{getPositionModifier(opponentPosition)}</p>
				</div>
			</div>
			<div className="h2h-stat-div">
				<p className="h2h-info-header">Streak</p>
				<div className="h2h-streak">
					<p className="h2h-info-text">{player.streakAmount} {getStreakType(player)} vs {opponent.streakAmount} {getStreakType(opponent)}</p>
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

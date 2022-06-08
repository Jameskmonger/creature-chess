import React from "react";
import { useSelector } from "react-redux";
import { Layout } from "@creature-chess/ui";
import { Text, Header4 } from "@creature-chess/ui/text";
import { PlayerListPlayer, StreakType } from "@creature-chess/models";
import { AppState } from "../../../../store";

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

const HeadToHeadStats: React.FC<{ player: PlayerListPlayer; opponent: PlayerListPlayer }> = ({ player, opponent }) => {
	const playerList = useSelector((state: AppState) => state.game.playerList);

	return (
		<Layout direction="column">
			<Header4>Position</Header4>
			<Text>{getPosition(player, playerList)} vs {getPosition(opponent, playerList)}</Text>
			<Header4>Streak</Header4>
			<Text>{getStreak(player)} vs {getStreak(opponent)}</Text>
			<Header4>Level</Header4>
			<Text>{player.level} vs {opponent.level}</Text>
		</Layout>
	);
};

export { HeadToHeadStats };

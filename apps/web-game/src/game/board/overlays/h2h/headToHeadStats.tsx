import React from "react";

import { Group, Layout } from "@cc-web/ui";
import { Text, Header4 } from "@cc-web/ui/text";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";

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

const getPosition = (
	player: PlayerListPlayer,
	playerList: PlayerListPlayer[]
): string => {
	const position = playerList.indexOf(player) + 1;
	return `${position}${getPositionModifier(position)}`;
};

const useStyles = createUseStyles({
	segment: {
		marginBottom: "0.5em",
	},
});

export function HeadToHeadStats({
	player,
	opponent,
}: {
	player: PlayerListPlayer;
	opponent: PlayerListPlayer;
}) {
	const styles = useStyles();
	const playerList = useSelector((state: AppState) => state.game.playerList);

	return (
		<Layout direction="column">
			<Group className={styles.segment}>
				<Header4>Position</Header4>
				<Text>
					{getPosition(player, playerList)} vs{" "}
					{getPosition(opponent, playerList)}
				</Text>
			</Group>
		</Layout>
	);
}

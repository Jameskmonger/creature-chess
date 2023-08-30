import * as React from "react";

import classnames from "classnames";
import { createUseStyles } from "react-jss";

import { PlayerListPlayer } from "@creature-chess/models/game/playerList";

import { IMAGE_BASE_URL } from "@cc-web/shared/constants";

const useStyles = createUseStyles({
	image: {
		height: "64px",
	},
});

function getCreatureUrl(definitionId: number) {
	return `${IMAGE_BASE_URL}/creatures/front/${definitionId}.png`;
}

export function PlayerAvatar({
	player,
}: {
	player: Pick<PlayerListPlayer, "profile">;
}) {
	const classes = useStyles();

	if (!player || !player.profile?.picture) {
		return null;
	}

	return (
		<img
			className={classnames(classes.image, "avatar")}
			src={getCreatureUrl(player.profile.picture)}
		/>
	);
}

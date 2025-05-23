import * as React from "react";

import classnames from "classnames";
import { createUseStyles } from "react-jss";

import { PlayerListPlayer } from "@creature-chess/models/game/playerList";

const useStyles = createUseStyles({
	image: {
		height: "64px",
	},
});

function getCreatureUrl(definitionId: number) {
	return `${APP_IMAGE_ROOT}/creatures/front/${definitionId}.png`;
}

export function PlayerAvatar({
	player,
	className,
}: {
	player: Pick<PlayerListPlayer, "profile">;
	className?: string;
}) {
	const classes = useStyles();

	if (!player || !player.profile?.picture) {
		return null;
	}

	return (
		<img
			className={classnames(classes.image, "avatar", className)}
			src={getCreatureUrl(player.profile.picture)}
		/>
	);
}

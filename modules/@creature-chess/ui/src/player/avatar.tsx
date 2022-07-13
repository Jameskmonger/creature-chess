import * as React from "react";

import classnames from "classnames";
import { createUseStyles } from "react-jss";

import { PlayerListPlayer } from "@creature-chess/models";

const useStyles = createUseStyles({
	image: {
		height: "64px",
	},
});

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
			src={`https://creaturechess.com/game/images/front/${player.profile.picture}.png`}
		/>
	);
}

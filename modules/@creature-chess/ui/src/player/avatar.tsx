import * as React from "react";

import classnames from "classnames";
import { createUseStyles } from "react-jss";

import { APP_BASE_URL, PlayerListPlayer } from "@creature-chess/models";

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

	// TODO these shouldn't come from /game/ server
	return (
		<img
			className={classnames(classes.image, "avatar")}
			src={`${APP_BASE_URL}game/images/front/${player.profile.picture}.png`}
		/>
	);
}

import * as React from "react";

import classnames from "classnames";
import { createUseStyles } from "react-jss";

import { PlayerListPlayer } from "@creature-chess/models";

import { getCreatureImageUrl } from "~/networking/creatureDefinitions";

const useStyles = createUseStyles({
	image: {
		height: "64px",
	},
});

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
	const src = getCreatureImageUrl(player.profile.picture, "front");
	if (!src) {
		return null;
	}

	return (
		<img
			className={classnames(classes.image, "avatar", className)}
			src={src}
		/>
	);
}

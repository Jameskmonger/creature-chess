import * as React from "react";

import classnames from "classnames";
import { createUseStyles } from "react-jss";

import { CREATURE_PICTURE_PREFIX, PlayerListPlayer } from "@creature-chess/models";

import { getCreatureImageUrl } from "~/networking/creatureDefinitions";

const useStyles = createUseStyles({
	image: {
		height: "64px",
	},
});

// A profile picture is a URL, or a `creature:<id>` ref resolved here.
const resolvePictureUrl = (picture: string): string | null => {
	if (picture.startsWith(CREATURE_PICTURE_PREFIX)) {
		const id = Number(picture.slice(CREATURE_PICTURE_PREFIX.length));
		return getCreatureImageUrl(id, "front");
	}
	return picture;
};

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
	const src = resolvePictureUrl(player.profile.picture);
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

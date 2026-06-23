import * as React from "react";

import { createUseStyles } from "react-jss";

import { MAX_HEALTH } from "@creature-chess/models";

import { ProgressBar } from "../progressBar";

type Props = {
	health: number;
};

const GREEN = [0x46, 0xc4, 0x5a];
const ORANGE = [0xe0, 0xa2, 0x3a];
const RED = [0xe2, 0x50, 0x4f];

const GREEN_THRESHOLD = 0.8;
const RED_THRESHOLD = 0.2;

const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
const toRgb = ([r, g, b]: number[]) => `rgb(${r}, ${g}, ${b})`;

const healthColor = (ratio: number) => {
	if (ratio >= GREEN_THRESHOLD) {
		return toRgb(GREEN);
	}
	if (ratio <= RED_THRESHOLD) {
		return toRgb(RED);
	}

	// orange sits at the midpoint. lerp red→orange→green across [0.2, 0.8]
	const mid = (GREEN_THRESHOLD + RED_THRESHOLD) / 2;
	const [from, to, t] =
		ratio > mid
			? [ORANGE, GREEN, (ratio - mid) / (GREEN_THRESHOLD - mid)]
			: [RED, ORANGE, (ratio - RED_THRESHOLD) / (mid - RED_THRESHOLD)];

	return toRgb(from.map((c, i) => lerp(c, to[i], t)));
};

const useStyles = createUseStyles({
	playerHealth: {
		position: "relative",
		display: "block",
		width: "100%",
		height: "16px",
	},
	fill: ({ health }: Props) => ({
		background: healthColor(Math.max(0, Math.min(1, health / MAX_HEALTH))),
	}),
	content: {
		position: "absolute",
		top: "-2px",
		right: "8px",
		fontSize: "12px",
		fontWeight: 700,
		color: "#000",
	},
});

const renderHealthbar = (current: number) => `${current} / ${MAX_HEALTH} hp`;

function PlayerHealthbar({ health }: Props) {
	const classes = useStyles({ health });

	return (
		<ProgressBar
			className={classes.playerHealth}
			fillClassName={classes.fill}
			contentClassName={classes.content}
			current={health}
			max={MAX_HEALTH}
			renderContents={renderHealthbar}
		/>
	);
}

export { PlayerHealthbar };

import React, { useEffect, useRef } from "react";

import { createUseStyles } from "react-jss";

import { StreakType } from "@creature-chess/models/player";

type Props = {
	type: StreakType | null;
	amount: number | null;
};

const getBackground = (type: StreakType | null) =>
	type === StreakType.WIN ? "#38b764" : "#b13e53";

const useStyles = createUseStyles({
	indicator: (props: Props) => ({
		"position": "relative",

		"aspectRatio": "1 / 1",

		"width": "26px",

		"@media (orientation: portrait) and (max-width: 400px)": {
			width: "24px",
		},

		"height": "auto",
		"overflow": "hidden",
		"display": "flex",
		"alignItems": "center",
		"justifyContent": "center",
		"background": getBackground(props.type),
		"border": "2px solid darkgray",
		"boxSizing": "border-box",
		"boxShadow": "1px 1px 3px #888888",
	}),
	spacer: {
		"aspectRatio": "1 / 1",

		"width": "26px",

		"@media (orientation: portrait) and (max-width: 400px)": {
			width: "24px",
		},
	},
	amount: {
		"position": "absolute",
		"top": "52%",
		"fontFamily": '"Roboto", sans-serif',
		"fontSize": "14px",
		"lineHeight": 0,
		"color": "#fff",

		"@media (orientation: portrait) and (max-width: 400px)": {
			fontSize: "12px",
		},
	},
	sheen: {
		position: "absolute",
		top: "-100%",
		left: "-125%",
		width: "80%",
		height: "200%",
		background:
			"linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.6), rgba(255,255,255,0))", // 3D sheen effect
		transform: "rotate(45deg)",
		transition: "left 1s ease-in-out, top 1s ease-in-out",
	},
});

export function StreakIndicator(props: Props) {
	const classes = useStyles(props);
	const sheenRef = useRef<HTMLDivElement | null>(null);

	// apply sheen effect when streak amount changes
	useEffect(() => {
		if (sheenRef.current) {
			sheenRef.current.style.transition = "none";
			sheenRef.current.style.left = "-100%";
			sheenRef.current.style.top = "-125%";
			// Force a reflow to reset the transition
			void sheenRef.current.offsetWidth;

			sheenRef.current.style.transition =
				"left 1s ease-in-out, top 1s ease-in-out";
			sheenRef.current.style.left = "100%";
			sheenRef.current.style.top = "75%";

			const timer = setTimeout(() => {
				if (sheenRef.current) {
					sheenRef.current.style.transition = "none";
					sheenRef.current.style.left = "-100%";
					sheenRef.current.style.top = "-125%";
				}
			}, 1000);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [props.amount]);

	if (props.type === null || !props.amount || props.amount === 1) {
		return <div className={classes.spacer} />;
	}

	return (
		<div className={classes.indicator}>
			<div className={classes.sheen} ref={sheenRef} />
			<span className={classes.amount}>{props.amount}</span>
		</div>
	);
}

import React from "react";

import { createUseStyles } from "react-jss";

type Props = {
	message?: string;
};

const useStyles = createUseStyles({
	"root": {
		"containerType": "inline-size",
		"display": "flex",
		"alignItems": "center",
		"justifyContent": "center",
		"flexDirection": "column",
		"gap": 32,
		"height": "100dvh",
		"width": "100%",
		"padding": 16,
		"boxSizing": "border-box",
		"@container (min-width: 700px)": {
			flexDirection: "row",
		},
	},
	"logo": {
		"width": "65%",
		"maxWidth": 320,
		"@container (min-width: 700px)": {
			width: "50%",
			maxWidth: 420,
		},
	},
	"loadingArea": {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "32px",
		width: "100%",
	},
	"spinner": {
		width: 48,
		height: 48,
		border: "8px solid #b13e53",
		borderTopColor: "#555",
		borderRadius: "50%",
		animation: "$spin 1.6s linear infinite",
	},
	"message": {
		fontFamily: '"Roboto", "sans-serif"',
		fontSize: "1.5em",
		textTransform: "uppercase",
		letterSpacing: "4px",
		color: "#fff",
		fontWeight: 700,
		textAlign: "center",
	},
	"playBtn": {
		"fontSize": 18,
		"padding": "12px 24px",
		"border": "none",
		"borderRadius": 12,
		"background": "#4caf50",
		"color": "#fff",
		"cursor": "pointer",
		"transition": "transform 80ms ease",
		"&:active": {
			transform: "scale(0.96)",
		},
		"@container (min-width: 700px)": {
			fontSize: 20,
		},
	},
	"@keyframes spin": {
		from: { transform: "rotate(0deg)" },
		to: { transform: "rotate(360deg)" },
	},
});

export function LoadingScreen({ message }: Props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<img
				src={`${APP_IMAGE_ROOT}/ui/logo.png`}
				alt="Creature Chess"
				className={classes.logo}
			/>
			<div className={classes.loadingArea}>
				<div className={classes.spinner} />
				{message && <p className={classes.message}>{message}</p>}
			</div>
		</div>
	);
}

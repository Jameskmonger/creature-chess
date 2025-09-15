import React from "react";

import { Page } from "../Page";
import { createUseThemeStyles } from "~/useStyles";

type Props = {
	message?: string;
};

const useStyles = createUseThemeStyles(theme => ({
	"loadingArea": {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: "32px",
		width: "100%",
		height: "100%",
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
		"fontFamily": theme.typography.primary,
		"fontSize": "1.5em",
		"textTransform": "uppercase",
		"letterSpacing": "4px",
		"color": "#fff",
		"fontWeight": 700,
		"textAlign": "center",

		"@media (orientation: portrait) and (max-width: 412px)": {
			fontSize: "1.2em",
		},
	},
	"@keyframes spin": {
		from: { transform: "rotate(0deg)" },
		to: { transform: "rotate(360deg)" },
	},
}));

export function LoadingScreen({ message }: Props) {
	const classes = useStyles();

	return (
		<Page hasBackground>
			<div className={classes.loadingArea}>
				<div className={classes.spinner} />
				{message && <p className={classes.message}>{message}</p>}
			</div>
		</Page>
	);
}

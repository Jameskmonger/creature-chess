import React from "react";

import { Spinner } from "@creature-chess/ui";

import { createUseThemeStyles } from "~/useStyles";

import { PageBoardBackground } from "../PageBackground";

type Props = {
	message?: string;
};

const useStyles = createUseThemeStyles((theme) => ({
	root: {
		position: "relative",
		overflow: "hidden",
		width: "100%",
		height: "100%",
		boxSizing: "border-box",
	},
	foreground: {
		position: "absolute",
		inset: 0,
		boxSizing: "border-box",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: "clamp(1rem, 5vw, 1.75rem)",
		padding: "0.5rem",
	},
	logo: {
		width: "auto",
		height: "clamp(3.5rem, 16vw, 5.5rem)",
	},
	card: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "clamp(1rem, 5vw, 1.5rem)",
		width: "100%",
		maxWidth: "460px",
		padding: "clamp(1.5rem, 7vw, 2.5rem)",
		boxSizing: "border-box",
		background: theme.palette.surface,
		borderRadius: "0.9rem",
	},
	message: {
		margin: 0,
		fontFamily: theme.typography.primary,
		fontSize: "clamp(1.1rem, 5vw, 1.5rem)",
		textTransform: "uppercase",
		letterSpacing: "0.25em",
		color: theme.palette.light.neutral,
		fontWeight: 700,
		textAlign: "center",
	},
}));

export function LoadingScreen({ message }: Props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<PageBoardBackground />

			<div className={classes.foreground}>
				<img
					src={`${APP_IMAGE_ROOT}/ui/logo.png`}
					alt="Creature Chess"
					className={classes.logo}
				/>

				<div className={classes.card}>
					<Spinner size="clamp(2.5rem, 12vw, 3.5rem)" />
					{message && <p className={classes.message}>{message}</p>}
				</div>
			</div>
		</div>
	);
}

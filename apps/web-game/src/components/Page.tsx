import React from "react";

import { createUseStyles } from "react-jss";

import { PageBoardBackground } from "./PageBackground";

type Props = {
	children: React.ReactNode;
	hasBackground?: boolean;
};

const useStyles = createUseStyles<string, Props>({
	root: {
		position: "relative",
		overflow: "hidden",
		height: "100vh",
		width: "100vw",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	page: {
		"zIndex": 1,
		"containerType": "inline-size",
		"display": "flex",
		"justifyContent": "center",
		"flexDirection": "column",
		"height": "100dvh",
		"width": "100%",
		"padding": 16,
		"boxSizing": "border-box",
		"@container (min-width: 700px)": {
			flexDirection: "row",
		},

		"@media (orientation: portrait) and (max-width: 320px)": {
			padding: "24px",
		},

		"@media (orientation: portrait) and (min-width: 321px) and (max-width: 539px)":
			{
				padding: "36px",
			},

		"@media (orientation: portrait) and (min-width: 540px) and (max-width: 719px)":
			{
				padding: "64px",
			},

		"@media (orientation: portrait) and (min-width: 720px) and (max-width: 767px)":
			{
				padding: "96px",
			},

		"@media (orientation: portrait) and (min-width: 768px)": {
			padding: "196px 128px",
		},

		"@media (min-aspect-ratio: 16/9) and (min-width: 1600px)": {
			maxWidth: "1000px",
			maxHeight: "800px",
		},
	},
	header: {
		display: "flex",
		justifyContent: "center",
		background: "#333c57",
		// todo revisit with container queries
		padding: "16px 0 8px",

		minHeight: "80px",
		boxSizing: "border-box",
		width: "100%",
	},
	logo: {
		"width": "65%",
		"maxWidth": 320,
		"@container (min-width: 700px)": {
			width: "50%",
			maxWidth: 420,
		},
	},
	content: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		boxSizing: "border-box",
		width: "100%",
		flex: 1,
		background: "#424e70",
		borderColor: "#333c57",
		borderWidth: "4px",
		borderLeftStyle: "solid",
		borderRightStyle: "solid",
		borderBottomStyle: "solid",
		padding: "8px",
		justifyContent: "space-between",
	},
});

export function Page(props: Props) {
	const classes = useStyles(props);

	return (
		<div className={classes.root}>
			{props.hasBackground && <PageBoardBackground />}

			<div className={classes.page}>
				<div className={classes.header}>
					<img
						src={`${APP_IMAGE_ROOT}/ui/logo.png`}
						alt="Creature Chess"
						className={classes.logo}
					/>
				</div>
				<div className={classes.content}>{props.children}</div>
			</div>
		</div>
	);
}

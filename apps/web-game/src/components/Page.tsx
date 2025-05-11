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
		height: "100%",
		width: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",

		containerName: "page",
		containerType: "inline-size",
	},
	page: {
		"zIndex": 1,
		"display": "flex",
		"justifyContent": "center",
		"flexDirection": "column",
		"width": "clamp(272px, 80%, 1000px)",
		"height": "clamp(272px, 80%, 1000px)",
		"boxSizing": "border-box",

		"@container page (min-width: 400px)": {
			width: "clamp(300px, 60%, 1000px)",
			height: "clamp(300px, 60%, 1000px)",
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
		maxHeight: "100%",
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

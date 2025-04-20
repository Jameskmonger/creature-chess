import * as React from "react";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	overlay: {
		position: "absolute",
		top: "0",
		left: "0",
		zIndex: "500",
		display: "flex",
		width: "100%",
		height: "100%",
		justifyContent: "space-around",
		alignItems: "center",
		inset: "0",
		background: "rgba(0, 0, 0, 0.85)",
	},
	content: {
		"position": "absolute",
		"overflow": "auto",
		"boxSizing": "border-box",
		"display": "flex",
		"height": "80%",
		"width": "80%",
		"padding": "8px",
		"outline": "none",
		"fontFamily": '"Roboto", sans-serif',
		"color": "#fff",
		"background": "#333c57",

		"@media (orientation: portrait) and (max-width: 430px)": {
			width: "96%",
			height: "96%",
		},
	},
});

const BoardOverlay: React.FunctionComponent<{ children: React.ReactNode }> = ({
	children,
}) => {
	const styles = useStyles();

	return (
		<div className={styles.overlay}>
			<div className={styles.content}> {children}</div>
		</div>
	);
};

export { BoardOverlay };

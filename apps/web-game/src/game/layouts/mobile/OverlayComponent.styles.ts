import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
	overlay: {
		flex: "1",
		display: "flex",
		flexDirection: "column",
		padding: "0.5rem 0.25rem",
		overflowY: "scroll",
		fontFamily: "Arial, sans-serif",
		background: "#9da5bd",
	},
	header: {
		"display": "flex",
		"flexDirection": "row",

		"& h2": {
			"flex": "1",
			"fontFamily": "Arial, sans-serif",
			"font-size": "1.5rem",
			"color": "#fff",
			"textAlign": "center",
			"textDecoration": "underline",
		},
	},
	closeButton: {
		padding: "0",
		fontSize: "1.8rem",
		fontWeight: "700",
		background: "none",
		border: "none",
	},

	overlayContent: {
		overflow: "scroll",
	},

	overlayContentFullscreen: {
		overflow: "scroll",
		height: "100%",
		boxSizing: "border-box",
		padding: "0 0.25em",
		marginTop: "1em",
	},
});

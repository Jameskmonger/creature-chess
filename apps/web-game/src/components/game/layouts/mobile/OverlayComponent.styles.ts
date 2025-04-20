import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
	overlay: {
		flex: "1",
		display: "flex",
		flexDirection: "column",
		overflowY: "auto",
		background: "#9da5bd",
	},
	titleChild: {
		flex: "1",
	},
	header: {
		"display": "flex",
		"flexDirection": "row",

		"& h2": {
			"flex": "1",
			"fontFamily": '"Roboto", sans-serif',
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
		height: "100%",
		boxSizing: "border-box",
	},
});

import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
	navBar: {
		height: "100%",
		display: "flex",
		flexDirection: "row",
	},
	navBarItem: {
		"padding": "0.7rem 0",
		"fontSize": "1.6rem",
		"color": "#fff",
		"background": "#171717",
		"flex": "1",
		"border": "none",
		"outline": "none",

		"&:not(:last-child)": {
			borderRight: "3px solid #3c3c3c",
		},

		"position": "relative",
	},
	navBarItemActive: {
		textDecoration: "underline",
		background: "#3c3c3c",
	},
	chip: {
		position: "absolute",
		top: "2.5%",
		width: "100%",
	},
	chipText: {
		fontSize: "12px",
		padding: "0.25em",
		borderRadius: "4px",
	},
	shopLockChip: {
		background: "#b13e53",
	},
});

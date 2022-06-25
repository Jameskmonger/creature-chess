import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
	profile: {
		padding: "0.25rem",
		fontFamily: "Arial, sans-serif",
		color: "#fff",
		background: "#566c86",
	},
	row: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",

		"&:not(:last-child)": {
			marginBottom: "0.4em",
		},
	},
	item: {
		flex: "1",
	},
	buyXpButton: {
		width: "50%",
		height: "2em",
		boxSizing: "border-box",
		padding: "0.5em 1em",
		marginLeft: "0.5em",
		fontSize: "1em",
		lineHeight: "1em",
		color: "#fff",
		cursor: "pointer",
		background: "#1a1c2c",
		border: "none",
	},
	level: {
		display: "flex",
		justifyContent: "space-evenly",
		alignItems: "center",
		flexDirection: "row",
		fontWeight: "700",

		"& > span": {
			color: "#ffcd75",
		},
	},
	xpProgress: {
		width: "50%",
		height: "1.75em",
		background: "#636363",
	},
	xpProgressFill: {
		paddingLeft: "1em",
		background: "#ffcd75",
	},
	xpProgressContent: {
		color: "#1a1c2c",
	},

	pieceCount: {
		fontSize: "0.85em",
		fontStyle: "italic",
		textAlign: "center",
	},
	pieceCountWarning: {
		width: "fit-content",
		padding: "0.2em 0.4em",
		fontWeight: "700",
		color: "#ff6464",
		background: "#ffd2d2",
		border: "2px solid #ff6464",
	},
});

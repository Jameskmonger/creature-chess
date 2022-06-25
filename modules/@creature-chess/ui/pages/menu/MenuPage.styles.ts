import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
	menu: {
		display: "flex",
		flexDirection: "column",
		height: "100%",
		width: "100%",
		overflow: "scroll",
		paddingTop: "2em",
		fontFamily: "Arial, Helvetica, sans-serif",
		color: "#fff",
		alignItems: "center",
		justifyContent: "center",

		"& h2": {
			marginBottom: "1rem",
			fontSize: "2em",
			textAlign: "center",
			userSelect: "none",
		},
	},
	findGameButton: {
		padding: "0.8em 2em",
		marginBottom: "1rem",
		fontSize: "1.4rem",
		fontWeight: "700",
		color: "#fff",
		cursor: "pointer",
		background: "#b13e53",
		border: "none",
	},
	joinGame: {
		padding: "1rem",
		marginTop: "3em",
		textAlign: "center",
		background: "#566c86",
	},
	discordButton: {
		maxWidth: "12em",
		marginBottom: "1rem",
		cursor: "pointer",
	},
	blurb: {
		marginBottom: "0.5rem",
		"& p": {
			marginTop: "0",
			marginBottom: "0.25rem",
		},
		"& span": {
			fontSize: "1.2em",
			fontStyle: "italic",
			fontWeight: "700",
			color: "#bfbfbf",
		},
	},
	error: {
		padding: "1em 0.5em",
		marginBottom: "1em",
		color: "#db2828",
		background: "#ffe8e6",
		boxShadow: "0 0 0 1px #db2828 inset, 0 0 0 0 transparent",
	},
});

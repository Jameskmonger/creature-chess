import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
	login: {
		display: "flex",
		flexDirection: "column",
		height: "100%",
		fontFamily: "Arial, Helvetica, sans-serif",
		color: "#fff",
		alignItems: "center",
		justifyContent: "center",
		background: "#566c86",
	},
	banner: {
		"maxWidth": "700px",
		"marginTop": "1rem",
		"marginBottom": "1rem",
		"userSelect": "none",

		"& img": {
			width: "100%",
			userSelect: "none",
		},
	},
	group: {

	},
	groups: {
		"display": "flex",
		"width": "100%",
		"maxWidth": "700px",

		"& .group": {
			width: "50%",
			textAlign: "center"
		},

		"& p": {
			marginBottom: "0.5rem",
			fontSize: "0.8em",
		}
	},
	loginButton: {
		padding: "0.6em 1.2em",
		marginBottom: "1rem",
		fontSize: "1.4em",
		color: "#fff",
		cursor: "pointer",
		background: "#b13e53",
		border: "none"
	},
	discordButton: {
		maxWidth: "12em",
		marginBottom: "1rem",
		cursor: "pointer",
	},
});

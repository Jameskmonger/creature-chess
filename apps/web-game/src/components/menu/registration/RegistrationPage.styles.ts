import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
	register: {
		"display": "flex",
		"flexDirection": "column",
		"height": "100%",
		"padding": "1rem",
		"marginTop": "1em",
		"fontFamily": '"Roboto", sans-serif',
		"color": "#fff",
		"alignItems": "center",
		"justifyContent": "center",
		"textAlign": "center",
		"background": "#566c86",

		"& h1": {
			marginBottom: "1rem",
			fontSize: "2em",
		},
	},
	registerButton: {
		padding: "0.5rem 2rem",
		fontSize: "1.25rem",
		color: "#fff",
		cursor: "pointer",
		background: "#b13e53",
		border: "none",
	},
	error: {
		padding: "0.5rem 1rem",
		marginBottom: "1rem",
		border: "2px solid #a01515",
	},
});

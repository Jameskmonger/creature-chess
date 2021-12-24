import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
	"lobby": {
		display: "flex",
		flexDirection: "column",
		fontFamily: "Arial, Helvetica, sans-serif",
		color: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	"lobbyInfo": {
		display: "flex",
		flexDirection: "column",
		padding: "1rem",
		marginTop: "1rem",
		textAlign: "center",
		background: "#566c86",
	},
	"timeRemaining": {
		padding: "0.5em 0.6em",
		marginBottom: "1em",
		textTransform: "uppercase",
		background: "#333",
	},
	"timeRemainingHighlight": {
		fontWeight: "700",
	},
	"players": {
		flex: "1 0 0",
		display: "flex",
		justifyContent: "space-between",
		flexWrap: "wrap",
	},
	"playerWrapper": {
		display: "flex",
		flexDirection: "column",
		width: "100%",
	},
	"@media (min-width: 1024px)": {
		playerWrapper: {
			width: "40%"
		}
	}
});

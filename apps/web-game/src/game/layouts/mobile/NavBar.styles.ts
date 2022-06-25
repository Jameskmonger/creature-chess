import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
	navBar: {
		display: "flex",
		flexDirection: "row",
	},
	navBarItem: {
		padding: "0.7rem 0",
		fontSize: "1.6rem",
		color: "#fff",
		background: "#171717",
		flex: "1",
		border: "none",
		outline: "none",

		"&:not(:last-child)": {
			borderRight: "3px solid #3c3c3c",
		},
	},
	navBarItemActive: {
		textDecoration: "underline",
		background: "#3c3c3c",
	},
});

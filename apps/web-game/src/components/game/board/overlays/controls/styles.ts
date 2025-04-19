import { createUseStyles } from "react-jss";

import { COLOR_READY_BUTTON_TEXT, COLOR_READY_BUTTON } from "./colors";

export const useStyles = createUseStyles({
	controlButton: {
		"box-sizing": "border-box",
		"font-size": "1rem",
		"color": COLOR_READY_BUTTON_TEXT,
		"cursor": "pointer",
		"background": COLOR_READY_BUTTON,
		"border": "none",
		"height": "100%",
		"width": "100%",
	},
});

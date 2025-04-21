import React from "react";

import { createUseStyles } from "react-jss";

import { ReadyUpButton } from "./controls/ReadyUpButton";

const useStyles = createUseStyles({
	container: {
		"position": "absolute",
		"top": "-40px",
		"right": "4px",
		"width": "30%",

		"@media (orientation: portrait) and (max-width: 400px)": {
			top: "-28px",
		},
	},
});

export function ReadyButtonOverlay() {
	const styles = useStyles();

	return (
		<div className={styles.container}>
			<ReadyUpButton />
		</div>
	);
}

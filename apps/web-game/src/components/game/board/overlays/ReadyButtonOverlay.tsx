import React from "react";

import { createUseStyles } from "react-jss";

import { ReadyUpButton } from "./controls/ReadyUpButton";

const useStyles = createUseStyles({
	container: {
		position: "absolute",
		top: "-32px",
		right: "4px",
		padding: "4px 0",
		width: "30%",
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

import React from "react";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	input: {
		marginBottom: "0.5rem",
	},
	inputHeading: {
		marginBottom: "0.5rem",
		fontSize: "1.4em",
	},
	info: {
		marginTop: "0.5rem",
	},
});

function BaseRegistrationInput({
	heading,
	info,
	children,
}: {
	heading: string;
	info: string;
	children: React.ReactNode;
}) {
	const styles = useStyles();

	return (
		<div className={styles.input}>
			<h1 className={styles.inputHeading}>{heading}</h1>
			<h2 className={styles.info}>{info}</h2>

			{children}
		</div>
	);
}

export { BaseRegistrationInput };

import * as React from "react";

import { createUseStyles } from "react-jss";

import { Group, Layout } from "../layout";

type PortraitGameScreenProps = {
	topRowContent: React.ReactNode | React.ReactNode[];
	middleRowContent: React.ReactNode | React.ReactNode[];
	bottomRowContent: React.ReactNode | React.ReactNode[];
};

const useStyles = createUseStyles({
	wrapper: {
		width: "100%",
		height: "100%",
		boxSizing: "border-box",
		padding: "0",
	},
	top: {
		marginBottom: "1rem",
		flex: "initial",
	},
	middle: {
		marginBottom: "1rem",
		padding: "0 0.5rem",
	},
	bottom: {
		flex: "initial",
	},
});

export function PortraitGameScreen({
	topRowContent,
	middleRowContent,
	bottomRowContent,
}: PortraitGameScreenProps) {
	const styles = useStyles();

	return (
		<Layout direction="column" className={styles.wrapper}>
			<Group spacer={false} className={styles.top}>
				{topRowContent}
			</Group>
			<Group spacer={false} className={styles.middle}>
				{middleRowContent}
			</Group>
			<Group spacer={false} className={styles.bottom}>
				{bottomRowContent}
			</Group>
		</Layout>
	);
}

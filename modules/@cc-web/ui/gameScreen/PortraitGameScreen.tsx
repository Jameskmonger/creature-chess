import * as React from "react";

import { createUseStyles } from "react-jss";

import { Group, Layout } from "../layout";

type PortraitGameScreenProps = {
	topRowContent: React.ReactNode | React.ReactNode[];
	middleRowContent: React.ReactNode | React.ReactNode[];
	bottomRowContent: React.ReactNode | React.ReactNode[];
};

// TODO remove the absolute positioning here
// but I am tired of battling with mobile devices
const useStyles = createUseStyles({
	wrapper: {
		display: "block",
		position: "relative",

		width: "100%",
		height: "100%",
		boxSizing: "border-box",
		padding: "0",
	},
	top: {
		position: "absolute",
		top: "0",
		height: "4%",
		width: "100%",
	},
	middle: {
		position: "absolute",
		top: "6%",
		height: "82%",
		width: "100%",
		boxSizing: "border-box",
		padding: "0 0.5rem",
	},
	bottom: {
		position: "absolute",
		bottom: "0",
		height: "10%",
		width: "100%",
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

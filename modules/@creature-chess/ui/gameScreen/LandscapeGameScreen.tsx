import * as React from "react";

import { createUseStyles } from "react-jss";

import { Group, Layout } from "../layout";

type LandscapeGameScreenProps = {
	leftColumnContent: React.ReactNode | React.ReactNode[];
	middleColumnContent: React.ReactNode | React.ReactNode[];
	rightColumnContent: React.ReactNode | React.ReactNode[];
};

const useStyles = createUseStyles({
	wrapper: {
		width: "100%",
		height: "100%",
		boxSizing: "border-box",
	},
	left: {
		height: "100%",
		marginRight: "0.5rem",
	},
	middle: {
		flex: "initial",
		height: "100%",
		width: "50%",
		marginRight: "0.5rem",
	},
	right: {
		height: "100%",
	},
});

export function LandscapeGameScreen({
	leftColumnContent,
	middleColumnContent,
	rightColumnContent,
}: LandscapeGameScreenProps) {
	const styles = useStyles();

	return (
		<Layout direction="row" className={styles.wrapper}>
			<Group spacer={false} className={styles.left}>
				{leftColumnContent}
			</Group>
			<Group spacer={false} className={styles.middle}>
				{middleColumnContent}
			</Group>
			<Group spacer={false} className={styles.right}>
				{rightColumnContent}
			</Group>
		</Layout>
	);
}

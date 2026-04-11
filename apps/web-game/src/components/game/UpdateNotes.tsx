import * as React from "react";

import { createUseStyles } from "react-jss";

import { Button } from "../ui";
import { Footer } from "../ui/Footer";
import { Group, Layout } from "../ui/layout";
import { Header2 } from "../ui/text";

const useStyles = createUseStyles({
	updateNotes: {
		color: "#fff",
	},
	helpText: {
		"fontSize": "12px",
		"marginBottom": "8px",

		"@media (min-width: 400px)": {
			fontSize: "16px",
			marginBottom: "12px",
		},
	},
	header: {
		"display": "flex",
		"flexDirection": "row",

		"& h2": {
			flex: "1",
		},
	},
});

const UpdateNotes: React.FunctionComponent<{
	hideFooter?: boolean;
	onBack: () => void;
}> = ({ hideFooter = false, onBack }) => {
	const styles = useStyles();

	return (
		<Layout direction="column" className={styles.updateNotes}>
			<Group>
				<div className={styles.header}>
					<Header2>Update Notes</Header2>
					<Button color="muted" size="medium" onClick={onBack}>
						Back
					</Button>
				</div>
				<p className={styles.helpText}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
				<p className={styles.helpText}>
					Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
					nisi ut aliquip ex ea commodo consequat.
				</p>
				<p className={styles.helpText}>
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
					dolore eu fugiat nulla pariatur.
				</p>
			</Group>

			{!hideFooter && <Footer />}
		</Layout>
	);
};

export { UpdateNotes };

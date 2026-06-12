import * as React from "react";

import { createUseStyles } from "react-jss";

import { Button } from "../ui";
import { Footer } from "../ui/Footer";
import { Group, Layout } from "../ui/layout";
import { Header2 } from "../ui/text";
import { updateNotes } from "./updateNotesData";

const useStyles = createUseStyles({
	updateNotes: {
		color: "#fff",
	},
	version: {
		"fontSize": "16px",
		"fontWeight": "bold",
		"margin": "12px 0 4px",

		"@media (min-width: 400px)": {
			fontSize: "20px",
		},
	},
	sectionTitle: {
		"fontSize": "13px",
		"fontWeight": "bold",
		"margin": "10px 0 2px",

		"@media (min-width: 400px)": {
			fontSize: "16px",
		},
	},
	list: {
		"fontSize": "12px",
		"margin": "0 0 8px",
		"paddingLeft": "18px",

		"& li": {
			marginBottom: "2px",
		},

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

function UpdateNotes({
	hideFooter = false,
	onBack,
}: {
	hideFooter?: boolean;
	onBack: () => void;
}) {
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
				{updateNotes.map((release) => (
					<React.Fragment key={release.version}>
						<p className={styles.version}>Version {release.version}</p>

						{release.sections.map((section) => (
							<React.Fragment key={section.title}>
								<p className={styles.sectionTitle}>{section.title}</p>
								<ul className={styles.list}>
									{section.items.map((item, i) => (
										<li key={i}>{item}</li>
									))}
								</ul>
							</React.Fragment>
						))}
					</React.Fragment>
				))}
			</Group>

			{!hideFooter && <Footer />}
		</Layout>
	);
}

export { UpdateNotes };

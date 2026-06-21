import * as React from "react";

import { Button, Panel, createUseThemeStyles } from "@creature-chess/ui";

import { Region } from "~/plugins";
import { useSetSetting, useSetting } from "~/settings";

const useStyles = createUseThemeStyles((theme) => ({
	settings: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
		color: theme.palette.light.neutral,
	},
	header: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		fontSize: "1.5rem",
	},
	row: {
		display: "flex",
		alignItems: "center",
		gap: "0.5rem",
		fontSize: "1.1rem",
	},
}));

export function MenuSettings({ onBack }: { onBack: () => void }) {
	const classes = useStyles();
	const showPing = useSetting("showPing");
	const setShowPing = useSetSetting("showPing");

	return (
		<Panel>
			<div className={classes.settings}>
				<div className={classes.header}>
					<span className={classes.title}>Settings</span>
					<Button color="muted" size="small" onClick={onBack}>
						Back
					</Button>
				</div>
				<label className={classes.row}>
					<input
						type="checkbox"
						checked={showPing}
						onChange={() => setShowPing(!showPing)}
					/>
					Show ping
				</label>
				<Region cls="settings-section" id="menu.settings" ctx={{}} />
			</div>
		</Panel>
	);
}

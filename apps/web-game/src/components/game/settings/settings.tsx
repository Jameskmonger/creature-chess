import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSetSetting, useSetting } from "~/settings";

import { QuitGameButton } from "./quitGameButton";

const useStyles = createUseStyles({
	settings: {
		display: "flex",
		flexDirection: "column",
		gap: "16px",
	},
	row: {
		fontSize: "16px",
	},
});

export function Settings() {
	const styles = useStyles();
	const showPing = useSetting("showPing");
	const setShowPing = useSetSetting("showPing");

	return (
		<div className={styles.settings}>
			<div>
				<QuitGameButton />
			</div>

			<div>
				<input
					type="checkbox"
					checked={showPing}
					onChange={() => setShowPing(!showPing)}
				/>

				<label>Show ping</label>
			</div>
		</div>
	);
}

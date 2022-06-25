import * as React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	discordButton: {
		maxWidth: "260px",
		padding: "2em",
		textAlign: "center",
	},
	discordImage: {
		maxWidth: "260px",
	},
});

export function DiscordIcon() {
	const styles = useStyles();

	return (
		<div className={styles.discordButton}>
			<p>Join us on Discord to receive notifications when someone starts a lobby, and more!</p>

			<a href="https://discord.gg/FhMm6saehb">
				<img className={styles.discordImage} src="https://i.imgur.com/OBo2QRd.png" />
			</a>
		</div>
	);
}

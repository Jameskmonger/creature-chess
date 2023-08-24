import * as React from "react";

import { Footer } from "../../../src/Footer";
import { useStyles } from "./LoginPage.styles";

type LoginPageProps = {
	isLoading: boolean;
	onSignInClick: () => void;
};

const LoginPage: React.FunctionComponent<LoginPageProps> = ({
	isLoading,
	onSignInClick,
}) => {
	const styles = useStyles();
	const [loadingSignIn, setLoadingSignIn] = React.useState<boolean>(false);

	const currentlyLoading = isLoading || loadingSignIn;

	const handleSignInClick = () => {
		if (currentlyLoading) {
			return;
		}

		setLoadingSignIn(true);

		onSignInClick();
	};

	const handlePlayAsGuestClick = () => {
		window.location.href = process.env.GAME_SERVER_URL! + "?guest=1";
	};

	if (currentlyLoading) {
		return <span>Loading</span>;
	}

	return (
		<div className={styles.login}>
			<div className={styles.banner}>
				<img src="https://i.imgur.com/7FAcFwZ.png" />
			</div>

			<div className={styles.groups}>
				<div className="group">
					<p>
						Creature Chess is a multiplayer auto-chess battler
					</p>

					<button onClick={handleSignInClick} className={styles.loginButton}>
						Create Account
					</button>

					<button onClick={handleSignInClick} className={styles.loginButton}>
						Log In
					</button>

					<button onClick={handlePlayAsGuestClick} className={styles.guestButton}>
						Play as Guest
					</button>
				</div>

				<div className="group">
					<p>
						Join us on Discord to find other players and give feedback on the
						game
					</p>

					<a href="https://discord.gg/FhMm6saehb">
						<img
							src="https://i.imgur.com/OBo2QRd.png"
							className={styles.discordButton}
						/>
					</a>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export { LoginPage };

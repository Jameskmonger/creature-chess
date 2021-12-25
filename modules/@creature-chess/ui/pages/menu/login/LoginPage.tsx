import * as React from "react";
import { Footer } from "../../../src/Footer";
import { useStyles } from "./LoginPage.styles";

type LoginPageProps = {
	isLoading: boolean;
	onSignInClick: () => void;
};

const LoginPage: React.FunctionComponent<LoginPageProps> = ({ isLoading, onSignInClick }) => {
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

	if (currentlyLoading) {
		return <span>Loading</span>;
	}

	return (
		<div className={styles.login}>
			<div className={styles.banner}><img src="https://i.imgur.com/7FAcFwZ.png" /></div>

			<div className={styles.groups}>
				<div className="group">
					<p>Creature Chess is a multiplayer game, so you need an account to play</p>

					<button onClick={handleSignInClick} className={styles.loginButton}>Log in / Sign up</button>

					<p>Join us on Discord to find other players and give feedback on the game</p>

					<a href="https://discord.gg/FhMm6saehb"><img src="https://i.imgur.com/OBo2QRd.png" className={styles.discordButton} /></a>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export { LoginPage };

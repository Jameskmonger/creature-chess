import * as React from "react";

import { Footer } from "../../../../../../apps/web-game/src/components/ui/Footer";
import { useStyles } from "./LoginPage.styles";

type LoginPageProps = {
	isLoading?: boolean;
	auth0Enabled?: boolean;
	onSignInClick?: () => void;
	onPlayAsGuestClick?: () => void;
};

const LoginPage = ({
	auth0Enabled = false,
	isLoading = false,
	onSignInClick,
	onPlayAsGuestClick,
}: LoginPageProps) => {
	const styles = useStyles();
	const [loadingSignIn, setLoadingSignIn] = React.useState<boolean>(false);

	const currentlyLoading = isLoading || loadingSignIn;

	const handleSignInClick = () => {
		if (!auth0Enabled || currentlyLoading) {
			return;
		}

		setLoadingSignIn(true);

		if (onSignInClick) {
			onSignInClick();
		}
	};

	const handlePlayAsGuestClick = () => {
		if (onPlayAsGuestClick) {
			onPlayAsGuestClick();
		}
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
					<p>Creature Chess is a multiplayer auto-chess battler</p>

					{auth0Enabled && (
						<>
							<button
								onClick={handleSignInClick}
								className={styles.loginButton}
							>
								Sign In
							</button>
							<button
								onClick={handleSignInClick}
								className={styles.loginButton}
							>
								Create Account
							</button>
						</>
					)}

					<button
						onClick={handlePlayAsGuestClick}
						className={styles.guestButton}
					>
						Play Now as Guest
					</button>

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
